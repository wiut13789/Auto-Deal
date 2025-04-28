import sys
import os


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../ml')))

from fastapi import FastAPI
from server.app.core.config import settings
from server.app.core.database import connect_to_mongo, close_mongo_connection
from server.app.api.v1.api_router import router as api_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров
app.include_router(api_router, prefix="/api/v1")

# События MongoDB
app.add_event_handler("startup", lambda: connect_to_mongo())
app.add_event_handler("shutdown", lambda: close_mongo_connection())
