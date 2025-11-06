from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
import uuid

from utils.database import users_collection, conversations_collection, create_indexes
from services.auth_service import hash_password, verify_password, create_access_token, verify_token
from services.content_service import ContentService
from models.user import SignupRequest, LoginRequest, UserResponse, AuthResponse
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="AllOutputs API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://alloutputs.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

# Startup event
@app.on_event("startup")
async def startup_event():
    await create_indexes()
    print("✅ AllOutputs API started successfully")

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "success": True,
        "data": {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat()
        }
    }

# Auth dependency
async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = payload.get("user_id")
    user = await users_collection.find_one({"_id": user_id})
    
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

# Authentication Endpoints
@app.post("/api/auth/signup")
async def signup(request: SignupRequest):
    """User signup endpoint"""
    try:
        # Check if user already exists
        existing_user = await users_collection.find_one({"email": request.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        user_id = str(uuid.uuid4())
        user_data = {
            "_id": user_id,
            "email": request.email,
            "password_hash": hash_password(request.password),
            "name": request.name,
            "profile_picture": None,
            "subscription_tier": "free",
            "subscription_status": "active",
            "trial_end_date": None,
            "preferences": {
                "default_model": "gpt-4o-mini",
                "theme": "dark",
                "language": "en",
                "response_length": "balanced",
                "tone": "professional"
            },
            "usage_stats": {
                "total_queries": 0,
                "queries_this_month": 0,
                "favorite_model": None
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        await users_collection.insert_one(user_data)
        
        # Create JWT token
        token = create_access_token({"user_id": user_id, "email": request.email})
        
        return {
            "success": True,
            "data": {
                "user": {
                    "id": user_id,
                    "email": request.email,
                    "name": request.name,
                    "subscription_tier": "free"
                },
                "token": token
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/auth/login")
async def login(request: LoginRequest):
    """User login endpoint"""
    try:
        # Find user
        user = await users_collection.find_one({"email": request.email})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Verify password
        if not verify_password(request.password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Create JWT token
        token = create_access_token({"user_id": user["_id"], "email": user["email"]})
        
        return {
            "success": True,
            "data": {
                "user": {
                    "id": user["_id"],
                    "email": user["email"],
                    "name": user["name"],
                    "subscription_tier": user.get("subscription_tier", "free")
                },
                "token": token
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/auth/me")
async def get_me(authorization: str = Header(None)):
    """Get current user info"""
    try:
        user = await get_current_user(authorization)
        return {
            "success": True,
            "data": {
                "user": {
                    "id": user["_id"],
                    "email": user["email"],
                    "name": user["name"],
                    "subscription_tier": user.get("subscription_tier", "free"),
                    "usage_stats": user.get("usage_stats", {})
                }
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chat Models
class ChatRequest(BaseModel):
    conversation_id: Optional[str] = None
    model: str
    message: str
    stream: bool = False

class ChatCompareRequest(BaseModel):
    message: str
    models: List[str]

# Chat Endpoints
@app.post("/api/chat")
async def chat(request: ChatRequest, authorization: str = Header(None)):
    """Send a chat message"""
    try:
        user = await get_current_user(authorization)
        
        # Generate conversation ID if new
        conversation_id = request.conversation_id or str(uuid.uuid4())
        message_id = str(uuid.uuid4())
        
        # Mock AI response (we'll integrate real AI later)
        mock_responses = {
            "gpt-4o-mini": "This is a mock response from GPT-4o Mini. I understand your query and here's my detailed answer with helpful insights.",
            "gemini-flash": "Hello! This is Gemini Flash responding. I can help you with various tasks efficiently and quickly.",
            "gpt-4o": "GPT-4o here! This is an advanced response with deep reasoning and comprehensive analysis of your question.",
            "claude-3-7-sonnet": "Claude 3.7 Sonnet speaking. I provide thoughtful, nuanced responses with careful consideration of context.",
            "gemini-2-5-pro": "Gemini 2.5 Pro at your service. I offer advanced capabilities for complex queries and detailed analysis."
        }
        
        ai_response = mock_responses.get(request.model, f"Mock response from {request.model}")
        
        # Create message objects
        user_message = {
            "id": str(uuid.uuid4()),
            "role": "user",
            "content": request.message,
            "timestamp": datetime.utcnow(),
        }
        
        assistant_message = {
            "id": message_id,
            "role": "assistant",
            "content": ai_response,
            "model": request.model,
            "timestamp": datetime.utcnow(),
            "tokens_used": len(ai_response.split())
        }
        
        # Save or update conversation
        conversation = await conversations_collection.find_one({"_id": conversation_id})
        
        if conversation:
            # Update existing conversation
            await conversations_collection.update_one(
                {"_id": conversation_id},
                {
                    "$push": {"messages": {"$each": [user_message, assistant_message]}},
                    "$set": {"last_message_at": datetime.utcnow()}
                }
            )
        else:
            # Create new conversation
            conversation_data = {
                "_id": conversation_id,
                "user_id": user["_id"],
                "title": request.message[:50] + "..." if len(request.message) > 50 else request.message,
                "messages": [user_message, assistant_message],
                "ai_specialist": None,
                "tags": [],
                "is_favorite": False,
                "folder": None,
                "created_at": datetime.utcnow(),
                "last_message_at": datetime.utcnow()
            }
            await conversations_collection.insert_one(conversation_data)
        
        # Update user usage stats
        await users_collection.update_one(
            {"_id": user["_id"]},
            {
                "$inc": {
                    "usage_stats.total_queries": 1,
                    "usage_stats.queries_this_month": 1
                }
            }
        )
        
        return {
            "success": True,
            "data": {
                "message_id": message_id,
                "conversation_id": conversation_id,
                "response": ai_response,
                "tokens_used": len(ai_response.split()),
                "model": request.model
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/conversations")
async def get_conversations(authorization: str = Header(None)):
    """Get user's conversations"""
    try:
        user = await get_current_user(authorization)
        
        conversations = await conversations_collection.find(
            {"user_id": user["_id"]}
        ).sort("last_message_at", -1).to_list(length=100)
        
        # Format conversations for response
        formatted_conversations = []
        for conv in conversations:
            formatted_conversations.append({
                "id": conv["_id"],
                "title": conv.get("title", "New Conversation"),
                "last_message_at": conv.get("last_message_at").isoformat() if conv.get("last_message_at") else None,
                "message_count": len(conv.get("messages", []))
            })
        
        return {
            "success": True,
            "data": {
                "conversations": formatted_conversations
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/conversations/{conversation_id}")
async def get_conversation(conversation_id: str, authorization: str = Header(None)):
    """Get a specific conversation"""
    try:
        user = await get_current_user(authorization)
        
        conversation = await conversations_collection.find_one({
            "_id": conversation_id,
            "user_id": user["_id"]
        })
        
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Format messages
        messages = []
        for msg in conversation.get("messages", []):
            messages.append({
                "id": msg["id"],
                "role": msg["role"],
                "content": msg["content"],
                "model": msg.get("model"),
                "timestamp": msg["timestamp"].isoformat() if isinstance(msg["timestamp"], datetime) else msg["timestamp"],
                "tokens_used": msg.get("tokens_used")
            })
        
        return {
            "success": True,
            "data": {
                "messages": messages
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str, authorization: str = Header(None)):
    """Delete a conversation"""
    try:
        user = await get_current_user(authorization)
        
        result = await conversations_collection.delete_one({
            "_id": conversation_id,
            "user_id": user["_id"]
        })
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        return {
            "success": True,
            "data": {
                "message": "Conversation deleted successfully"
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat/compare")
async def compare_models(request: ChatCompareRequest, authorization: str = Header(None)):
    """Compare responses from multiple models"""
    try:
        user = await get_current_user(authorization)
        
        # Mock responses for comparison
        comparisons = []
        for model in request.models:
            comparisons.append({
                "model": model,
                "response": f"This is a mock response from {model} for comparison. Each model has its unique approach and style.",
                "response_time": 1.5,
                "tokens_used": 50
            })
        
        return {
            "success": True,
            "data": {
                "comparisons": comparisons
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# AI Specialists Endpoints
SPECIALISTS = {
    "nova": {
        "id": "nova",
        "name": "Nova",
        "role": "Product Manager",
        "description": "Helps with PRDs, feature specs, and product roadmaps",
        "system_prompt": "You are Nova, an experienced Product Manager. You help write PRDs, user stories, and roadmaps. You ask clarifying questions and provide methodical, structured outputs. Be professional and detail-oriented."
    },
    "harper": {
        "id": "harper",
        "name": "Harper",
        "role": "Personal Brand Counselor",
        "description": "Helps with resumes, cover letters, and LinkedIn optimization",
        "system_prompt": "You are Harper, a Personal Brand Counselor. You help optimize resumes, craft cover letters, and enhance LinkedIn profiles. Be direct, challenging, and push for authenticity. Help people present their best professional selves."
    },
    "remy": {
        "id": "remy",
        "name": "Remy",
        "role": "Content Writer",
        "description": "Helps with emails, blog posts, and newsletters",
        "system_prompt": "You are Remy, a skilled Content Writer. You help write emails, blog posts, newsletters, and long-form content. Be creative, offer style variations, and maintain a flowing, engaging tone."
    },
    "lennon": {
        "id": "lennon",
        "name": "Lennon",
        "role": "Social Media Manager",
        "description": "Helps with Instagram posts and social media strategies",
        "system_prompt": "You are Lennon, a Social Media Manager. You help create Instagram posts, develop social strategies, and plan content calendars. Be energetic, trendy, and platform-savvy."
    },
    "emmerson": {
        "id": "emmerson",
        "name": "Emmerson",
        "role": "Data Analyst",
        "description": "Helps with data analysis and insights generation",
        "system_prompt": "You are Emmerson, a Data Analyst. You help analyze data, generate insights, create reports, and identify trends. Be analytical, precise, and results-driven."
    }
}

@app.get("/api/specialists")
async def get_specialists():
    """Get all AI specialists"""
    try:
        specialists_list = [
            {
                "id": spec["id"],
                "name": spec["name"],
                "role": spec["role"],
                "description": spec["description"]
            }
            for spec in SPECIALISTS.values()
        ]
        
        return {
            "success": True,
            "data": {
                "specialists": specialists_list
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/specialists/{specialist_id}")
async def get_specialist(specialist_id: str):
    """Get a specific AI specialist"""
    try:
        if specialist_id not in SPECIALISTS:
            raise HTTPException(status_code=404, detail="Specialist not found")
        
        specialist = SPECIALISTS[specialist_id]
        
        return {
            "success": True,
            "data": {
                "specialist": {
                    "id": specialist["id"],
                    "name": specialist["name"],
                    "role": specialist["role"],
                    "description": specialist["description"]
                }
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SpecialistChatRequest(BaseModel):
    specialist_id: str
    conversation_id: Optional[str] = None
    message: str

@app.post("/api/specialists/chat")
async def chat_with_specialist(request: SpecialistChatRequest, authorization: str = Header(None)):
    """Chat with a specific AI specialist"""
    try:
        user = await get_current_user(authorization)
        
        if request.specialist_id not in SPECIALISTS:
            raise HTTPException(status_code=404, detail="Specialist not found")
        
        specialist = SPECIALISTS[request.specialist_id]
        
        # Generate conversation ID if new
        conversation_id = request.conversation_id or str(uuid.uuid4())
        message_id = str(uuid.uuid4())
        
        # Mock specialist-specific response
        specialist_responses = {
            "nova": f"As a Product Manager, let me help you with that. {request.message[:50]}... - I'll break this down into clear requirements and deliverables.",
            "harper": f"Let's work on your personal brand. {request.message[:50]}... - I'll help you stand out and present your best self.",
            "remy": f"Great topic! {request.message[:50]}... - Let me craft something engaging and well-structured for you.",
            "lennon": f"Perfect for social media! {request.message[:50]}... - I'll create content that drives engagement.",
            "emmerson": f"Let's analyze this data. {request.message[:50]}... - I'll provide clear insights and actionable recommendations."
        }
        
        ai_response = specialist_responses.get(request.specialist_id, f"Mock response from {specialist['name']}")
        
        # Create message objects
        user_message = {
            "id": str(uuid.uuid4()),
            "role": "user",
            "content": request.message,
            "timestamp": datetime.utcnow(),
        }
        
        assistant_message = {
            "id": message_id,
            "role": "assistant",
            "content": ai_response,
            "model": f"{specialist['name']} (Specialist)",
            "timestamp": datetime.utcnow(),
            "tokens_used": len(ai_response.split())
        }
        
        # Save or update conversation
        conversation = await conversations_collection.find_one({"_id": conversation_id})
        
        if conversation:
            # Update existing conversation
            await conversations_collection.update_one(
                {"_id": conversation_id},
                {
                    "$push": {"messages": {"$each": [user_message, assistant_message]}},
                    "$set": {
                        "last_message_at": datetime.utcnow(),
                        "ai_specialist": request.specialist_id
                    }
                }
            )
        else:
            # Create new conversation
            conversation_data = {
                "_id": conversation_id,
                "user_id": user["_id"],
                "title": request.message[:50] + "..." if len(request.message) > 50 else request.message,
                "messages": [user_message, assistant_message],
                "ai_specialist": request.specialist_id,
                "tags": [],
                "is_favorite": False,
                "folder": None,
                "created_at": datetime.utcnow(),
                "last_message_at": datetime.utcnow()
            }
            await conversations_collection.insert_one(conversation_data)
        
        # Update user usage stats
        await users_collection.update_one(
            {"_id": user["_id"]},
            {
                "$inc": {
                    "usage_stats.total_queries": 1,
                    "usage_stats.queries_this_month": 1
                }
            }
        )
        
        return {
            "success": True,
            "data": {
                "message_id": message_id,
                "conversation_id": conversation_id,
                "response": ai_response,
                "specialist": specialist["name"],
                "tokens_used": len(ai_response.split())
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Specialist chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Content Tools Endpoints
class SummarizeRequest(BaseModel):
    type: str  # url, text, file
    content: str
    length: str = "medium"

@app.post("/api/tools/summarize")
async def summarize_content(
    request: SummarizeRequest,
    authorization: str = Header(None)
):
    """Summarize content from URL, text, or file"""
    try:
        user = await get_current_user(authorization)
        
        # Extract content based on type
        if request.type == "url":
            content = ContentService.extract_url_content(request.content)
        elif request.type == "text":
            content = request.content
        elif request.type == "file":
            # File handling would be implemented here
            raise HTTPException(status_code=400, detail="File upload not yet implemented")
        else:
            raise HTTPException(status_code=400, detail="Invalid type")
        
        # Generate summary (mock for now)
        summary = ContentService.generate_mock_summary(content, request.length)
        
        # Update user usage stats
        await users_collection.update_one(
            {"_id": user["_id"]},
            {
                "$inc": {
                    "usage_stats.total_queries": 1,
                    "usage_stats.queries_this_month": 1
                }
            }
        )
        
        return {
            "success": True,
            "data": {
                "summary": summary
            }
        }
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Summarize error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

class GeneratePostRequest(BaseModel):
    platform: str  # linkedin, twitter
    topic: str
    tone: str = "professional"  # professional, casual, humorous, inspirational
    length: str = "medium"  # short, medium, long

@app.post("/api/tools/generate-post")
async def generate_post(
    request: GeneratePostRequest,
    authorization: str = Header(None)
):
    """Generate social media posts for LinkedIn or Twitter"""
    try:
        user = await get_current_user(authorization)
        
        # Validate platform
        if request.platform not in ["linkedin", "twitter"]:
            raise HTTPException(status_code=400, detail="Invalid platform. Must be 'linkedin' or 'twitter'")
        
        # Generate 3 variants (mock for now)
        variants = ContentService.generate_mock_posts(
            platform=request.platform,
            topic=request.topic,
            tone=request.tone,
            length=request.length
        )
        
        # Update user usage stats
        await users_collection.update_one(
            {"_id": user["_id"]},
            {
                "$inc": {
                    "usage_stats.total_queries": 1,
                    "usage_stats.queries_this_month": 1
                }
            }
        )
        
        return {
            "success": True,
            "data": {
                "variants": variants
            }
        }
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Generate post error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)