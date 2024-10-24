"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
export const LoginButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);

    return (
        <>
            {!isLoggedIn ? (
                <Link href={'/login'} className="">
                    <Button className="bg-black hover:bg-black">
                        <span>Login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M42.22 17.31v-3.85A7.48 7.48 0 0 0 34.74 6h0a7.48 7.48 0 0 0-7.49 7.48v6a3.13 3.13 0 0 0 3.13 3.13h9a2.26 2.26 0 0 1 2.26 2.26v11A6.62 6.62 0 0 1 35 42.5h-4.2a3.53 3.53 0 0 1-3.55-3.5v-6.8c0-4.75-6.18-5.7-6.18-11.88V9.3h-8.48a6.81 6.81 0 0 0-6.81 6.82h0a3.48 3.48 0 0 0 3.48 3.48H12v15.69a7.21 7.21 0 0 0 7.21 7.21h11.56M12.04 25.54H6.89M19.25 42.5H8.55M21.07 9.3V5.5m-6.26 3.8V5.5"/><circle cx="13.3" cy="13.82" r=".75" fill="currentColor"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m37.24 35.68l-1.78-3.88a2.07 2.07 0 1 0-1.65 0l-1.58 3.84Z"/></svg>
                    </Button>
                </Link>
            ) : (
                null
            )}
        </>
    );
}

export const AddProductButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);

    return (
        <>
            {isLoggedIn ? (
               <Link href="/add-product">
                    <Button className="bg-green-500 hover:bg-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M896 1537V936L256 616v880l544 273l-31 127l-641-320V472L960 57l832 415v270q-70 11-128 45V616l-640 320v473zM754 302l584 334l247-124l-625-313zm206 523l240-120l-584-334l-281 141zm888 71q42 0 78 15t64 41t42 63t16 79q0 39-15 76t-43 65l-717 717l-377 94l94-377l717-716q29-29 65-43t76-14m51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692l-34 135l135-34z"/></svg>
                        <span>Add Product</span>
                    </Button>
                </Link>
            ) : (
                null
            )}
        </>
    );
}
export const EditDeleteButton = ({ id }: {id: string}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);

    const handleDelete = async (id: string) => {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
        });
        if (res.status === 200) {
            alert('Product deleted successfully');
            window.location.reload();
        }
        else
        {
            alert('Failed to delete product');
        }
        setLoading(false);
    }
    return (
        <>
            {isLoggedIn ? (
               <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                <Button className="bg-red-500 hover:bg-red-500 text-white" onClick={() => handleDelete(id)}>
                    {
                        !loading ? (
                        <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"/>
                        </svg>
                        <span>Delete</span>
                        </>
                        ):(
                            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                        )
                    }
                </Button>
                <Link href={`/edit-product/${id}`}>
                <Button className="bg-green-500 hover:bg-green-500 text-white">
                    <span>Edit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"/>
                        <path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"/>
                    </svg>
                </Button>        
                </Link>
             </div>
            ) : (
                null
            )}
        </>
    );
}