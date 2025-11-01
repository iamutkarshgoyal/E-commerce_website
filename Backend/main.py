from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text, func
import pandas as pd
import math
from jose import jwt
import models
from database import *
from schemas import *
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",  # if you're running React with default port
    "http://localhost:3001",  # if you're using port 3001
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/top_products/", response_model=list[TopProductResponse])
async def get_top_products(db: Session = Depends(get_db)):
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

    
@app.get("/products/", response_model=ProductListResponse)
async def get_products(db: Session = Depends(get_db), skip: int = 0, 
                       limit: int = 20, gender: str = None):
    try:
        query = db.query(models.All_products)
        if gender:
            query = query.filter(models.All_products.gender == gender)

        total_products = query.count()
        products = query.offset(skip).limit(limit).all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        result = []
        try:
            for p in products:
                image_url = s3.generate_presigned_url(
                    'get_object',
                    Params={'Bucket': "s3-clothing-brand-images", 
                            'Key': f'images/{p.id}.jpg'}, ExpiresIn=360000)

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
        
        return {
            "data": result,
            "total": total_products,
            "pages": math.ceil(total_products / limit)
        }
  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/products/{id}/", response_model=TopProductResponse)
async def get_popular_products(id: int, db: Session = Depends(get_db)):
    try:
        product = db.query(models.All_products).filter(models.All_products.id == id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        s3_image_url = s3.generate_presigned_url(
                                        'get_object', 
                                        Params={'Bucket': "s3-clothing-brand-images", 'Key': str('images/') + str(id) + str('.jpg')},
                                        ExpiresIn=360000)
        product_data = {
            "id": product.id,
            "productDisplayName": product.productDisplayName,
            "gender": product.gender,
            "masterCategory": product.masterCategory,
            "articleType": product.articleType,
            "baseColour": product.baseColour,
            "year": product.year,
            "season": product.season,
            "subCategory": product.subCategory,
            "s3_image_url": s3_image_url
        }
        return product_data
    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@app.post("/signup/")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.mobile == user.mobile).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = models.User(
        firstname=user.firstname,
        lastname=user.lastname,
        mobile=user.mobile,
        email=user.email,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.mobile == user.mobile).first()
    if not db_user or not db_user.password == user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"message": "Login successful"}

    # token = jwt.encode({"sub": db_user.username}, SECRET_KEY, algorithm=ALGORITHM)
    # return {"access_token": token, "token_type": "bearer"}


@app.post("/add_product/")
def add_product(product: AddProduct, db: Session = Depends(get_db)):
    try:
        existing_product = db.query(models.All_products).filter(models.All_products.id == product.id).first()
        if existing_product:
            raise HTTPException(status_code=400, detail="Product already exists")
        new_product = models.All_products(
            id = product.id,
            productDisplayName = product.productDisplayName,
            gender = product.gender,
            masterCategory = product.masterCategory,
            subCategory = product.subCategory,
            articleType = product.articleType,
            baseColour = product.baseColour,
            season = product.season,
            year = product.year,
            usage = product.usage
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return {"message": "Product added successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.delete("/delete_product/{id}/")
def delete_product(id: int, db: Session = Depends(get_db)):
    try:
        product_exist = db.query(models.All_products).filter(models.All_products.id == id).first()
        if not product_exist:
            raise HTTPException(status_code=404, detail="Product not exist")
        db.delete(product_exist)
        db.commit()
        return {"message": "Product deleted successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.put("/update_product/")
def update_product(product: UpdateProduct, db: Session = Depends(get_db)):
    try:
        product_exist = db.query(models.All_products).filter(models.All_products.id == product.id).first()
        if not product_exist:
            raise HTTPException(status_code=404, detail="Product does not exist")

        update_data = product.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(product_exist, key, value)
        db.commit()
        db.refresh(product_exist)
        return {"message": "Product updated successfully", "updated_product": product_exist.id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

            

