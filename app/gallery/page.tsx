import type { Metadata } from "next";
import { GalleryGrid } from "@christlife/components/gallery/gallery-grid";
import { GalleryHeader } from "@christlife/components/gallery/gallery-header";

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

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      <GalleryHeader />
      <GalleryGrid />
    </main>
  );
}
