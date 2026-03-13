import { NextResponse } from "next/server";
import data from "../../../lib/vercel-gallery-data.json";
import type { GalleryImage } from "@christlife/lib/gallery-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    
    // Fallback if script hasn't run
    const imageBlobs = data as GalleryImage[] || [];

    imageBlobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    const totalItems = imageBlobs.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedBlobs = imageBlobs.slice(startIndex, startIndex + limit);

    // Re-assign index-based IDs dynamically so pagination chunks don't restart at 0.
    const images: GalleryImage[] = paginatedBlobs.map((blob, index) => {
      return {
        ...blob,
        id: `${blob.category}-${startIndex + index}`,
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
