from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
import pandas as pd
import os
import boto3
import math
from dotenv import load_dotenv

load_dotenv()

s3 = boto3.client('s3', 
                  aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
                  aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                  region_name=os.getenv("AWS_REGION")
) 
bucket_name = 's3-clothing-brand-images'
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:3001",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine(os.getenv("DATABASE_URL"))

@app.get("/top_products/")
async def get_top_products():
    try:
        query = text('SELECT * FROM public."TOP_PRODUCT_TABLE"')
        df = pd.read_sql(query, engine)
        df["s3_image_url"] = None
        if df.empty:
            raise HTTPException(status_code=404, detail="No top products found")
        for item in df["id"]:
            df.loc[df["id"]==item, "s3_image_url"] = s3.generate_presigned_url(
                                        'get_object', 
                                        Params={'Bucket': bucket_name, 'Key': str('images/') + str(item) + str('.jpg')},
                                        ExpiresIn=360000)
        records = df.to_dict(orient="records")

        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/popular_products/")
async def get_popular_products():
    try:
        query = text('SELECT * FROM public."POPULAR_PRODUCT_TABLE"')
        df = pd.read_sql(query, engine)
        df["s3_image_url"] = None  
        if df.empty:
            raise HTTPException(status_code=404, detail="No popular products found")
        for item in df["id"]:
            df.loc[df["id"]==item, "s3_image_url"] = s3.generate_presigned_url(
                                        'get_object', 
                                        Params={'Bucket': bucket_name, 'Key': str('images/') + str(item) + str('.jpg')},
                                        ExpiresIn=360000)
        records = df.to_dict(orient="records")
        return records
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/products/")
async def get_products(skip: int = 0, limit: int = 20, gender: str = None):
    base_query = 'FROM public."ALL_DATA_TABLE"'
    where_clause = ""
    params = {}

    if gender:
        where_clause = " WHERE LOWER(gender) = LOWER(:gender)"
        params["gender"] = gender

    count_query = text(f"SELECT COUNT(*) {base_query}{where_clause}")
    data_query = text(f"SELECT * {base_query}{where_clause} LIMIT :limit OFFSET :skip")

    with engine.connect() as conn:
        # Total count
        total_count = conn.execute(count_query, params).scalar()
        # Fetch paginated data
        params.update({"limit": limit, "skip": skip})
        result = conn.execute(data_query, params)
        data = [dict(row) for row in result.mappings().all()]  # ✅ convert to dict

    # Add presigned S3 URL for each item
    for item in data:
        try:
            item_id = item["id"]
            item["s3_image_url"] = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': bucket_name, 'Key': f'images/{item_id}.jpg'},
                ExpiresIn=3600
            )
        except Exception as e:
            item["s3_image_url"] = None
            print(f"❌ Could not generate presigned URL for ID {item_id}: {e}")

    return {
        "total": total_count,
        "pages": math.ceil(total_count / limit) if total_count else 1,
        "data": data
    }


@app.get("/products/{id}/")
async def get_popular_products(id:int):
    try:
        query = text('SELECT * FROM public."ALL_DATA_TABLE" WHERE id = :id')
        df = pd.read_sql(query, engine, params={"id": id})
        df["s3_image_url"] = None  
        if df.empty:
            raise HTTPException(status_code=404, detail="No products found")
        for item in df["id"]:
            df.loc[df["id"]==item, "s3_image_url"] = s3.generate_presigned_url(
                                        'get_object', 
                                        Params={'Bucket': bucket_name, 'Key': str('images/') + str(item) + str('.jpg')},
                                        ExpiresIn=360000)
        records = df.to_dict(orient="records")
        return records
    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")