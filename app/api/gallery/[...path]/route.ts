import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const blobPath = path.join("/");
    
    // Safety check
    if (!blobPath.startsWith("emerge/") && !blobPath.startsWith("gallery/")) {
      return new NextResponse("Invalid image path", { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return new NextResponse("Missing Vercel Blob Token", { status: 500 });
    
    const storeId = token.split("_")[3].toLowerCase();
    const vercelUrl = `https://${storeId}.private.blob.vercel-storage.com/${blobPath}`;

    const response = await fetch(vercelUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new NextResponse(`Error fetching image: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const cacheControl =
      response.headers.get("cache-control") || "public, max-age=86400, stale-while-revalidate=43200";

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
