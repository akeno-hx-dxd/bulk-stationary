"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import  BackButton  from '@/components/BackButton';
import { useRouter } from 'next/navigation';
export default function Login() {
    const [key, setKey] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [sm, setSM] = useState<boolean>(false); 
    const handleKey = (e: any) => setKey(e.target.value);
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);
        const res = await fetch('/api/verifyKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key }),
        })

        const parsedRes = await res.json();
        if (res.status === 200) {
            localStorage.setItem('loggedIn',"true");
            alert('Login successful');
            router.push('/');
        }
        else
        {
            setSM(true);
        }
        setLoading(false);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setKey(text); 
        } catch (err) {
            alert('Failed to read clipboard.');
        }
    };

    return (
        <div className='w-full h-screen flex flex-col items-center bg-purple-100'>
            <div className='flex justify-around items-center gap-4 m-2 p-2 w-full'>
                <BackButton />
                <Button className='flex flex-row gap-2 w-4/6'>
                    <span>Admin Login Page</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeWidth="2" d="M8 11A5 5 0 1 0 8 1a5 5 0 0 0 0 10Zm5.023 2.023C11.772 11.76 10.013 11 8 11c-4 0-7 3-7 7v5h7m2-3.5a2.5 2.5 0 1 0 5.002-.002A2.5 2.5 0 0 0 10 19.5ZM23 15l-3-3l-6 6m3.5-3.5l3 3z" />
                    </svg>
                </Button>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center p-2 m-2'>
                    <h1 className='text-2xl font-bold m-4'>Paste the Secret Key.</h1>
                    <textarea 
                        value={key} 
                        onChange={handleKey} 
                        className='w-full h-20 break-words resize-none p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <Button className='bg-green-500 flex flex-row hover:bg-green-500' onClick={handlePaste}>
                    Paste
                </Button>
                
                <Button className='bg-teal-500 hover:bg-blue-500 flex flex-row items-center justify-center' onClick={handleSubmit}>
                    {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                        ) : (
                        <span>Submit</span>
                            )}
                </Button>
            </div>
            {
                sm &&
                <div className='flex flex-col justify-center items-center m-4 m-2 bg-rose-500 text-white rounded-lg'>
                <h1 className='p-2 text-2xl uppercase'>Invalid Key</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="18em" height="18em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M42.22 17.31v-3.85A7.48 7.48 0 0 0 34.74 6h0a7.48 7.48 0 0 0-7.49 7.48v6a3.13 3.13 0 0 0 3.13 3.13h9a2.26 2.26 0 0 1 2.26 2.26v11A6.62 6.62 0 0 1 35 42.5h-4.2a3.53 3.53 0 0 1-3.55-3.5v-6.8c0-4.75-6.18-5.7-6.18-11.88V9.3h-8.48a6.81 6.81 0 0 0-6.81 6.82h0a3.48 3.48 0 0 0 3.48 3.48H12v15.69a7.21 7.21 0 0 0 7.21 7.21h11.56M12.04 25.54H6.89M19.25 42.5H8.55M21.07 9.3V5.5m-6.26 3.8V5.5"/><circle cx="13.3" cy="13.82" r=".75" fill="currentColor"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m37.24 35.68l-1.78-3.88a2.07 2.07 0 1 0-1.65 0l-1.58 3.84Z"/></svg>
                </div>
            }
        </div>
    );
}
