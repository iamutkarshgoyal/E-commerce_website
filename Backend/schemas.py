from pydantic import BaseModel
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cleanup-pycache
from typing import Optional, List, Union

class TopProductResponse(BaseModel):
    id: int
<<<<<<< HEAD
    product_name: str
    gender : str
    price : str
    details : str
    total_images : int
    availability: bool
    images: List[str]

    class Config:{
=======
    productDisplayName: str
    gender: str
    masterCategory: str
    articleType: str
    baseColour: str
    year: int
    season: str
    usage: str
    subCategory: str
    s3_image_url: str = None

    class Config: {
>>>>>>> cleanup-pycache
        "from_attributes": True}


class PopularProductResponse(BaseModel):
<<<<<<< HEAD
    id : int
    product_name : str
    gender : str
    price : str
    details : str
    total_images : int
    availability: bool
    images: List[str]

    class Config: {
        "from_attributes": True}
=======
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
    usage: str

    class Config: {
        "from_attributes": True }
>>>>>>> cleanup-pycache


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    mobile: int
    email: str
    password: str


class AllProductResponse(BaseModel):
<<<<<<< HEAD
    id : int
    product_name : str
    gender : str
    price : str
    details : str
    total_images : int
    availability: bool
    images: List[str]

    class Config: {
        "from_attributes": True}
=======
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
    usage: Optional[str] = None

    model_config = {
        "from_attributes": True
    }
>>>>>>> cleanup-pycache

class ProductListResponse(BaseModel):
    data: List[AllProductResponse]
    total: int
    pages: int


class UserLogin(BaseModel):
    mobile: int
    password: str


class AddProduct(BaseModel):
<<<<<<< HEAD
    id : int
    product_name : str
    gender : str
    price : str
    details : str
    total_images : int
    availability: bool


class UpdateProduct(BaseModel):
    product_name : Optional[str]
    gender : Optional[str]
    price : Optional[str]
    details : Optional[str]
    total_images : Optional[int]
    availability: Optional[bool]

    class Config: {
        "from_attributes": True
    }
=======

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

    class Config:
        orm_mode = True 


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

    class Config:
        orm_mode = True 
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)
=======
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
    productDisplayName: Optional[str]
    gender: Optional[str]
    masterCategory: Optional[str]
    subCategory: Optional[str]
    articleType: Optional[str]
    baseColour: Optional[Union[str, int]]
    season: Optional[str]
    year: Optional[int]
    usage: Optional[str]

    model_config = {
        "from_attributes": True
    }
>>>>>>> cleanup-pycache
