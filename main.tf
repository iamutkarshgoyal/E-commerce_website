provider "aws" {
  region = "ap-south-1"
}

resource "aws_s3_bucket" "e-commerce_product_images" {
  bucket = "e-commerce-product-images-bucket"

  versioning {
    enabled = true
  }

  tags = {
    Name        = "E-Commerce Product Images Bucket"
    Environment = "Production"
  }
  

}

resource "aws_s3_object" "product_images" {
  for_each = fileset("downloaded_images", "*.jpg")

  bucket = "e-commerce-product-images-bucket"
  key    = "images/${each.value}"
  source = "downloaded_images/${each.value}"

  content_type = "image/jpeg"
}
