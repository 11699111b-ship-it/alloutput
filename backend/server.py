from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
import uuid

from utils.database import users_collection, create_indexes
from services.auth_service import hash_password, verify_password, create_access_token, verify_token
from models.user import SignupRequest, LoginRequest, UserResponse, AuthResponse

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)