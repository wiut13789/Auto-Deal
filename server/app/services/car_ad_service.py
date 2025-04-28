from fastapi import HTTPException, status
from bson import ObjectId
from server.app.models.cars import CarAdCreate, CarAdResponse


class CarAdService:
    async def create_ad(
        self,
        db,
        ad_data: CarAdCreate,
    ):
        result = await db.ads.insert_one(ad_data.model_dump(by_alias=True))
        created_ad = await db.ads.find_one({"_id": result.inserted_id})
        if not created_ad:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create ad",
            )
        return CarAdResponse.from_mongo(created_ad)

    async def get_ads(
        self,
        db,
        skip: int = 0,
        limit: int = 10,
    ):
        ads = await db.ads.find().skip(skip).limit(limit).to_list(limit)
        return [CarAdResponse.from_mongo(ad) for ad in ads]

    async def get_ad(
        self,
        db,
        ad_id,
    ):
        ad = await db.ads.find_one({"_id": ObjectId(ad_id)})
        if ad is None:
            HTTPException(status_code=404, detail="Car ad not found")

        ad["_id"] = str(ad["_id"])
        return ad

    async def delete_ad(
        self,
        db,
        ad_id,
    ):
        if not ObjectId.is_valid(ad_id):
            raise HTTPException(status_code=400, detail="Invalid ID format")

        result = await db.ads.delete_one({"_id": ObjectId(ad_id)})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Car ad not found")

        return {"message": "Car ad successfully deleted"}
