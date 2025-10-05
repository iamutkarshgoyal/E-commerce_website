from sqlalchemy import create_engine
from urllib.parse import quote_plus
import pandas as pd
import json
import os

username = "utkarsh"
password = quote_plus("1234")
host = "localhost"
port = "5432"
database = "postgres"

engine = create_engine(f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}")

Woman_df = pd.DataFrame()
for csv in os.listdir("./Backend/zara_data/Women/Women/"):
    if csv.endswith(".csv"):
        df = pd.read_csv(f"./Backend/zara_data/Women/Women/{csv}")
        df["category"] = "Woman"
        df["subcategory"] = csv.split(".")[0]
        Woman_df = pd.concat([Woman_df, df], ignore_index=True)

man_df = pd.DataFrame()
for csv in os.listdir("./Backend/zara_data/Men/Men/"):
    if csv.endswith(".csv"):
        df = pd.read_csv(f"./Backend/zara_data/Men/Men/{csv}")
        df["category"] = "Men"
        df["subcategory"] = csv.split(".")[0]
        man_df = pd.concat([man_df, df], ignore_index=True)

Woman_df.rename(columns={"Product_Image": "product_images",
                         "Product_Name":"product_name",
                         "Price":"price",
                         "Details":"details"}, inplace=True)
Woman_df.drop(columns=["Link", "Unnamed: 0"], inplace=True)

man_df.rename(columns={" product_images": "product_images"
             }, inplace=True)
man_df.drop(columns=["link", "Unnamed: 0"], inplace=True)

print(man_df.shape, Woman_df.shape)

df = pd.concat([man_df, Woman_df], ignore_index=True)
data_dict = df.to_dict(orient="records")

# Write to JS file
with open("./src/Data/cleaned_zara_all_data.js", "w") as f:
    f.write("const cleaned_zara_all_data = ")
    json.dump(data_dict, f, indent=2)
    f.write(";\n\nexport default cleaned_zara_all_data;")


