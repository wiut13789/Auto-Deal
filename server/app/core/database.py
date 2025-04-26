from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


async def get_db():
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    try:
        db = client[settings.DB_NAME]
        yield db
    finally:
        client.close()  # Закрываем подключение при завершении


async def connect_to_mongo():
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    return client[settings.DB_NAME]


async def close_mongo_connection(client: AsyncIOMotorClient):
    client.close()
