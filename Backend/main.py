from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
from sqlalchemy import text, func
=======
from sqlalchemy import text
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)
import pandas as pd
import math
from jose import jwt
import models
from database import *
from schemas import *
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
<<<<<<< HEAD

origins = [
    "http://localhost:3000",  # if you're running React with default port
    "http://localhost:3001",  # if you're using port 3001
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]
=======
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/top_products/", response_model=list[TopProductResponse])
<<<<<<< HEAD
async def get_top_products(db: Session = Depends(get_db)):
=======
def get_top_products(db: Session = Depends(get_db)):
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)
    try:
        products = db.query(models.Top_products).all()
        if not products:
            raise HTTPException(status_code=404, detail="No top products found")
        result = []
        for p in products:
<<<<<<< HEAD
            safe_name = p.product_name.replace(" ", "_")
            image_urls = []
            for i in range(1, p.total_images + 1):
                url = s3.generate_presigned_url(
                    "get_object",
                    Params={"Bucket": "e-commerce-product-images-bucket",
                            "Key": f"images/{safe_name}_{i}.jpg"},
                    ExpiresIn=360000)
                image_urls.append(url)
            result.append({
                    "id": p.id,
                    "product_name": p.product_name,
                    "gender": p.gender,
                    "price": p.price,
                    "details": p.details,
                    "total_images": p.total_images,
                    "availability": p.availability,
                    "images": image_urls
                    })
=======
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
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)

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
<<<<<<< HEAD
                safe_name = p.product_name.replace(" ", "_")
                image_urls = []
                for i in range(1, p.total_images + 1):
                    url = s3.generate_presigned_url(
                        "get_object",
                        Params={"Bucket": "e-commerce-product-images-bucket",
                                "Key": f"images/{safe_name}_{i}.jpg"},
                        ExpiresIn=360000)
                    image_urls.append(url)

                result.append({
                    "id": p.id,
                    "product_name": p.product_name,
                    "gender": p.gender,
                    "price": p.price,
                    "details": p.details,
                    "total_images": p.total_images,
                    "availability": p.availability,
                    "images": image_urls
                    })
=======
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
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)
                
        except Exception as e:
            raise HTTPException(status_code=500, detail="Not able to load s3 url")

        return result
<<<<<<< HEAD
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
                safe_name = p.product_name.replace(" ", "_")
                image_urls = []
                for i in range(1, p.total_images + 1):
                    url = s3.generate_presigned_url(
                        "get_object",
                        Params={"Bucket": "e-commerce-product-images-bucket",
                                "Key": f"images/{safe_name}_{i}.jpg"},
                        ExpiresIn=360000)
                    image_urls.append(url)
                result.append({
                    "id": p.id,
                    "product_name": p.product_name,
                    "gender": p.gender,
                    "price": p.price,
                    "details": p.details,
                    "total_images": p.total_images,
                    "availability": p.availability,
                    "images": image_urls
                    })
                
        except Exception as e:
            raise HTTPException(status_code=500, detail="Not able to load s3 url")
        
        return {
            "data": result,
            "total": total_products,
            "pages": math.ceil(total_products / limit)
        }
  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/products/{id}/", response_model=AllProductResponse)
async def get_popular_products(id: int, db: Session = Depends(get_db)):
    try:
        product = db.query(models.All_products).filter(models.All_products.id == id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        safe_name = product.product_name.replace(" ", "_")
        image_urls = []
        for i in range(1, product.total_images + 1):
            url = s3.generate_presigned_url(
                "get_object",
                Params={"Bucket": "e-commerce-product-images-bucket",
                        "Key": f"images/{safe_name}_{i}.jpg"},
                ExpiresIn=360000)
            image_urls.append(url)

        product_data = {
            "id": product.id,
            "product_name": product.product_name,
            "gender": product.gender,
            "price": product.price,
            "details": product.details,
            "total_images": product.total_images,
            "availability": product.availability,
            "images": image_urls
        }
        return product_data
    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@app.post("/signup/")
async def signup(user: UserCreate, db: Session = Depends(get_db)):
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
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.mobile == user.mobile).first()
    if not db_user or not db_user.password == user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"message": "Login successful"}

    # token = jwt.encode({"sub": db_user.username}, SECRET_KEY, algorithm=ALGORITHM)
    # return {"access_token": token, "token_type": "bearer"}


@app.post("/add_product/")
async def add_product(product: AddProduct, db: Session = Depends(get_db)):
    try:
        existing_product = db.query(models.All_products).filter(models.All_products.id == product.id).first()
        if existing_product:
            raise HTTPException(status_code=400, detail="Product already exists")
        new_product = models.All_products(
            id = product.id,
            product_name = product.product_name,
            gender = product.gender,
            price = product.price,
            details = product.details,
            availability = product.availability,
            total_images = product.total_images
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return {"message": "Product added successfully"}
    
=======
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    

<<<<<<< HEAD
@app.delete("/delete_product/{id}/")
async def delete_product(id: int, db: Session = Depends(get_db)):
    try:
        product_exist = db.query(models.All_products).filter(models.All_products.id == id).first()
        if not product_exist:
            raise HTTPException(status_code=404, detail="Product not exist")
        db.delete(product_exist)
        db.commit()
        return {"message": "Product deleted successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.put("/update_product/{id}/")
async def update_product(id:int, product: UpdateProduct, db: Session = Depends(get_db)):
    try:
        product_exist = db.query(models.All_products).filter(models.All_products.id == id).first()
        if not product_exist:
            raise HTTPException(status_code=404, detail="Product does not exist")
        
        update_data = product.model_dump(exclude_unset=True)
        update_data.pop("id", None)
        for key, value in update_data.items():
            setattr(product_exist, key, value)
        db.commit()
        db.refresh(product_exist)
        return {"message": "Product updated successfully", "updated_product": product_exist.id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

            

=======
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
>>>>>>> 68298c400 (Added optimized fastapi backend and orm)
