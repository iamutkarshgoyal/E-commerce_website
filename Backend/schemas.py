from pydantic import BaseModel
from typing import Optional, List

class TopProductResponse(BaseModel):
    id: int
    productDisplayName: str
    gender: str
    masterCategory: str
    articleType: str
    baseColour: str
    year: int
    season: str
    subCategory: str
    s3_image_url: str

    class Config: {
        "from_attributes": True }


class PopularProductResponse(BaseModel):
    id: int
    productDisplayName: str
    gender: str
    masterCategory: str
    articleType: str
    baseColour: str
    year: int
    season: str
    subCategory: str
    s3_image_url: str

    class Config: {
        "from_attributes": True }


class UserResponse(BaseModel):

    id: int
    mobile_no: int
    email: str
    password: str
    first_name: str
    last_name: str

    class Config: {
        "from_attributes": True }


class AllProductResponse(BaseModel):
    id: int
    productDisplayName: str
    gender: Optional[str] = None
    s3_image_url: str
    masterCategory: Optional[str] = None
    articleType: Optional[str] = None
    baseColour: Optional[str] = None
    year: Optional[int] = None
    season: Optional[str] = None
    subCategory: Optional[str] = None

    model_config = {
        "from_attributes": True
    }

class ProductListResponse(BaseModel):
    data: List[AllProductResponse]
    total: int
    pages: int
