from pydantic import BaseModel

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