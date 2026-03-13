// scripts/sync-gallery-data.js
const { list } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

async function syncGalleryData() {
  console.log("Fetching Vercel Blob metadata...");
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  try {
    const [emergeResponse, galleryResponse] = await Promise.all([
      list({ token, prefix: "emerge/" }).catch(() => ({ blobs: [] })),
      list({ token, prefix: "gallery/" }).catch(() => ({ blobs: [] })),
    ]);

    const allBlobs = [...galleryResponse.blobs, ...emergeResponse.blobs];

    const imageBlobs = allBlobs.filter((blob) => {
      const ext = blob.pathname.split(".").pop()?.toLowerCase();
      return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "");
    });

    imageBlobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

    const images = imageBlobs.map((blob, index) => {
      const fileName = blob.pathname.split("/").pop() || "";
      const folderName = blob.pathname.split("/")[0] || "gallery";
      const baseName = fileName.split(".")[0] || "";
      const displayName = baseName
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        id: `${folderName}-${index}`, // Index will be recalculated dynamically by the API
        src: `/api/gallery/${blob.pathname}`,
        alt: displayName,
        title: displayName,
        description: `Church photo - ${displayName}`,
        category: folderName,
        uploadedAt: blob.uploadedAt.toISOString(),
      };
    });

    const outputPath = path.join(__dirname, "..", "lib", "vercel-gallery-data.json");
    fs.writeFileSync(outputPath, JSON.stringify(images, null, 2));
    
    console.log(`✅ Successfully synced ${images.length} images to lib/vercel-gallery-data.json`);
  } catch (error) {
    console.error("Failed to sync gallery data:", error);
    process.exit(1);
  }
}

syncGalleryData();
