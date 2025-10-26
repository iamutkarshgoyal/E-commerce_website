from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

class User(Base):
    __tablename__ = "USERS"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    mobile_no = Column(Integer, unique=True)
    email = Column(String(255), unique=True)
    password = Column(String)
    first_name = Column(String(100))
    last_name = Column(String(100))


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
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str
