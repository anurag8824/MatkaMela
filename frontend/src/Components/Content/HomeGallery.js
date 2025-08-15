import React from "react";

const galleryImages = [
  {
    url: "https://janmitram.com/Assests/WebsiteGalleryImage/FINAL_JANMITRAM_ATTA_5KG.jpg",
    name: "Atta 5kg",
  },
  {
    url: "https://janmitram.com/Assests/WebsiteGalleryImage/FINAL_JANMITRAM_RICE_(1).jpg",
    name: "Rice",
  },
  {
    url: "https://janmitram.com/Assests/WebsiteGalleryImage/FINAL_JANMITRAM_DRY_FRUITS.jpg",
    name: "Dry Fruits",
  },
  {
    url: "https://janmitram.com/Assests/WebsiteGalleryImage/FINAL_JANMITRAM_COMMON_1KG.jpg",
    name: "Common 1kg",
  },
  {
    url: "https://janmitram.com/Assests/WebsiteGalleryImage/FINAL_JANMITRAM_JAGGERY_1kg.jpg",
    name: "Jaggery",
  },
  {
    url: "https://janmitram.com/Assests/WebsiteGalleryImage/FINAL_JANMITRAM_PULSES_1kg.jpg",
    name: "Pulses",
  },
];

export default function HomeGallery() {
  // Duplicate array for seamless loop
  const scrollingImages = [...galleryImages, ...galleryImages];

  return (
    <div className="bg-white py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          फोटो गैलरी
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-gallery gap-4 w-max">
            {scrollingImages.map((img, index) => (
              <figure
                key={index}
                className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] relative overflow-hidden rounded-xl shadow-md group"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <figcaption className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
