from sqlalchemy import Column, Integer, String, BIGINT
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
    __tablename__ = "TOP_PRODUCT_TABLE"

    id = Column(Integer, primary_key=True, index=True)
    productDisplayName = Column(String)
    gender = Column(String)
    masterCategory = Column(String)
    subCategory = Column(String)
    articleType = Column(String)
    baseColour = Column(String)
    season = Column(String)
    year = Column(String)
    usage = Column(String)
    

class Popular_products(Base):
    __tablename__ = "POPULAR_PRODUCT_TABLE"

    id = Column(Integer, primary_key=True, index=True)
    productDisplayName = Column(String)
    gender = Column(String)
    masterCategory = Column(String)
    subCategory = Column(String)
    articleType = Column(String)
    baseColour = Column(String)
    season = Column(String)
    year = Column(String)
    usage = Column(String)


class All_products(Base):
    __tablename__ = "ALL_DATA_TABLE"

    id = Column(Integer, primary_key=True, index=True)
    productDisplayName = Column(String)
    gender = Column(String)
    masterCategory = Column(String)
    subCategory = Column(String)
    articleType = Column(String)
    baseColour = Column(String)
    season = Column(String)
    year = Column(String)
    usage = Column(String)


class UserLogin(BaseModel):
    mobile: int
    password: str


class AddProduct(BaseModel):
    productDisplayName: str
    gender: str
    masterCategory: str
    subCategory: str
    articleType: str
    baseColour: str
    season: str
    year: str
    usage: str
    s3_image_url: str

