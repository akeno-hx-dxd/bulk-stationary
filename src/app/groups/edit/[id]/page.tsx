"use client";
import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import { Group, Product } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OctagonX, CheckCircle2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';

const Page = () => {
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchGroupAndProducts = async () => {
      try {
        const GroupRes = await fetch(`/api/groups/group/${id}`);
        const GroupData = await GroupRes.json();
        setGroup(GroupData.group);
        setName(GroupData.group.name);

        const productRes = await fetch('/api/products');
        const productData = await productRes.json();
        const availableProducts = productData.products.filter(
          (product: Product) => !GroupData.group.groupProducts.some((cp: any) => cp.productId === product.id)
        );
        setAllProducts(availableProducts);
      } catch (error) {
        console.error("Error fetching group or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupAndProducts();
  }, [id]);

  const handleToggleProduct = (productId: string) => {
    setGroup((prevGroup: any) => {
      if (!prevGroup) return prevGroup;

      const existingProduct = prevGroup.groupProducts.find((cp: any) => cp.product.id === productId);
      let updatedgroupProducts;

      if (existingProduct) {
        // Remove product if it exists
        updatedgroupProducts = prevGroup.groupProducts.filter((cp: any) => cp.product.id !== productId);
      } else {
        // Add product if it doesn't exist
        const productToAdd = allProducts.find(product => product.id === productId);
        if (productToAdd) {
          const newgroupProduct = {
            product: productToAdd,
          };
          updatedgroupProducts = [...prevGroup.groupProducts, newgroupProduct];
        } else {
          updatedgroupProducts = prevGroup.groupProducts; // Fallback
        }
      }

      return { ...prevGroup, groupProducts: updatedgroupProducts };
    });
  };

  const handleUpdateGroup = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/groups/group/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          productIds: group?.groupProducts.map((cp: any) => cp.product.id)
        }), 
      });
      if (response.ok) {
        const resParsed = await response.json();
        alert("Group updated successfully");
        setGroup(resParsed.Group);
      } 
    } catch (error) {
      alert("Something went wrong");
      console.error("Error updating Group:", error);
    }
    setIsUpdating(false);
  };

  return (
    <div className="relative w-screen min-h-screen bg-gray-100">
      {/* Header */}
      <div className='w-screen gap-2 p-4 mb-8 flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black opacity-90'>
        <span className='hover:cursor-pointer'>
          <BackButton />
        </span>
        <h1 className="font-semibold text-sm">Editing group: {group?.name}</h1>
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
                <p>{group?.id}</p>
                <div className="mt-4">
                  <label htmlFor="name" className="block font-semibold text-sm mb-1">group Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
              {/* Group Products */}
              <div className='text-xl text-emerald-600 mx-2 mt-2 mb-1'>
                Group Products
              </div>
              {group?.groupProducts.map((groupProduct) => (
                <Card key={groupProduct.product.id} className="bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                  <CardHeader>
                    <div className="text-sm text-gray-500 flex justify-between gap-2">
                      <p>{groupProduct.product.id}</p>
                      <span className='text-red-600' onClick={() => handleToggleProduct(groupProduct.product.id)}>
                        <OctagonX />
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold">{groupProduct.product.name.toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-700">
                      <span className="mb-1 text-md mr-2">Brand: {groupProduct.product.brand}</span>
                      <span>Price: {groupProduct.product.pricing[0]?.price}</span>
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
                  onClick={handleUpdateGroup}
                  className="mt-4 p-2 bg-emerald-600 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Update Group
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
