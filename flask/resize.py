from PIL import Image
import os

def process_images(directory, output_directory):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(directory, filename)
            with Image.open(file_path) as img:
                # Crop 250 pixels from each side
                width, height = img.size
                new_width = width - 500
                new_height = height - 500
                if new_width > 0 and new_height > 0:
                    left = 250
                    top = 250
                    right = width - 250
                    bottom = height - 250
                    img_cropped = img.crop((left, top, right, bottom))

                    # Resize to 500x500
                    img_resized = img_cropped.resize((500, 500))

                    # Save the processed image
                    output_path = os.path.join(output_directory, filename)
                    img_resized.save(output_path)

directory = 'images'  # Replace with your images directory
output_directory = 'images-resized'  # Replace with your desired output directory
process_images(directory, output_directory)

