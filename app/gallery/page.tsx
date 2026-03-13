import type { Metadata } from "next";
import { GalleryGrid } from "@christlife/components/gallery/gallery-grid";
import { GalleryHeader } from "@christlife/components/gallery/gallery-header";
import type { GalleryImage } from "@christlife/lib/gallery-data";

export const metadata: Metadata = {
  title: "Gallery | ChristLife City Cathedral",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const dynamic = "force-dynamic";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  
  if (!token) {
    return (
      <main className="min-h-screen bg-black">
        <GalleryHeader />
        <div className="flex h-64 items-center justify-center text-white text-sm">Missing Blob Token</div>
      </main>
    );
  }

  const { page: pageParam = "1" } = await searchParams;
  const page = Array.isArray(pageParam) ? pageParam[0] : pageParam;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${apiUrl}/api/gallery?page=${page}&limit=12`, { cache: "no-store" });
  let images: GalleryImage[] = [];
  let pagination = null;
  
  if (response.ok) {
    const data = await response.json();
    images = data.images || [];
    pagination = data.pagination;
  } else {
    console.error("Failed to fetch gallery data:", await response.text());
  }

  return (
    <main className="min-h-screen bg-black">
      <GalleryHeader />
      <GalleryGrid images={images} pagination={pagination} />
    </main>
  );
}
