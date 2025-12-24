'use client'; 

import React, { useState, useEffect } from 'react';

const HeroSlideshow = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
      alt: "Fresh vegetables in a basket"
    },
    {
      url: "https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=2023&auto=format&fit=crop",
      alt: "Fresh groceries on a table"
    },
    {
      url: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1974&auto=format&fit=crop",
      alt: "Woman holding grocery bag"
    },
    {
      url: "https://images.unsplash.com/photo-1604719312566-b76d4947aa43?q=80&w=2074&auto=format&fit=crop",
      alt: "Fresh fruits"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); 

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full bg-green-100">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.url}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text contrast/style if needed */}
          <div className="absolute inset-0 bg-green-900 opacity-10"></div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;