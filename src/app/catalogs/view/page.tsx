"use client";
import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import { Catalog, Product } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FilePenLineIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { CldUploadButton } from 'next-cloudinary';
import CsImage from '@/components/CsImage';
const Page = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [newCatalogName, setNewCatalogName] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchcatalogs = async () => {
      try {
        const res = await fetch('/api/catalogs');
        const data = await res.json();
        setCatalogs(data.catalogs);

        const productRes = await fetch('/api/products');
        const productData = await productRes.json();
        setAllProducts(productData.products);
      } catch (error) {
        console.error("Error fetching catalogs or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchcatalogs();
  }, []);

  const handleDelete = async ({ id }: { id: string }) => {
    const confirmed = window.confirm("Are you sure you want to delete this catalog?");
    if (confirmed) {
      const res = await fetch(`/api/catalogs/catalog/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log('catalog deleted successfully');
        setCatalogs((prevCatalogs) => prevCatalogs.filter((catalog) => catalog.id !== id));
      } else {
        console.error('Failed to delete catalog');
      }
    }
  };

  const handleCreatecatalog = async () => {
    if (!newCatalogName.trim()) {
      alert("Please enter a catalog name.");
      return;
    }

    const newCatalog = {
      name: newCatalogName,
      imageUri: imageUri,
      productIds: selectedProducts,
    };

    try {
      const res = await fetch('/api/catalogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCatalog),
      });

      if (res.ok) {
        const createdCatalog = await res.json();
        setCatalogs((prevcatalogs) => [...prevcatalogs, createdCatalog.catalog]);
        setNewCatalogName("");
        setSelectedProducts([]);
        setImageUri("");
        console.log("Catalog created successfully");
      } else {
        console.error("Failed to create catalog");
      }
    } catch (error) {
      console.error("Error creating catalog:", error);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId) // Remove if already selected
        : [...prevSelected, productId] // Add if not selected
    );
  };

  return (
    <div className="relative w-screen min-h-screen bg-gray-100">
      {/* Header */}
      <div className="w-screen gap-2 p-4 mb-8 flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black opacity-90">
        <span className="hover:cursor-pointer">
          <BackButton />
        </span>
        <h1 className="font-semibold">Viewing catalogs</h1>
      </div>

      {/* Content */}
      <div className="px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center text-xl text-gray-500">
            Loading catalogs...
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {catalogs.map((catalog) =>
              catalog.name === "Shop by Brand" ? null : (
                <Card key={catalog.id} className="bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                  <CardHeader>
                    <div className="text-sm text-gray-500 flex justify-between gap-2">
                      <p>{catalog.id}</p>
                      <Link href={`/catalogs/edit/${catalog.id}`} className="text-emerald-600">
                        <FilePenLineIcon />
                      </Link>
                      <span className="text-red-600" onClick={() => { handleDelete({ id: catalog.id }) }}>
                        <Trash2Icon />
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold">{catalog.name.toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex justify-between'>
                    <div className="text-sm text-gray-700">
                      {catalog.catalogProducts && catalog.catalogProducts.length > 0 ? (
                        catalog.catalogProducts.map((product) => (
                          <div key={product.id} className="mb-1 text-md">
                            - {product.product.name}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500">No products available</div>
                      )}
                    </div>
                    <div className="rounded-full overflow-hidden bg-white p-1">
                      <CsImage
                      src={catalog.image_uri}
                      alt={catalog.name}
                      width={100}
                      height={100}
                      className="rounded-full w-[150px] h-[150px] lg:w-[150px] lg:h-[150px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}
      </div>

      {/* Add New catalog Form */}
      <div className="px-4 py-6 bg-white shadow-lg rounded-lg mt-8 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New catalog</h2>
        <input
          type="text"
          value={newCatalogName}
          onChange={(e) => setNewCatalogName(e.target.value)}
          placeholder="catalog Name"
          className="w-full mb-4 p-2 border rounded"
        />
        
        <div className="mb-4">
          <h3 className="text-lg font-medium">Select Products</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {allProducts.map((product) => (
              <label key={product.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                />
                <span>{product.name}</span>
              </label>
            ))}
          </div>
        </div>

         {/* Image Upload */}
         <CldUploadButton
          onSuccess={(result: any) => setImageUri(result.info.secure_url)}
          uploadPreset="bulk-stationary-catalog-preset"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 mb-4"
        >
          Upload Image (1)
        </CldUploadButton>
        
        { /* Image Preview */}
        <div className="w-full mb-4 flex justify-center">
          {imageUri && (
            <img src={imageUri} alt="" className="object-cover rounded-full h-36 w-36"/>
          )}
        </div>
        {
          imageUri &&
          <button
          onClick={handleCreatecatalog}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
          Create catalog
          </button>
        }
      </div>

      {/* Footer */}
      <div className="w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black text-xs h-8 p-2 opacity-90">
        © 2024 Bulk Stationery, All Rights Reserved.
      </div>
    </div>
  );
};

export default Page;
