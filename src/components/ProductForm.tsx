// app/components/ProductForm.tsx
import React, { useState } from "react";
import { Product, Pricing } from "@/lib/types";
import FormInput from "./FormInput";
import PriceDisplay from "./PriceDisplay";

type ProductFormProps = {
  product?: Product;
  onSubmit: (product: Product) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: "",
      name: "",
      image_uris: [],
      unit: "",
      descriptions: [""],
      pricing: [{ quantity: 1, price: 0 }],
      brand: "",
      catalogProducts: [],
      groupProducts: [],
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} />
      <FormInput label="Unit" name="unit" value={formData.unit} onChange={handleChange} />
      <FormInput label="Brand" name="brand" value={formData.brand} onChange={handleChange} />

      <div className="space-y-2">
        <h3 className="font-semibold">Pricing</h3>
        {formData.pricing.map((price, index) => (
          <div key={index} className="flex space-x-2">
            <FormInput
              label="Quantity"
              name={`quantity-${index}`}
              type="number"
              value={price.quantity}
              onChange={(e) => {
                const quantity = parseInt(e.target.value);
                setFormData((prev) => {
                  const updatedPricing = [...prev.pricing];
                  updatedPricing[index] = { ...updatedPricing[index], quantity };
                  return { ...prev, pricing: updatedPricing };
                });
              }}
            />
            <FormInput
              label="Price"
              name={`price-${index}`}
              type="number"
              value={price.price}
              onChange={(e) => {
                const priceValue = parseFloat(e.target.value);
                setFormData((prev) => {
                  const updatedPricing = [...prev.pricing];
                  updatedPricing[index] = { ...updatedPricing[index], price: priceValue };
                  return { ...prev, pricing: updatedPricing };
                });
              }}
            />
          </div>
        ))}
      </div>

      <button type="submit" className="bg-emerald-500 text-white p-2 rounded">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
