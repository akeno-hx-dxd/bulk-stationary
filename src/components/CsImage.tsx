"use client";
import { CldImage } from "next-cloudinary";
import React from "react";

// Define the props type that CsImage will accept
interface CsImageProps extends Omit<React.ComponentProps<typeof CldImage>, 'src' | 'quality'> {
  src: string; // src is a required prop for CldImage
  quality?: number; // Optional quality prop
  unoptimized?: boolean; // Optional unoptimized prop
}

export default function CsImage({ src, quality, unoptimized, ...props }: CsImageProps) {
  return (
    <CldImage
      src={src}
      quality={quality}
      unoptimized={unoptimized}
      {...props} // Spread any additional props to CldImage
    />
  );
}
