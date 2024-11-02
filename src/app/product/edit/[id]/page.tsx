"use client";
import { useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Pricing } from '@/lib/types';
import { Catalog, Group } from '@prisma/client';
import { XIcon } from 'lucide-react';
import { CatalogProduct, GroupProduct } from '@/lib/types';
export default function EditProduct() {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [descriptions, setDescriptions] = useState<string[]>(['']);
  const [pricing, setPricing] = useState<Pricing[]>([{ quantity: 0, price: 0 }]);
  const [brand, setBrand] = useState('');
  const [image_uris, setImage_uris] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedCatalogs, setSelectedCatalogs] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const getProductDetails = async ()=> {
      const res = await fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const parsedRes = await res.json();
        const { name, unit, descriptions, pricing, brand, image_uris, catalogProducts, groupProducts } = parsedRes.product;
        setName(name);
        setUnit(unit);
        setDescriptions(descriptions);
        setPricing(pricing);
        setBrand(brand);
        setImage_uris(image_uris);
        setSelectedCatalogs(catalogProducts.map((cp: CatalogProduct) => cp.catalogId.toString()));
        setSelectedGroups(groupProducts.map((gp: GroupProduct) => gp.groupId.toString()));
      } else {
        console.error("Failed to fetch product details");
      }
    }
    const fetchCatalogsAndGroups = async () => {
      const catalogRes = await fetch('/api/catalogs');
      const groupRes = await fetch('/api/groups');
      const catalogsParsed = await catalogRes.json();
      const groupsParsed = await groupRes.json();
      setCatalogs(catalogsParsed.catalogs);
      setGroups(groupsParsed.groups);
    };

    getProductDetails();
    fetchCatalogsAndGroups();
  }, []);

  const handleUpload = (result: any) => {
    setImage_uris((prevUris) => [...prevUris, result.info.secure_url]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check for empty fields
    if (
      pricing.length === 0 ||
      descriptions.length === 0 ||
      image_uris.length === 0 ||
      name === '' ||
      unit === '' ||
      brand === '' ||
      selectedCatalogs.length === 0 ||
      selectedGroups.length === 0
    ) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    // Validate pricing entries
    for (let i = 0; i < pricing.length; i++) {
      if (pricing[i].price <= 0 || pricing[i].quantity <= 0) {
        alert("Quantity and price cannot be empty or zero");
        setLoading(false);
        return;
      }
    }

    const productData = {
      name,
      unit,
      descriptions,
      brand,
      pricing,
      image_uris,
      catalogIds: selectedCatalogs,
      groupIds: selectedGroups,
    };

    console.log(productData);
    const res = await fetch(`/api/products/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    console.log(res);
    if (res.ok) {
      const parsedRes = await res.json();
      alert("Product updated successfully");
      router.push(`/product/view/${parsedRes.product.id}`);
    } else {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  // Add new pricing entry
  const addQuantityAndPrice = () => {
    setPricing([...pricing, { quantity: 0, price: 0 }]);
  };

  // Remove pricing entry
  const removeQuantityAndPrice = (index: number) => {
    setPricing(pricing.filter((_, i) => i !== index));
  };

  // Add new description
  const addDescription = () => {
    setDescriptions([...descriptions, '']);
  };

  // Remove description
  const removeDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-50 p-2 w-screen">
      <div className='w-screen gap-2 p-4 mb-2 flex justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black opacity-90'>
        <span className='hover:cursor-pointer'>
          <BackButton />
        </span>
        <h1 className="font-semibold">Update Product</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 bg-white bg-opacity-30 backdrop-blur-lg border border-gray-200 rounded-lg p-6 shadow-lg">

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        {/* Unit */}
        <input
          type="text"
          placeholder="Unit: Kg, Bundle, Piece, etc."
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        {/* Brand */}
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        {/* Descriptions Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Descriptions</h2>
          {descriptions.map((description, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                placeholder={`Description ${index + 1}`}
                value={description}
                onChange={(e) => {
                  const updatedDescriptions = [...descriptions];
                  updatedDescriptions[index] = e.target.value;
                  setDescriptions(updatedDescriptions);
                }}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button
                type="button"
                onClick={() => removeDescription(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDescription}
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Description
          </button>
        </div>

        {/* Pricing Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Pricing</h2>
          {pricing.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 items-center">
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={String(item.quantity)}
                  onChange={(e) => {
                    const updatedPricing = [...pricing];
                    updatedPricing[index].quantity = Math.max(0, parseInt(e.target.value));
                    setPricing(updatedPricing);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price === 0 ? "" : String(item.price)}
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    const priceRegex = /^\d*\.?\d*$/;
                    if (priceRegex.test(value)) {
                      const updatedPrices = [...pricing];
                      updatedPrices[index].price = value === "" ? 0 : Math.max(0, parseFloat(value));
                      setPricing(updatedPrices);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  min="0"
                />
              </div>
              <button
                type="button"
                onClick={() => removeQuantityAndPrice(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuantityAndPrice}
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Pricing
          </button>
        </div>

        {/* Image Upload */}
        <CldUploadButton
          onSuccess={handleUpload}
          uploadPreset="bulk-stationary-preset"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Upload Images
        </CldUploadButton>
        
        { /* Image Preview */}
        <div className="flex space-x-4">
        {image_uris.map((uri, index) => (
          <div key={index} className="relative w-20 h-20">
          <img
            src={uri}
            alt={`Uploaded Image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => {
              const updatedUris = image_uris.filter((_, i) => i !== index);
              setImage_uris(updatedUris);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            <XIcon />
          </button>
          </div>
      ))}
      </div>

        {/* Catalogs and Groups Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select Catalogs and Groups</h2>
          <select
            multiple
            value={selectedCatalogs}
            onChange={(e) => setSelectedCatalogs(Array.from(e.target.selectedOptions, option => option.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            {catalogs.map((catalog) => (
              <option key={catalog.id} value={catalog.id}>{catalog.name}</option>
            ))}
          </select>
          <select
            multiple
            value={selectedGroups}
            onChange={(e) => setSelectedGroups(Array.from(e.target.selectedOptions, option => option.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className={`w-full ${loading ? 'bg-gray-300' : 'bg-blue-500'} text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300`} disabled={loading}>
          {loading ? 'Updating...' : 'Update Product'}
        </Button>
      </form>
      <div className="w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black mt-2 text-xs h-8 p-2 opacity-90">
        © 2024 Bulk Stationery, All Rights Reserved.
      </div>
    </div>
  );
}
