"use client";
import React, { useState, useEffect } from "react";
import { Catalog } from "@/lib/types";
import Link from "next/link";
import CsImage from "./CsImage";

const Catalogs = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      const res = await fetch("/api/catalogs");
      if (res.ok) {
        const parsedRes = await res.json();
        setCatalogs(parsedRes.catalogs);
      }
    };
    fetchCatalogs();
  }, []);

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:w-screen p-2">
      {catalogs.map((catalog) => (
        <Link
          href={`/catalog/${catalog.id}`}
          key={catalog.id}
          className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
        >
          <div className="relative rounded-full p-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500">
            <div className="rounded-full overflow-hidden bg-white p-1">
              <CsImage
                src={catalog.image_uri}
                alt={catalog.name}
                width={100}
                height={100}
                className="rounded-full w-[100px] h-[90px] lg:w-[150px] lg:h-[150px]"
              />
            </div>
          </div>
          <h1 className="text-sm mt-2 lg:mt-4 text-gray-700 font-medium">
            {catalog.name}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Catalogs;
