from fastapi import APIRouter, Depends, HTTPException, status
from motor.core import AgnosticDatabase
from app.models.cars import CarAdCreate, CarAdResponse
from app.services.car_ad_service import CarAdService
from app.core.database import get_db

router = APIRouter(prefix="/ads", tags=["Car Ads"])


@router.post(
    "/create",
    response_model=CarAdResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new car ad",
)
async def create_ad(
    ad: CarAdCreate,
    db: AgnosticDatabase = Depends(get_db),
    service: CarAdService = Depends(),
):
    """Create a new car advertisement"""
    return await service.create_ad(db, ad)


@router.get(
    "/get_list",
    response_model=list[CarAdResponse],
    summary="Get list of car ads",
)
async def get_ads_list(
    skip: int = 0,
    limit: int = 10,
    db: AgnosticDatabase = Depends(get_db),
    service: CarAdService = Depends(),
):
    """Get paginated list of car advertisements"""
    return await service.get_ads(db, skip, limit)


@router.get(
    "/get_detail/{ad_id}",
    response_model=CarAdResponse,
    summary="Get car ad by its id",
)
async def get_ad(
    ad_id: str,
    db: AgnosticDatabase = Depends(get_db),
    service: CarAdService = Depends(),
):
    return await service.get_ad(db=db, ad_id=ad_id)


# @router.get(
#     "/get_ml_analysis",
#     response_model=
# )
