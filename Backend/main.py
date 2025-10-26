from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import pandas as pd
import math
from jose import jwt
import models
from database import *
from schemas import *
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:3001",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/top_products/", response_model=list[TopProductResponse])
def get_top_products(db: Session = Depends(get_db)):
    try:
        products = db.query(models.Top_products).all()
        if not products:
            raise HTTPException(status_code=404, detail="No top products found")
        result = []
        for p in products:
            image_url = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': "s3-clothing-brand-images", 'Key': f'images/{p.id}.jpg'}, ExpiresIn=360000)
            
            result.append({
                    "id": p.id,
                    "productDisplayName": p.productDisplayName,
                    "gender": p.gender,
                    "s3_image_url": image_url,
                    "masterCategory": p.masterCategory,
                    "articleType": p.articleType,
                    "baseColour": p.baseColour,
                    "year": p.year,
                    "season": p.season,
                    "subCategory": p.subCategory})

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/popular_products/", response_model=list[PopularProductResponse])
async def get_top_products(db: Session = Depends(get_db)):
    try:
        products = db.query(models.Popular_products).all()
        if not products:
            raise HTTPException(status_code=404, detail="No popular products found")
        result = []
        try:
            for p in products:
                image_url = s3.generate_presigned_url(
                    'get_object',
                    Params={'Bucket': "s3-clothing-brand-images", 'Key': f'images/{p.id}.jpg'}, ExpiresIn=360000)

                result.append({
                    "id": p.id,
                    "productDisplayName": p.productDisplayName,
                    "gender": p.gender,
                    "s3_image_url": image_url,
                    "masterCategory": p.masterCategory,
                    "articleType": p.articleType,
                    "baseColour": p.baseColour,
                    "year": p.year,
                    "season": p.season,
                    "subCategory": p.subCategory})
                
        except Exception as e:
            raise HTTPException(status_code=500, detail="Not able to load s3 url")

        return result
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
        data = [dict(row) for row in result.mappings().all()] 
    for item in data:
        try:
            item_id = item["id"]
            item["s3_image_url"] = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': "s3-clothing-brand-images", 'Key': f'images/{item_id}.jpg'},
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
                                        Params={'Bucket': "s3-clothing-brand-images", 'Key': str('images/') + str(item) + str('.jpg')},
                                        ExpiresIn=360000)
        records = df.to_dict(orient="records")
        return records
    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@app.post("/signup/")
def signup(user: models.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.mobile_no == user.mobile).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = pwd_context.hash(user.password)
    new_user = models.User(mobile=user.mobile, email=user.email, 
                           password=hashed_pw, firstName=user.firstName, 
                           lastName=user.lastName)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@app.post("/login/")
def login(user: models.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode({"sub": db_user.username}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}