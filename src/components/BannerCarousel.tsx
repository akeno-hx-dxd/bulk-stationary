"use client"
import React, { useState, useEffect } from 'react'
import CsImage from './CsImage'
const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  // Manually change image by clicking on a dot
  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-screen h-48 lg:h-96 overflow-hidden rounded-md">
      {/* Carousel images */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <CsImage
            key={index}
            src={image}
            alt={`Slide ${index}`}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition transform 
              ${index === currentIndex ? 'bg-blue-500 scale-125 animate-pulse' : 'bg-gray-400'}`
            }
            onClick={() => goToImage(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Carousel
