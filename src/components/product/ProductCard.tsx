import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import CsImage from '../CsImage'; // Assuming CsImage is already defined

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Link href={`/product/${product.id}`}>
    <div className="p-4 border rounded-lg hover:shadow-lg transition">
      <CsImage src={product.image_uris[0]} alt={product.name} width={300} height={300} className="w-full rounded-lg" />
      <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-500 text-sm">
        ₹{product.pricing[0]?.price.toLocaleString('en-IN')}
      </p>
    </div>
  </Link>
);

export default ProductCard;
