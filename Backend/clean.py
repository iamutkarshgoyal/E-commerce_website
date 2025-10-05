import json
import ast
import re
import os

frontend_data_path = os.path.join(".", "src", "Data", "cleaned_zara_all_data.js")

# --- STEP 1: Read JS content ---
with open(frontend_data_path, "r", encoding="utf-8") as f:
    js_content = f.read()

# --- STEP 2: Extract JSON array inside the JS file ---
match = re.search(r"\[\s*{[\s\S]*}\s*\]", js_content)
if not match:
    raise ValueError("⚠️ Could not find JSON array in the file.")

json_text = match.group(0)
json_text = json_text.replace("NaN", "null")

# --- STEP 3: Parse JSON safely ---
data = json.loads(json_text)

# --- STEP 4: Normalize product_images field ---
cleaned = []
for item in data:
    # Normalize key with possible leading space
    if " product_images" in item:
        item["product_images"] = item.pop(" product_images")

    imgs = item.get("product_images")

    # If it's a string, try to turn it into a list
    if isinstance(imgs, str):
        imgs = imgs.strip()
        if imgs.startswith("[") and imgs.endswith("]"):
            try:
                # Try Python-safe evaluation first
                parsed = ast.literal_eval(imgs)
                # Extract only string-like values
                if isinstance(parsed, list):
                    imgs = [str(x) for x in parsed if isinstance(x, str)]
                else:
                    imgs = []
            except Exception:
                # If fails, fallback to regex extract
                imgs = re.findall(r"https?://[^\s,'\"]+", imgs)
        else:
            imgs = []

    # Make sure it's a list now
    if not isinstance(imgs, list):
        imgs = []

    # Skip row if no images exist
    if not imgs:
        continue

    item["product_images"] = imgs
    cleaned.append(item)

# --- STEP 5: Save cleaned version back ---
output_js = (
    "const cleaned_zara_all_data = "
    + json.dumps(cleaned, indent=2, ensure_ascii=False)
    + ";\n\nexport default cleaned_zara_all_data;"
)

with open(frontend_data_path, "w", encoding="utf-8") as f:
    f.write(output_js)

print(f"✅ Cleaned {len(cleaned)} rows (removed rows with no images).")
print("💾 File updated at:", frontend_data_path)
