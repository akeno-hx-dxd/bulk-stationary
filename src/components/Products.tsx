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
            products.map((product: Product, index) => (
                <ProductCard key={product.id} product={product} index={index+1}/>
            ))
         }
        </>
    )
}