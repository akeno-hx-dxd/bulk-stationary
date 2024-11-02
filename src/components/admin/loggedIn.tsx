"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { DeleteIcon, EditIcon, PlusIcon} from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";
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

export const AddProductIcon = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);

    return (
        <>
            {isLoggedIn ? (
                <Link href={'/product/add'}>
                    <PlusIcon className="w-4 h-4"/>
                </Link>
            ) : (
                null
            )}
        </>
    );
}
export const EditButton = ({ id }: {id: string}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);
    return (
        <>
            {isLoggedIn ? (
               <div className="">
                <Link href={`/product/edit/${id}`}>
                    <EditIcon />     
                </Link>
             </div>
            ) : (
                null
            )}
        </>
    );
}

export const DeleteButton = ({ id }: { id: string }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);

    const handleDelete = async () => {
        setIsDeleting(true);
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Product deleted successfully');
                router.back();
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }

        setIsDeleting(false);
    };

    return (
        <>
            {isLoggedIn && (
                isDeleting ? (
                    <span>
                        Deleting
                    </span>
                        
                ) : (   
                    <DeleteIcon onClick={handleDelete} style={{ cursor: 'pointer' }} />
                )
            )}
        </>
    );
};

export const CatalogAndGroupEditButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn === 'true');
    }, []);
    return (
        <>
            {isLoggedIn ? (
                <>
                <DropdownMenuItem>
                <span>
                  <Link href={"/groups/view"}>
                    Edit Groups
                  </Link>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>
                  <Link href={"/catalogs/view"}>
                    Edit Catalogs
                  </Link>
                </span>
              </DropdownMenuItem>
              </>
            ) : (
                null
            )}
        </>
    )
}