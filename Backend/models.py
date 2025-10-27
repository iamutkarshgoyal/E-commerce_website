from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class User(Base):
    __tablename__ = "USERS"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    mobile = Column(String, unique=True)
    email = Column(String)
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


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    mobile: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str
