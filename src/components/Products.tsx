"use client"
import { useState, useEffect } from "react";
import { ProductCard, Product} from "./ProductCard";
export default function Products () {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Fetch products from the API when the component mounts
      const fetchProducts = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
          console.log(res);
          
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await res.json();
          if(data.success === false){
              throw new Error(data.error);
          }
          else{
              setProducts(data.products);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchProducts();
    }, []); 
  
    return (
        <>
        {
            products.length === 0 && (
              <div className="w-full h-96 flex flex-col justify-center items-center">
                <p className="text-lg">No products found</p>
                <p className="text-lg">Please add products</p>
              </div>
            )
        }
        {
            products.map((product: Product, index) => (
                <ProductCard key={product.id} product={product} index={index+1}/>
            ))
        }
        </>
    )
}