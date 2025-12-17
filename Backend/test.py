import pandas as pd
import ast
import os
import requests
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(os.getenv("DATABASE_URL"))
df = pd.read_csv("./Backend/data.csv")

df["product_images"] = df[" product_images"].apply(
    lambda x: ast.literal_eval(x) if isinstance(x, str) else x
)

IMAGE_DIR = "downloaded_images"
os.makedirs(IMAGE_DIR, exist_ok=True)


def safe_name(name):
    return name.strip().replace(" ", "_").replace("/", "_")

def download_images_and_count(row):
    product = safe_name(row["product_name"])
    images = row["product_images"]

    success_count = 0
    downloaded_files = []

    for img in images:
        url = list(img.keys())[0]
        file_name = f"{product}_{success_count + 1}.jpg"
        file_path = os.path.join(IMAGE_DIR, file_name)

        try:
            r = requests.get(url, timeout=15)
            r.raise_for_status()

            with open(file_path, "wb") as f:
                f.write(r.content)

            success_count += 1
            downloaded_files.append(file_path)

        except Exception:
            continue  # ❌ skip failed image

    return success_count

df["total_images"] = df.apply(download_images_and_count, axis=1)

# ❌ Drop only rows where ALL images failed
df = df[df["total_images"] > 0].reset_index(drop=True)
df.drop(columns=[" product_images", "link", "product_images"], inplace=True)
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
df["price"].replace("â‚¹ ", "", regex=True, inplace=True)
df["price"] = df["price"].str.replace(",", "")
print(df.head())
print(df.shape)
df.to_sql("ZARA_PRODUCTS", con=engine, if_exists="replace", index=False)