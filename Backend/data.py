from sqlalchemy import create_engine
from urllib.parse import quote_plus
import pandas as pd

username = "postgres"
password = quote_plus("Hello@123")
host = "localhost"
port = "5432"
database = "postgres"

engine = create_engine(f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}")

df = pd.read_csv("./Data/toys.csv")
df.to_sql("TOY_NAME", engine, if_exists="replace", index = False)