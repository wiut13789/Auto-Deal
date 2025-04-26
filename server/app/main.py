from fastapi import FastAPI
from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.api.v1.api_router import router as api_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

# Настройка CORS для разрешения запросов с фронтенда (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Разрешаем запросы только с фронтенда
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP-методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Подключение роутеров
app.include_router(api_router, prefix="/api/v1")


# События MongoDB
app.add_event_handler("startup", lambda: connect_to_mongo())
app.add_event_handler("shutdown", lambda: close_mongo_connection())


