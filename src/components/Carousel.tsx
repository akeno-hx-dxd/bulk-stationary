import * as React from "react";
import CsImage from "./CsImage";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Helper to get the largest width and height

export default function CarouselCustom ({ uris }: { uris: string[] }) {
  return (
    <Carousel className="w-full max-w-xs" uriLength={uris.length}>
      <CarouselContent>
        {uris.map((uri, index) => (
          <CarouselItem key={index} className="flex justify-center items-center">
            <div className="flex justify-center items-center">
              <CsImage 
                src={uri}
                alt={uri}
                width={960} 
                height={600} 
                className="object-contain rounded-lg max-w-full max-h-full" 
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
