"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight, EyeIcon } from "lucide-react";
import CsImage from "../CsImage";
import Link from "next/link";

const TrendingProducts = ({ product }: { product: Product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % product.image_uris.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + product.image_uris.length) % product.image_uris.length);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mb-4">
      {/* Mobile view: Carousel */}
      <div className="lg:hidden flex items-center relative overflow-hidden rounded-md shadow-lg w-full max-w-md">
        <button
          onClick={prevSlide}
          className="absolute left-2 z-10 text-white bg-black bg-opacity-50 p-1 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="w-full flex justify-center items-center">
          <div className="relative w-full m-2">
            {product.image_uris.length > 0 ? (
              <CsImage
                src={product.image_uris[currentIndex]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-80 object-cover rounded-md"
              />
            ) : (
              <p>Loading image...</p>
            )}
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded-md">
              <h2 className="text-sm font-semibold">{product.name}</h2>
              <p className="text-sm">
                ₹{product.pricing[0]?.price.toLocaleString("en-IN")}
              </p>
            </div>
            <span className="absolute top-4 right-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded-md">
              <Link href={`/product/view/${product.id}`}>
                <EyeIcon size={20} />
              </Link>
            </span>
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-2 z-10 text-white bg-black bg-opacity-50 p-1 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Laptop view: Grid display */}
      <div className="hidden lg:flex w-full gap-2 flex-wrap px-8">
        <div key={product.id} className="relative group shadow-lg rounded-lg overflow-hidden">
          <CsImage
            src={product.image_uris[0]}
            alt={product.name}
            width={200}
            height={300}
            className="w-full h-64 object-cover rounded-lg transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded-md">
            <h2 className="text-md font-semibold">{product.name}</h2>
            <p className="text-sm">
              ₹{product.pricing[0]?.price.toLocaleString("en-IN")}
            </p>
          </div>
          <span className="absolute top-4 right-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded-md">
            <Link href={`/product/view/${product.id}`}>
              <EyeIcon size={20} />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
