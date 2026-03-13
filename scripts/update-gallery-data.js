const fs = require("fs");
const path = require("path");

const GALLERY_DIR = path.join(__dirname, "../public/images/gallery");
const EMERGE_DIR = path.join(__dirname, "../public/images/emerge");
const OUTPUT_FILE = path.join(__dirname, "../lib/gallery-data.ts");
const METADATA_FILE = path.join(GALLERY_DIR, "metadata.json");

/**
 * Helper to get images from a directory
 */
function getImagesFromDir(dirPath, folderName, metadata, startIndex) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️ Directory not found: ${dirPath}`);
    return [];
  }

  const files = fs.readdirSync(dirPath).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
  });

  return files.map((fileName, index) => {
    const metaInfo = metadata.find((m) => m.fileName === fileName);
    const baseName = path.basename(fileName, path.extname(fileName));
    const displayName = baseName
      .replace(/-/g, " ")
      .replace(/\\b\\w/g, (l) => l.toUpperCase());

    return {
      id: metaInfo?.id || `${folderName}-${startIndex + index + 1}`,
      src: `/images/${folderName}/${fileName}`,
      alt: displayName,
      title: displayName,
      description: `Church photo - ${displayName}`,
      category: folderName, // e.g. "gallery" or "emerge"
      uploadedAt: metaInfo?.createdTime || new Date().toISOString(),
    };
  });
}

/**
 * Generate gallery data from downloaded images
 */
function updateGalleryData() {
  console.log("🔄 Updating gallery data...\\n");

  // Read metadata if it exists
  let metadata = [];
  if (fs.existsSync(METADATA_FILE)) {
    metadata = JSON.parse(fs.readFileSync(METADATA_FILE, "utf8"));
    console.log(`✅ Loaded metadata for ${metadata.length} images`);
  }

  const galleryImagesData = getImagesFromDir(GALLERY_DIR, "gallery", metadata, 0);
  const emergeImagesData = getImagesFromDir(EMERGE_DIR, "emerge", metadata, galleryImagesData.length);

  const allImages = [...galleryImagesData, ...emergeImagesData];
  
  // Sort images (newest first based on uploadedAt)
  allImages.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  console.log(`📸 Found ${allImages.length} total image files\\n`);

  // Generate TypeScript file
  const tsContent = `// Auto-generated gallery data
// Last updated: ${new Date().toISOString()}
// Total images: ${allImages.length}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  uploadedAt: string;
}

export const galleryImages: GalleryImage[] = ${JSON.stringify(allImages, null, 2)};

export function getImageById(id: string): GalleryImage | undefined {
  return galleryImages.find((img) => img.id === id);
}

export function getImagesByCategory(category: string): GalleryImage[] {
  return galleryImages.filter((img) => img.category === category);
}

export const categories = Array.from(
  new Set(galleryImages.map((img) => img.category))
);
`;

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, tsContent);

  console.log(`✅ Gallery data updated successfully!`);
  console.log(`📄 File: ${OUTPUT_FILE}`);
  console.log(`📊 Total images: ${allImages.length}`);
  console.log("\\n🎉 Done! Your gallery is ready to use.");
}

// Run the update
updateGalleryData();
