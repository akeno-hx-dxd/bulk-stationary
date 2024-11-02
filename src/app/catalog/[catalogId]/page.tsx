"use client";
import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import { Catalog, Product } from '@/lib/types';
import  ProductCard  from '@/components/product/ProductCard';
import { useParams } from 'next/navigation';

const Page = () => {
  const [catalog, setCatalog] = useState<Catalog>();
  const [loading, setLoading] = useState(true);
  const { catalogId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const catalogRes = await fetch(`/api/catalogs/catalog/${catalogId}`);
        const catalogData = await catalogRes.json();
        setCatalog(catalogData.catalog);
        setProducts(catalogData.catalog.catalogProducts); 
      } catch (error) {
        console.error("Error fetching catalog or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [catalogId]);

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-r from-slate-300 to-slate-500">
      {/* Header */}
      <div className='w-screen gap-2 p-4 mb-8 flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black opacity-90'>
        <span className='hover:cursor-pointer'>
          <BackButton />
        </span>
        <h1 className="font-semibold text-sm">Catalog: {catalog?.name}</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          Loading...
        </div>  
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {catalog?.catalogProducts.map((cp) => (
            <ProductCard product={cp.product} key={cp.product.id}/>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="w-screen flex bottom-0 justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black text-xs h-8 p-2 opacity-90">
        © 2024 Bulk Stationery, All Rights Reserved.
      </div>
    </div>
  );
};

export default Page;
