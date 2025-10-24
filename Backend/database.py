from sqlalchemy import create_engine
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    engine = create_engine(os.getenv("DATABASE_URL"))
    df = pd.read_sql('''SELECT * FROM public."ZARA_TOP_PRODUCT"''', engine)
    return df.to_json(orient='records')

