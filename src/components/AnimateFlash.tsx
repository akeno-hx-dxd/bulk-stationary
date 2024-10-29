"use client"
import React, { useEffect, useState } from 'react'
import { FLASH_MESSAGES } from '@/constants'

const AnimateFlash = () => {
    const [flash, setFlash] = useState<string>("");
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        setFlash(FLASH_MESSAGES[Math.floor(Math.random() * FLASH_MESSAGES.length)]);
        setShowFlash(true);

        const interval = setInterval(() => {
            setShowFlash(false);   
            setTimeout(() => {
                setFlash(FLASH_MESSAGES[Math.floor(Math.random() * FLASH_MESSAGES.length)]);
                setShowFlash(true); 
            }, 500); 
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pb-2 lg:pt-2 lg:pb-0 lg:col-span-4 col-span-5 flex justify-center items-center lg:text-sm text-[10px] font-thin lg:font-semibold capitalize lg:h-6 h-4"> 
            <div className={`${showFlash ? 'animate-slide-up' : ''} h-full text-center`}>
                {flash}
            </div>
        </div>
    );
};

export default AnimateFlash;
