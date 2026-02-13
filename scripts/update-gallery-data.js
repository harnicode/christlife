const fs = require("fs");
const path = require("path");

const GALLERY_DIR = path.join(__dirname, "../public/images/gallery");
const OUTPUT_FILE = path.join(__dirname, "../lib/gallery-data.ts");
const METADATA_FILE = path.join(GALLERY_DIR, "metadata.json");

/**
 * Generate gallery data from downloaded images
 */
function updateGalleryData() {
  console.log("🔄 Updating gallery data...\n");

  // Check if gallery directory exists
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error(
      "❌ Gallery directory not found. Run 'npm run sync:gallery' first.",
    );
    process.exit(1);
  }

  // Read metadata if it exists
  let metadata = [];
  if (fs.existsSync(METADATA_FILE)) {
    metadata = JSON.parse(fs.readFileSync(METADATA_FILE, "utf8"));
    console.log(`✅ Loaded metadata for ${metadata.length} images`);
  }

  // Get all image files
  const imageFiles = fs.readdirSync(GALLERY_DIR).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
  });

  console.log(`📸 Found ${imageFiles.length} image files\n`);

  // Generate gallery data
  const galleryImages = imageFiles.map((fileName, index) => {
    const metaInfo = metadata.find((m) => m.fileName === fileName);
    const baseName = path.basename(fileName, path.extname(fileName));
    const displayName = baseName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      id: metaInfo?.id || `img-${index + 1}`,
      src: `/images/gallery/${fileName}`,
      alt: displayName,
      title: displayName,
      description: `Church photo - ${displayName}`,
      category: "general", // You can customize this based on folder structure
      uploadedAt: metaInfo?.createdTime || new Date().toISOString(),
    };
  });

  // Generate TypeScript file
  const tsContent = `// Auto-generated gallery data
// Last updated: ${new Date().toISOString()}
// Total images: ${galleryImages.length}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  uploadedAt: string;
}

export const galleryImages: GalleryImage[] = ${JSON.stringify(galleryImages, null, 2)};

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
  console.log(`📊 Total images: ${galleryImages.length}`);
  console.log("\n🎉 Done! Your gallery is ready to use.");
}

// Run the update
updateGalleryData();
