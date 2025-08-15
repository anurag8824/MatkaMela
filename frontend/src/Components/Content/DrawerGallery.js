import React from "react";
import "./DrawerGallery.css"; // We'll use a separate file for wood texture styles

const images = [
    { name: "Jaggery", url: "/images/p3.jpg" },
    { name: "Pulses", url: "/images/p5.jpg" },
    { name: "Sugar", url: "/images/p7.jpg" },
    { name: "Salt", url: "/images/p9.jpg" },
    { name: "Atta", url: "/images/p11.jpg" },
    { name: "Basmati Rice", url: "/images/p12.jpg" },
    { name: "Tea", url: "/images/p13.jpg" },
    { name: "Dry Fruits", url: "/images/p14.jpg" },
  ];

export default function DrawerGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {images.map((img, index) => (
        <div key={index}  className="relative brd w-full group perspective h-72">
  <div className="flip-container">
    {/* Front - Wooden Door */}
    <div className="flip-face bg-wood flex items-center justify-center text-white text-xl font-bold shadow-md">
      {img.name}
    </div>
    {/* Back - Image */}
    <div className="flip-face flip-back">
      <img
        src={img.url}
        alt={img.name}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

      ))}
    </div>
  );
}
