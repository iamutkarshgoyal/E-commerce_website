from sqlalchemy import Column, Integer, String, BIGINT, Boolean
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class User(Base):
    __tablename__ = "USERS"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    mobile = Column(BIGINT, unique=True)
    email = Column(String, unique=True)
    password = Column(String)


class Top_products(Base):
    __tablename__ = "NEW_PRODUCT_TABLE"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String)
    gender = Column(String)
    price = Column(String)
    details = Column(String)
    availability = Column(Boolean)
    total_images = Column(Integer)


class Popular_products(Base):
    __tablename__ = "POPULAR_PRODUCT_TABLE"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String)
    gender = Column(String)
    price = Column(String)
    details = Column(String)
    availability = Column(Boolean)
    total_images = Column(Integer)


class All_products(Base):
    __tablename__ = "ZARA_PRODUCTS"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String)
    gender = Column(String)
    price = Column(String)
    details = Column(String)
    availability = Column(Boolean)
    total_images = Column(Integer)


class UserLogin(BaseModel):
    mobile: int
    password: str


class AddProduct(BaseModel):
    id: int
    product_name: str
    gender: str
    price: str
    details: str
    availability: bool
    total_images: int

    class Config: {
        "from_attributes": True
    }


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    first_name: str
    last_name: str
    mobile: int
    