"use client"
import { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function AddProduct() {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [descriptions, setDescriptions] = useState<string[]>(['']); // Separate descriptions array
  const [quantities, setQuantities] = useState<number[]>([0]);
  const [prices, setPrices] = useState<number[]>([0]);
  const [exTag, setExTag] = useState('');
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleUpload = (result: any) => {
    setImageUris((prevUris) => [...prevUris, result.info.secure_url]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(prices.length !== quantities.length || descriptions.length == 0 || imageUris.length == 0 || name == '' || unit == '' || exTag == '') {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    const productData = {
      name,
      unit,
      descriptions, // Use descriptions array
      quantities,
      prices,
      exTag,
      uri: imageUris,
    };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if(res.status === 200) {
      alert("Product added successfully");
      router.push('/');
    } else {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  // Function to add new quantity and price fields
  const addQuantityAndPrice = () => {
    setQuantities([...quantities, 0]); // Add default quantity
    setPrices([...prices, 0]); // Add default price
  };

  // Function to remove quantity and price field at a given index
  const removeQuantityAndPrice = (index: number) => {
    const updatedQuantities = quantities.filter((_, i) => i !== index);
    const updatedPrices = prices.filter((_, i) => i !== index);
    setQuantities(updatedQuantities);
    setPrices(updatedPrices);
  };

  // Function to add a new description
  const addDescription = () => {
    setDescriptions([...descriptions, '']); // Add a new empty description
  };

  // Function to remove a description
  const removeDescription = (index: number) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(updatedDescriptions);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white">
      <div className='flex justify-around items-center gap-4 m-2 p-2 w-full'>
        <BackButton />
        <Button className='flex flex-row gap-2 w-4/6'>
          <span>New Product Page</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M896 1537V936L256 616v880l544 273l-31 127l-641-320V472L960 57l832 415v270q-70 11-128 45V616l-640 320v473zM754 302l584 334l247-124l-625-313zm206 523l240-120l-584-334l-281 141zm888 71q42 0 78 15t64 41t42 63t16 79q0 39-15 76t-43 65l-717 717l-377 94l94-377l717-716q29-29 65-43t76-14m51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692l-34 135l135-34z"/></svg>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-2 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500">
        
        {/* Product Name */}
        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
        </div>

        {/* Unit */}
        <div>
          <input
            type="text"
            placeholder="Unit: Kg, Bundle, Piece, etc."
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
        </div>

        {/* ExTag */}
        <div>
          <input
            type="text"
            placeholder="ExTag: Most sold, Best seller, etc."
            value={exTag}
            onChange={(e) => setExTag(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
        </div>

        {/* Description Section */}
        <div className='grid grid-cols-3 space-y-4'>
          <Button className="text-md h-10 col-span-3 shadow-md">Descriptions</Button>
          {descriptions.map((description, index) => (
            <div key={index} className="flex space-x-4 col-span-3">
              <input
                type="text"
                placeholder={`Description ${index + 1}`}
                value={description}
                onChange={(e) => {
                  const updatedDescriptions = [...descriptions];
                  updatedDescriptions[index] = e.target.value;
                  setDescriptions(updatedDescriptions);
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
              <button type="button" onClick={() => removeDescription(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDescription}
            className="w-full bg-purple-500 text-white py-2 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 col-span-3"
          >
            Add Description
          </button>
        </div>

        <div className='grid grid-cols-3 gap-2'>
          <Button className='h-10 w-full shadow-md'>Quantity</Button>
          <Button className='h-10 w-full shadow-md'>Price</Button>
          <Button className='h-10 w-full shadow-md'>Close</Button>
        </div>

        {/* Dynamic Quantity and Price Inputs */}
        {quantities.map((quantity, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <input
              type="text" // Change type to text to prevent clearing
              placeholder="Quantity"
              value={quantity}
              onInput={(e) => {
                const value = e.currentTarget.value;
                // Allow only numbers and one period
                if (/^\d*\.?\d*$/.test(value)) {
                  const updatedQuantities = [...quantities];
                  updatedQuantities[index] = value ? Number(value) : 0; // Default to 0 if empty
                  setQuantities(updatedQuantities);
                }
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              min="0" // Prevent negative input
            />
            <input
              type="text" // Change type to text to prevent clearing
              placeholder="Price"
              value={prices[index]}
              onInput={(e) => {
                const value = e.currentTarget.value;
                // Allow only numbers and one period
                if (/^\d*\.?\d*$/.test(value)) {
                  const updatedPrices = [...prices];
                  updatedPrices[index] = value ? Number(value) : 0; // Default to 0 if empty
                  setPrices(updatedPrices);
                }
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              min="0" // Prevent negative input
            />
            <button type="button" onClick={() => removeQuantityAndPrice(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuantityAndPrice}
          className="w-full bg-purple-500 text-white py-2 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
        >
          Add Quantity and Price
        </button>

        {/* Upload Image */}
        <CldUploadButton
          uploadPreset="bulk-stationary-preset"
          onSuccess={handleUpload}
        >
          <div className="w-full px-4 py-2 rounded-lg bg-purple-500 text-white text-center cursor-pointer hover:bg-purple-600 transition duration-300">
            Upload Image
          </div>
        </CldUploadButton>

        {/* Display Uploaded Images */}
        <div className="flex space-x-4">
          {imageUris.map((uri, index) => (
            <img key={index} src={uri} alt={`Uploaded Image ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
          ))}
        </div>

        {
          !loading ? (
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Add Product
          </button>
          ) : (
            <button className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
              <span className='inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin'></span>
            </button>
          )
        }  
      </form>
    </div>
  );
}
