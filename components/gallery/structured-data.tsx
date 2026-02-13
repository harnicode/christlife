// "use client";

// import { galleryImages } from "@christlife/lib/gallery-data";

// export function StructuredData() {
//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "ImageGallery",
//     name: "ChristLife City Cathedral Gallery",
//     description:
//       "Photo gallery showcasing worship services, community events, and church activities at ChristLife City Cathedral",
//     url: "https://christlifecitycathedral.org/gallery",
//     publisher: {
//       "@type": "Organization",
//       name: "ChristLife City Cathedral",
//       url: "https://christlifecitycathedral.org",
//     },
//     image: galleryImages.map((img) => ({
//       "@type": "ImageObject",
//       contentUrl: `https://christlifecitycathedral.org${img.src}`,
//       name: img.title,
//       description: img.alt,
//       width: img.width,
//       height: img.height,
//       datePublished: img.datePublished,
//       creator: {
//         "@type": "Organization",
//         name: "ChristLife City Cathedral",
//       },
//     })),
//     breadcrumb: {
//       "@type": "BreadcrumbList",
//       itemListElement: [
//         {
//           "@type": "ListItem",
//           position: 1,
//           name: "Home",
//           item: "https://christlifecitycathedral.org",
//         },
//         {
//           "@type": "ListItem",
//           position: 2,
//           name: "Gallery",
//           item: "https://christlifecitycathedral.org/gallery",
//         },
//       ],
//     },
//   };

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//     />
//   );
// }
