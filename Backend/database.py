import os
import csv
import ast
import requests
from urllib.parse import urlparse

# === CONFIGURATION ===
INPUT_CSV = "./Backend/zara_all_data.csv"                 # Input CSV file
OUTPUT_CSV = "./Backend/cleaned_zara_all_data.csv"       # New CSV without failed image rows
IMAGE_BASE_DIR = "./public/zara_images"                 # Base folder to save images

# Read all rows first
with open(INPUT_CSV, newline='', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    rows = list(reader)

clean_rows = []  # to keep only successful rows

# === PROCESS EACH PRODUCT ROW ===
for idx, row in enumerate(rows, start=1):
    product_name = row.get("product_name") or row.get("Product_Name") or f"Product_{idx}"
    category = row.get("category") or row.get("Category") or "Uncategorized"
    raw_images = row.get(" product_images") or row.get("Product_Image") or ""

    if not raw_images.strip():
        print(f"⚠️ No images found for: {product_name}")
        continue

    try:
        image_list = ast.literal_eval(raw_images)
    except Exception as e:
        print(f"❌ Failed to parse image data for {product_name}: {e}")
        continue

    all_success = True  # flag to check if all images will download
    downloaded_images = []  # temporary storage

    for i, image_dict in enumerate(image_list, start=1):
        try:
            img_url = list(image_dict.keys())[0]
            img_name = os.path.basename(urlparse(img_url).path)
            downloaded_images.append((i, img_name, img_url))
        except Exception as e:
            print(f"❌ Error processing image URL for {product_name}: {e}")
            all_success = False
            break

    if not all_success or not downloaded_images:
        print(f"🚫 Skipping {product_name} due to invalid image data.")
        continue

    # === TRY DOWNLOADING IMAGES ===
    success = True
    temp_folder = os.path.join(IMAGE_BASE_DIR, "temp")
    os.makedirs(temp_folder, exist_ok=True)

    for i, img_name, img_url in downloaded_images:
        try:
            response = requests.get(img_url, timeout=10)
            if response.status_code != 200:
                print(f"❌ Failed ({response.status_code}) {img_url}")
                success = False
                break
        except Exception as e:
            print(f"❌ Error downloading image for {product_name}: {e}")
            success = False
            break

    if success:
        # === CREATE FOLDER ONLY AFTER ALL IMAGES ARE VERIFIED ===
        safe_category = "".join(c for c in category if c.isalnum() or c in (" ", "_", "-")).strip()
        safe_product = "".join(c for c in product_name if c.isalnum() or c in (" ", "_", "-")).strip()
        product_dir = os.path.join(IMAGE_BASE_DIR, safe_category, safe_product)
        os.makedirs(product_dir, exist_ok=True)

        # Save images
        for i, img_name, img_url in downloaded_images:
            img_path = os.path.join(product_dir, f"{i}_{img_name}")
            response = requests.get(img_url, timeout=10)
            with open(img_path, "wb") as f:
                f.write(response.content)
        print(f"✅ All images saved for {category}/{product_name}")
        clean_rows.append(row)
    else:
        print(f"🚫 Skipping {product_name} due to failed images.")

# === WRITE CLEANED CSV ===
if clean_rows:
    with open(OUTPUT_CSV, "w", newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(clean_rows)

    print(f"\n✅ Clean CSV saved as: {OUTPUT_CSV}")
    print(f"🧮 Total kept: {len(clean_rows)} / {len(rows)} rows")
else:
    print("\n⚠️ No rows saved — all products had failed images.")
