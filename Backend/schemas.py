from pydantic import BaseModel
from typing import Optional, List, Union

class TopProductResponse(BaseModel):
    id: int
    product_name: str
    gender : str
    price : str
    details : str
    total_images : int
    availability: bool
    images: List[str]

    class Config:{
        "from_attributes": True}


class PopularProductResponse(BaseModel):
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


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    mobile: int
    email: str
    password: str


class AllProductResponse(BaseModel):
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

class ProductListResponse(BaseModel):
    data: List[AllProductResponse]
    total: int
    pages: int


class UserLogin(BaseModel):
    mobile: int
    password: str


class AddProduct(BaseModel):
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