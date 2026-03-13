import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import type { GalleryImage } from "@christlife/lib/gallery-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return new NextResponse("Missing BLOB_READ_WRITE_TOKEN", { status: 500 });
    
    // We fetch all to construct the total length, since list() doesn't give a total count natively over 1000
    const [emergeResponse, galleryResponse] = await Promise.all([
      list({ token, prefix: "emerge/" }).catch(() => ({ blobs: [] })),
      list({ token, prefix: "gallery/" }).catch(() => ({ blobs: [] })),
    ]);

    const allBlobs = [...galleryResponse.blobs, ...emergeResponse.blobs];
    
    // Process only image files
    const imageBlobs = allBlobs.filter((blob) => {
      const ext = blob.pathname.split(".").pop()?.toLowerCase();
      return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext || "");
    });

    imageBlobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

    const totalItems = imageBlobs.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedBlobs = imageBlobs.slice(startIndex, startIndex + limit);

    const images: GalleryImage[] = paginatedBlobs.map((blob, index) => {
      const fileName = blob.pathname.split("/").pop() || "";
      const folderName = blob.pathname.split("/")[0] || "gallery";
      const baseName = fileName.split(".")[0] || "";
      const displayName = baseName
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        id: `${folderName}-${startIndex + index}`,
        src: `/api/gallery/${blob.pathname}`,
        alt: displayName,
        title: displayName,
        description: `Church photo - ${displayName}`,
        category: folderName,
        uploadedAt: blob.uploadedAt.toISOString(),
      };
    });

    return NextResponse.json({ 
      images, 
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        limit
      } 
    });
  } catch (error) {
    console.error("Gallery API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
