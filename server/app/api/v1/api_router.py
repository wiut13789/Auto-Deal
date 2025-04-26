from fastapi import APIRouter
from app.api.v1 import car_ads

# Create main API router
router = APIRouter()

# Include endpoints router
router.include_router(car_ads.router)
