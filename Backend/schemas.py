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
    s3_image_url: str = None

    class Config: {
        "from_attributes": True}


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


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    mobile: int
    email: str
    password: str


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


class UserLogin(BaseModel):
    mobile: int
    password: str


class AddProduct(BaseModel):
    id: int
    productDisplayName: str
    gender: str
    masterCategory: str
    subCategory: str
    articleType: str
    baseColour: str
    season: str
    year: str
    usage: str


class UpdateProduct(BaseModel):
    id: int
    productDisplayName: Optional[str]
    gender: Optional[str]
    masterCategory: Optional[str]
    subCategory: Optional[str]
    articleType: Optional[str]
    baseColour: Optional[str]
    season: Optional[str]
    year: Optional[str]
    usage: Optional[str]

    model_config = {
        "from_attributes": True
    }