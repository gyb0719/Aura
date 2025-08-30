from PIL import Image, ImageDraw, ImageFont
import os

# Create a modern favicon - circular gradient with "A" letter
sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]

def create_icon(size):
    # Create a new image with transparent background
    img = Image.new('RGBA', size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Calculate dimensions
    center = size[0] // 2
    radius = int(size[0] * 0.45)
    
    # Draw a circle with gradient effect (simulated with multiple circles)
    for i in range(radius, 0, -1):
        # Gradient from primary blue to lighter blue
        color_intensity = int(255 * (1 - i / radius * 0.3))
        color = (0, 122, 255, 255)  # Apple blue
        
        draw.ellipse(
            [center - i, center - i, center + i, center + i],
            fill=color
        )
    
    # Add "A" letter in the center
    font_size = int(size[0] * 0.5)
    try:
        # Try to use a system font
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        # Use default font if system font not available
        font = ImageFont.load_default()
    
    # Draw the letter "A" in white
    text = "A"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    text_x = center - text_width // 2
    text_y = center - text_height // 2 - int(size[0] * 0.05)  # Slight adjustment
    
    draw.text((text_x, text_y), text, fill=(255, 255, 255, 255), font=font)
    
    return img

# Create the main icon at largest size
main_icon = create_icon((256, 256))

# Create icons at different sizes
icons = []
for size in sizes:
    if size == (256, 256):
        icons.append(main_icon)
    else:
        # Resize the main icon for smaller sizes
        resized = main_icon.resize(size, Image.Resampling.LANCZOS)
        icons.append(resized)

# Save as ICO file with multiple sizes
icons[0].save(
    'C:\\Users\\gyb07\\projects\\aura-elite\\app\\favicon.ico',
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)

# Also save as PNG for modern browsers
main_icon.save('C:\\Users\\gyb07\\projects\\aura-elite\\public\\icon-512.png', 'PNG')
icons[4].save('C:\\Users\\gyb07\\projects\\aura-elite\\public\\icon-192.png', 'PNG')
icons[3].save('C:\\Users\\gyb07\\projects\\aura-elite\\public\\apple-touch-icon.png', 'PNG')

print("Favicon created successfully!")