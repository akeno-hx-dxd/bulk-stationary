"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import  CarouselCustom from '@/components/Carousel';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { Product } from '@/lib/types';
import { EditButton, DeleteButton } from '@/components/admin/loggedIn';
const ProductPage = () => {
  const [product, setProduct] = React.useState<Product | null>(null);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const parsedRes = await res.json();
        setProduct(parsedRes.product);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="w-screen min-h-screen">
      <div className='w-screen gap-2 p-4 mb-8 flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black opacity-90'>
        <span className='hover:cursor-pointer'>
          <BackButton />
        </span>
        <h1 className="font-semibold">Viewing Product</h1>
      </div>
      <div className='w-screen flex justify-center items-center'>
        <CarouselCustom uris={product.image_uris} />
      </div>
      <div className='flex justify-center items-center px-4 mb-4 mt-4 gap-2'>
        <h1 className="text-xl font-bold">{product.name}</h1>
        <EditButton id={product.id}/>
        <DeleteButton id={product.id}/>
      </div>
      <div className='w-screen flex justify-start items-center px-4'>
      <span className='mx-2 font-bold text-lg text-blue-800'>
        {
          new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(product.pricing[0]?.price)
        }/{product.unit} | brand: {product.brand}
      </span>
      </div>
      <div className='w-screen flex flex-col px-4'>
        <span className='mx-2 font-bold text- text-purple-800 mb-1'>
          [Price Based on Quantity]
        </span>
        <div className='mx-2 border-2 border-black grid grid-cols-2 mb-2'>
          <span className='font-bold text-sm border-b-2 border-black border-r-2 px-2'>
            Quantity ({product.unit.toUpperCase()})
          </span>
          <span className='font-bold text-sm border-b-2 border-black px-2'>
            Price (INR)
          </span>
          {
            product.pricing.map((price, index) => (
              <>
                <span className='text-center'>{price.quantity}{index === product.pricing.length - 1 ? <strong className='text-lg'> +</strong> : ''}</span>
                <span className='px-4'>{new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(price.price)}</span>
              </>  
            ))
          }
        </div>
        <span className='mx-2 font-bold text- text-purple-800 mb-1'>
          [Description]
        </span>
        <div className='mx-2 grid grid-cols-1 gap-2 list-decimal mb-2'>
          {product.descriptions.map((description, index) => (
            <li className='text-md'>
              {description}
            </li>
          ))}
        </div>
        <span className='ml-2 font-bold text- text-purple-800'>
          [Featured In]
        </span>
        <div className='mx-2 mt-2 grid grid-cols-2 gap-2'>
          {product.catalogProducts.map((catalogProduct : any) => (
            <Link href={`/catalog/view/${catalogProduct.catalog.id}`} className='text-xs border border-emerald-600 rounded-md px-2 py-2 bg-emerald-600 text-white font-semibold shadow-lg '>
              {catalogProduct.catalog.name}
            </Link>
          ))}
          {product.groupProducts.map((groupProduct: any) => (
            <Link href={`/group/view/${groupProduct.group.id}`} className='text-xs border border-emerald-600 rounded-md px-2 py-2 bg-emerald-600 text-white font-semibold shadow-lg '>
              {groupProduct.group.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black mt-2 text-xs h-8 p-2 opacity-90">
        © 2024 Bulk Stationery, All Rights Reserved.
      </div>
    </div>
  );
};

export default ProductPage;