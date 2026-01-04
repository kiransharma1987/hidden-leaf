/**
 * Gallery Image Scanner
 * 
 * Simply drop images into the category folders and run: node scan-gallery.js
 * This will auto-generate the gallery.json config file.
 * 
 * Folder structure:
 *   src/assets/images/gallery/
 *     ├── venue/
 *     ├── weddings/
 *     ├── celebrations/
 *     └── corporate/
 * 
 * Image naming tip: Use descriptive filenames like "outdoor-lawn-setup.jpg"
 * They will be converted to captions: "Outdoor Lawn Setup"
 */

const fs = require('fs');
const path = require('path');

const GALLERY_PATH = path.join(__dirname, 'src/assets/images/gallery');
const OUTPUT_PATH = path.join(__dirname, 'src/assets/data/gallery.json');

const CATEGORIES = [
  { id: 'venue', name: 'Venue' },
  { id: 'weddings', name: 'Weddings' },
  { id: 'celebrations', name: 'Celebrations' },
  { id: 'corporate', name: 'Corporate' }
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Convert filename to readable caption
// "outdoor-lawn-setup.jpg" → "Outdoor Lawn Setup"
function filenameToCaption(filename) {
  const nameWithoutExt = path.parse(filename).name;
  return nameWithoutExt
    .replace(/[-_]/g, ' ')           // Replace dashes/underscores with spaces
    .replace(/\s+/g, ' ')            // Remove extra spaces
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function scanGallery() {
  console.log('🖼️  Scanning gallery folders...\n');
  
  const config = { categories: [] };
  let totalImages = 0;

  for (const category of CATEGORIES) {
    const folderPath = path.join(GALLERY_PATH, category.id);
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📁 Created folder: ${category.id}/`);
    }

    // Read images from folder
    const files = fs.readdirSync(folderPath)
      .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
      .sort();

    const images = files.map(filename => ({
      filename,
      alt: filenameToCaption(filename)
    }));

    config.categories.push({
      id: category.id,
      name: category.name,
      folder: `assets/images/gallery/${category.id}`,
      images
    });

    console.log(`✅ ${category.name}: ${images.length} images`);
    totalImages += images.length;
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write config file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(config, null, 2));
  
  console.log(`\n✨ Done! Found ${totalImages} total images.`);
  console.log(`📄 Config saved to: src/assets/data/gallery.json`);
}

scanGallery();
