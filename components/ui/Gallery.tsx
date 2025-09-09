"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Gallery() {
  // Images list
  let images = [
    "Horse.jpg",
    "sardar.jpg",
     "Ram1.jpg", 
    
   // <- featured
   
    
    "ladypot.jpg",
     "gardentable.jpeg",
    
     "buddha1.jpg",
    "swamiviveka.jpg",
   
    "ganeshtemp.jpeg",
    "buddha.png",
  ];

  // Force Ram1.jpg to middle
  // const middleIndex = Math.floor(images.length / 2);
  // images = images.filter((img) => img !== "Ram1.jpg");
  // images.splice(middleIndex, 0, "Ram1.jpg");

  // Heights (masonry style)
  const heights = ["h-96", "h-96", "h-60", "h-65", "h-86", "h-125" ,"h-96","h-109"];

  // Lightbox state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };
  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <section
      id="gallery"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
             Art Gallery
          </h3>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            A vibrant collection of creativity and inspiration from our studio.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((img, i) => {
            const isRam = img === "Ram1.jpg";
            return (
              <div
                key={i}
                className={`relative break-inside-avoid group cursor-pointer ${
                  isRam ? "h-120" : heights[i % heights.length]
                }`}
                onClick={() => openLightbox(i)}
              >
                {/* Image Wrapper */}
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition-all duration-500 ${
                    isRam ? "ring-4 ring-yellow-500 scale-105" : ""
                  }`}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                  {/* Image */}
                  <Image
                    src={`/beyongproject/${img}`}
                    alt={`Artwork ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <p className="text-base font-semibold drop-shadow-md">
                      {isRam ? "🌟 Featured Artwork" : `Artwork ${i + 1}`}
                    </p>
                    <p className="text-sm opacity-80">Student Creation</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
          >
            ✕
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-6 text-white text-4xl font-bold hover:text-gray-300"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 text-white text-4xl font-bold hover:text-gray-300"
          >
            ›
          </button>

          {/* Large Image */}
          <div className="relative w-[90%] max-w-5xl h-[80vh]">
            <Image
              src={`/beyongproject/${images[selectedIndex]}`}
              alt="Lightbox Artwork"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
    