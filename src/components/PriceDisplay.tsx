// app/components/PriceDisplay.tsx
import React from "react";
import { Pricing } from "@/lib/types";

type PriceDisplayProps = {
  pricing: Pricing[];
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

const PriceDisplay: React.FC<PriceDisplayProps> = ({ pricing }) => (
  <div>
    {pricing.map((price, index) => (
      <div key={index} className="flex justify-between">
        <span>Qty: {price.quantity}</span>
        <span>{formatCurrency(price.price)}</span>
      </div>
    ))}
  </div>
);

export default PriceDisplay;
