"use client";
import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import { Catalog, Product } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OctagonX, CheckCircle2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';
import CsImage from '@/components/CsImage';
import { CldUploadButton } from 'next-cloudinary';

const Page = () => {
  const [catalog, setCatalog] = useState<Catalog>();
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState<string>("");

  useEffect(() => {
    const fetchCatalogAndProducts = async () => {
      try {
        const catalogRes = await fetch(`/api/catalogs/catalog/${id}`);
        const catalogData = await catalogRes.json();
        setCatalog(catalogData.catalog);
        setName(catalogData.catalog.name);
        setImageUri(catalogData.catalog.image_uri);

        const productRes = await fetch('/api/products');
        const productData = await productRes.json();
        const availableProducts = productData.products.filter(
          (product: Product) => !catalogData.catalog.catalogProducts.some((cp: any) => cp.productId === product.id)
        );
        setAllProducts(availableProducts);
      } catch (error) {
        console.error("Error fetching catalog or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogAndProducts();
  }, [id]);

  const handleToggleProduct = (productId: string) => {
    setCatalog((prevCatalog: any) => {
      if (!prevCatalog) return prevCatalog;

      const existingProduct = prevCatalog.catalogProducts.find((cp: any) => cp.product.id === productId);
      let updatedCatalogProducts;

      if (existingProduct) {
        // Remove product if it exists
        updatedCatalogProducts = prevCatalog.catalogProducts.filter((cp: any) => cp.product.id !== productId);
      } else {
        // Add product if it doesn't exist
        const productToAdd = allProducts.find(product => product.id === productId);
        if (productToAdd) {
          const newCatalogProduct = {
            product: productToAdd,
          };
          updatedCatalogProducts = [...prevCatalog.catalogProducts, newCatalogProduct];
        } else {
          updatedCatalogProducts = prevCatalog.catalogProducts; // Fallback
        }
      }

      return { ...prevCatalog, catalogProducts: updatedCatalogProducts };
    });
  };

  const handleUpdateCatalog = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/catalogs/catalog/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          imageUri: imageUri,
          productIds: catalog?.catalogProducts.map((cp: any) => cp.product.id)
        }), 
      });
      if (response.ok) {
        const resParsed = await response.json();
        alert("Catalog updated successfully");
        setCatalog(resParsed.catalog);
      } 
    } catch (error) {
      alert("Something went wrong");
      console.error("Error updating catalog:", error);
    }
    setIsUpdating(false);
  };

  const handleImageUpload = (result: any) => {
    if (result?.info?.secure_url) {
      setImageUri(result.info.secure_url);
    }
  };

  return (
    <div className="relative w-screen min-h-screen bg-gray-100">
      {/* Header */}
      <div className='w-screen gap-2 p-4 mb-8 flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black opacity-90'>
        <span className='hover:cursor-pointer'>
          <BackButton />
        </span>
        <h1 className="font-semibold text-sm">Editing catalog: {catalog?.name}</h1>
      </div>

      {/* Content */}
      <div className="px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center text-xl text-gray-500">
            Loading Products...
          </div>
        ) : (
          <div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className='mx-2 font-semibold'>
                <p>{catalog?.id}</p>
                <div className="mt-4">
                  <label htmlFor="name" className="block font-semibold text-sm mb-1">Catalog Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className='flex justify-between items-center '>
                <div className="rounded-full overflow-hidden bg-white w-fit p-1 mt-4">
                  <CsImage
                    src={imageUri || ""}
                    alt={catalog?.name || ""}
                    width={100}
                    height={100}
                    className="rounded-full w-[150px] h-[150px] lg:w-[150px] lg:h-[150px]"
                  />
                </div>
                <CldUploadButton
                  uploadPreset="bulk-stationary-catalog-preset"
                  onSuccess={handleImageUpload}
                >
                  <button className="mt-4 p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
                    Upload Image
                  </button>
                </CldUploadButton>
              </div>
              </div>
              {/* Catalog Products */}
              <div className='text-xl text-emerald-600 mx-2 mt-2 mb-1'>
                Catalog Products
              </div>
              {catalog?.catalogProducts.map((catalogProduct) => (
                <Card key={catalogProduct.product.id} className="bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                  <CardHeader>
                    <div className="text-sm text-gray-500 flex justify-between gap-2">
                      <p>{catalogProduct.product.id}</p>
                      <span className='text-red-600' onClick={() => handleToggleProduct(catalogProduct.product.id)}>
                        <OctagonX />
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold">{catalogProduct.product.name.toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-700">
                      <span className="mb-1 text-md mr-2">Brand: {catalogProduct.product.brand}</span>
                      <span>Price: {catalogProduct.product.pricing[0]?.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Update Button */}
            <div className='flex justify-center items-center'>
              {isUpdating ? (
                <div className="flex justify-center items-center text-xl text-gray-500 mt-4 p-2">
                  Updating...
                </div>
              ) : (
                <button
                  onClick={handleUpdateCatalog}
                  className="mt-4 p-2 bg-emerald-600 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Update Catalog
                </button>
              )}
            </div>

            {/* Add New Products Section */}
            <h2 className="mt-8 mb-4 font-semibold">Add New Products</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allProducts.map((product) => (
                <Card key={product.id} className="bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                  <CardHeader>
                    <div className="text-sm text-gray-500 flex justify-between gap-2">
                      <p>{product.id}</p>
                      <span className='text-emerald-600' onClick={() => handleToggleProduct(product.id)}>
                        <CheckCircle2Icon />
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold">{product.name.toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-700">
                      <span className="mb-1 text-md mr-2">Brand: {product.brand}</span>
                      <span>Price: {product.pricing[0]?.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black text-xs h-8 p-2 opacity-90">
        © 2024 Bulk Stationery, All Rights Reserved.
      </div>
    </div>
  );
};

export default Page;
