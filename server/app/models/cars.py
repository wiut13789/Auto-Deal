from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, Annotated
from bson import ObjectId
from pydantic.functional_validators import AfterValidator
from typing_extensions import Self


def validate_object_id(v: str | ObjectId) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str) and ObjectId.is_valid(v):
        return v
    raise ValueError("Invalid ObjectId")


PyObjectId = Annotated[str, AfterValidator(validate_object_id)]


class CarAdBase(BaseModel):
    bodyType: str
    brand: str
    color: str
    description: str
    fuelType: str
    isNew: Optional[bool]
    kilometers: str
    model: str
    phoneNumber: str
    photo: Optional[str]
    previousOwners: str
    price: int
    region: str
    transmissionType: str
    year: str





class CarAdCreate(CarAdBase):
    model_config = ConfigDict(json_encoders={ObjectId: str}, populate_by_name=True)


class CarAdResponse(CarAdBase):
    id: str = Field(..., alias="_id")

    model_config = ConfigDict(
        json_encoders={ObjectId: str},
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

    @classmethod
    def from_mongo(cls, data: dict) -> Self:
        if "_id" in data:
            data["_id"] = str(data["_id"])
        return cls(**data)
