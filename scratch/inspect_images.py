import os
from PIL import Image

image_dir = r"c:\Users\DELL\Desktop\IndiranJewellers2\public\images"
for f in os.listdir(image_dir):
    p = os.path.join(image_dir, f)
    if os.path.isfile(p):
        try:
            with Image.open(p) as img:
                print(f"File: {f}, Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
        except Exception as e:
            print(f"File: {f}, Error: {e}")
