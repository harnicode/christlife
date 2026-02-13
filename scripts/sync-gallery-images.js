require("dotenv").config({ path: ".env.local" });
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const https = require("https");

// Configuration
const FOLDER_ID =
  process.env.GOOGLE_DRIVE_FOLDER_ID || "1I4QGeb65-IK8paMXEy35sdTcM2czO6kM";
const CREDENTIALS_PATH =
  process.env.GOOGLE_CREDENTIALS_PATH || "./google-credentials.json";
const OUTPUT_DIR = path.join(__dirname, "../public/images/gallery");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Authenticate with Google Drive API
 */
async function authenticate() {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    return auth.getClient();
  } catch (error) {
    console.error("❌ Authentication failed:", error.message);
    console.error("\nPlease ensure:");
    console.error("1. google-credentials.json exists in project root");
    console.error(
      "2. The service account has access to the Google Drive folder",
    );
    process.exit(1);
  }
}

/**
 * List all images in the Google Drive folder
 */
async function listImages(auth) {
  const drive = google.drive({ version: "v3", auth });

  try {
    console.log("📂 Fetching images from Google Drive...");

    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and (mimeType contains 'image/')`,
      fields: "files(id, name, mimeType, createdTime, modifiedTime)",
      orderBy: "createdTime desc",
    });

    const files = response.data.files;
    console.log(`✅ Found ${files.length} images`);

    return files;
  } catch (error) {
    console.error("❌ Failed to list files:", error.message);
    console.error(
      "\nPlease ensure the folder ID is correct and the service account has access.",
    );
    process.exit(1);
  }
}

/**
 * Download a single image from Google Drive
 */
async function downloadImage(auth, fileId, fileName) {
  const drive = google.drive({ version: "v3", auth });
  const destPath = path.join(OUTPUT_DIR, fileName);

  return new Promise((resolve, reject) => {
    drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" },
      (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        const dest = fs.createWriteStream(destPath);
        response.data
          .on("end", () => {
            console.log(`  ✓ ${fileName}`);
            resolve(destPath);
          })
          .on("error", reject)
          .pipe(dest);
      },
    );
  });
}

/**
 * Sanitize filename for filesystem
 */
function sanitizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_.]/g, "");
}

/**
 * Main sync function
 */
async function syncGalleryImages() {
  console.log("🚀 Starting gallery image sync...\n");

  // Authenticate
  const auth = await authenticate();
  console.log("✅ Authenticated with Google Drive\n");

  // List images
  const images = await listImages(auth);

  if (images.length === 0) {
    console.log("⚠️  No images found in the folder");
    return;
  }

  // Download images
  console.log("\n📥 Downloading images...");
  const downloadedImages = [];

  for (const image of images) {
    try {
      const sanitizedName = sanitizeFilename(image.name);
      await downloadImage(auth, image.id, sanitizedName);

      downloadedImages.push({
        id: image.id,
        originalName: image.name,
        fileName: sanitizedName,
        createdTime: image.createdTime,
        modifiedTime: image.modifiedTime,
      });
    } catch (error) {
      console.error(`  ✗ Failed to download ${image.name}:`, error.message);
    }
  }

  // Save metadata
  const metadataPath = path.join(OUTPUT_DIR, "metadata.json");
  fs.writeFileSync(metadataPath, JSON.stringify(downloadedImages, null, 2));

  console.log(`\n✅ Successfully downloaded ${downloadedImages.length} images`);
  console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
  console.log(`📄 Metadata saved to: ${metadataPath}`);
  console.log(
    "\n🎉 Sync complete! Run 'npm run update:gallery-data' to update gallery data.",
  );
}

// Run the sync
syncGalleryImages().catch((error) => {
  console.error("❌ Sync failed:", error);
  process.exit(1);
});
