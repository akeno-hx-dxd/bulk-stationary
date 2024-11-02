// app/components/BackButton.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-gray-700 hover:text-emerald-500"
    >
      <ArrowLeft className="mr-2" />
      Back
    </button>
  );
};

export default BackButton;
