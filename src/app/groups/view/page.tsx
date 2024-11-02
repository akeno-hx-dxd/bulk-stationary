"use client";
import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import { Group, Product } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FilePenLineIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('/api/groups');
        const data = await res.json();
        setGroups(data.groups);

        const productRes = await fetch('/api/products');
        const productData = await productRes.json();
        setAllProducts(productData.products);
      } catch (error) {
        console.error("Error fetching groups or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleDelete = async ({ id }: { id: string }) => {
    const confirmed = window.confirm("Are you sure you want to delete this group?");
    if (confirmed) {
      const res = await fetch(`/api/groups/group/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log('Group deleted successfully');
        setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
      } else {
        console.error('Failed to delete group');
      }
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    const newGroup = {
      name: newGroupName,
      productIds: selectedProducts,
    };

    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup),
      });

      if (res.ok) {
        const createdGroup = await res.json();
        setGroups((prevGroups) => [...prevGroups, createdGroup.group]);
        setNewGroupName("");
        setSelectedProducts([]);
        console.log("Group created successfully");
      } else {
        console.error("Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
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
        <h1 className="font-semibold">Viewing Groups</h1>
      </div>

      {/* Content */}
      <div className="px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center text-xl text-gray-500">
            Loading groups...
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) =>
              group.name === "Shop by Brand" ? null : (
                <Card key={group.id} className="bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                  <CardHeader>
                    <div className="text-sm text-gray-500 flex justify-between gap-2">
                      <p>{group.id}</p>
                      <Link href={`/groups/edit/${group.id}`} className="text-emerald-600">
                        <FilePenLineIcon />
                      </Link>
                      <span className="text-red-600" onClick={() => { handleDelete({ id: group.id }) }}>
                        <Trash2Icon />
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold">{group.name.toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-700">
                      {group.groupProducts && group.groupProducts.length > 0 ? (
                        group.groupProducts.map((product) => (
                          <div key={product.id} className="mb-1 text-md">
                            - {product.product.name}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500">No products available</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}
      </div>

      {/* Add New Group Form */}
      <div className="px-4 py-6 bg-white shadow-lg rounded-lg mt-8 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Group</h2>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Group Name"
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

        <button
          onClick={handleCreateGroup}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Group
        </button>
      </div>

      {/* Footer */}
      <div className="w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black text-xs h-8 p-2 opacity-90">
        © 2024 Bulk Stationery, All Rights Reserved.
      </div>
    </div>
  );
};

export default Page;
