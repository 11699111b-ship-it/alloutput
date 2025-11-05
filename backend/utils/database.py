from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client["alloutputs"]

# Collections
users_collection = db["users"]
conversations_collection = db["conversations"]
prompts_collection = db["prompts"]
model_comparisons_collection = db["model_comparisons"]

async def create_indexes():
    """Create database indexes for performance"""
    try:
        # Users
        await users_collection.create_index("email", unique=True)
        await users_collection.create_index("subscription_tier")
        
        # Conversations
        await conversations_collection.create_index("user_id")
        await conversations_collection.create_index([("last_message_at", -1)])
        await conversations_collection.create_index("ai_specialist")
        
        # Prompts
        await prompts_collection.create_index("category")
        await prompts_collection.create_index([("usage_count", -1)])
        await prompts_collection.create_index([
            ("title", "text"),
            ("description", "text")
        ])
        
        print("✅ Database indexes created successfully")
    except Exception as e:
        print(f"⚠️  Error creating indexes: {str(e)}")
