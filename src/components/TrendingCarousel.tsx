"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight, EyeIcon } from "lucide-react";
import CsImage from "./CsImage";
import Link from "next/link";
const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      const res = await fetch("/api/groups");
      if (res.ok) {
        const data = await res.json();
        const trendingGroup = data.groups.find(
          (group: { name: string }) => group.name === "Trending Products"
        );
        if (trendingGroup) {
          setTrendingProducts(
            trendingGroup.groupProducts.map(({ product }: { product: Product }) => product)
          );
        }
      }
    };
    fetchTrendingProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingProducts.length) % trendingProducts.length);
  };

  return (
    <div className="w-full">
      {/* Mobile view: Carousel */}
      <div className="lg:hidden flex items-center relative overflow-hidden">
        <button onClick={prevSlide} className="absolute left-4 z-10 text-white">
          <ChevronLeft size={30} />
        </button>
        {trendingProducts.length > 0 ? (
          <div className="w-full flex justify-center">
            <div className="relative w-full">
              <CsImage
                src={trendingProducts[currentIndex].image_uris[0]}
                alt={trendingProducts[currentIndex].name}
                width={500} // Full-width image for mobile
                height={500}
                className="w-80 h-96 object-cover rounded-md"
              />
              <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                <h2 className="text-sm font-semibold">{trendingProducts[currentIndex].name}</h2>
                <p className="text-sm">
                  ₹{trendingProducts[currentIndex].pricing[0]?.price.toLocaleString("en-IN")}
                </p>
              </div>
              <span className="absolute top-4 right-4 text-white broder bg-black bg-opacity-50 px-2 py-1 rounded">
              <Link href={`/product/view/${trendingProducts[currentIndex].id}`}>
                <EyeIcon/>
              </Link>              
              </span>
            </div>
          </div>
        ) : (
          <p>Loading products...</p>
        )}
        <button onClick={nextSlide} className="absolute right-4 z-10 text-white">
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Laptop view: Grid display */}
      <div className="hidden lg:grid grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
        {trendingProducts.map((product) => (
          <div key={product.id} className="relative group">
            <CsImage
              src={product.image_uris[0]}
              alt={product.name}
              width={200}
              height={300}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              <h2 className="text-md font-semibold">{product.name}</h2>
              <p className="text-sm">
                ₹{product.pricing[0]?.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
