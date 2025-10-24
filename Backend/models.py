from sqlalchemy import create_engine
import pandas as pd
import os
import boto3
from botocore.exceptions import NoCredentialsError, ClientError
from dotenv import load_dotenv
from tqdm import tqdm

load_dotenv()

engine = create_engine(os.getenv("DATABASE_URL"))

df = pd.read_csv("./styles.csv")
df["s3_image_url"] = None

s3 = boto3.client('s3', 
                  aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
                  aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                  region_name=os.getenv("AWS_REGION")
) 

bucket_name = 's3-clothing-brand-images'
folder_path = './images'

failed_ids = []

for idx, row in tqdm(df.iterrows(), total=len(df)):
    image_filename = f"{row['id']}.jpg"  # construct filename from id
    file_path = os.path.join(folder_path, image_filename)
    s3_key = f"images/{image_filename}"

    if not os.path.exists(file_path):
        print(f"❌ File not found for ID {row['id']}: {file_path}")
        failed_ids.append(row['id'])
        continue

    try:
        # Upload image
        with open(file_path, "rb") as f:
            s3.upload_fileobj(f, bucket_name, s3_key)

        # Generate presigned URL (valid 1 hour)
        presigned_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': s3_key},
            ExpiresIn=3600
        )
        df.at[idx, "s3_image_url"] = presigned_url

    except ClientError as e:
        print(f"❌ AWS error for ID {row['id']}: {e}")
        failed_ids.append(row['id'])
    except Exception as e:
        print(f"❌ Unexpected error for ID {row['id']}: {e}")
        failed_ids.append(row['id'])

# -------------------- Drop failed rows --------------------
if failed_ids:
    df = df[~df["id"].isin(failed_ids)]
    print(f"🧹 Dropped {len(failed_ids)} failed uploads.")

df.to_sql("ALL_DATA_TABLE", engine, if_exists="replace", index=False)