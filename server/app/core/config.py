from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Auto Deal Uz"
    DATABASE_URL: str = "mongodb://localhost:27017/auto_deal_db"
    DB_NAME: str = "auto_deal_db"

    class Config:
        env_file = ".env"


settings = Settings()
