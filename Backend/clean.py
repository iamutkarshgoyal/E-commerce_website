import pandas as pd
import json
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()
engine = create_engine(os.getenv("DATABASE_URL"))   
df = pd.read_sql("ALL_DATA_TABLE", engine)
print(df.head())    