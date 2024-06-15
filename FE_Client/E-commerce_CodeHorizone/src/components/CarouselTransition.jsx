import React from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";

export default function CarouselTransition() {
  return (
    <div className="flex justify-center mx-auto -mt-12 items-center ">
      <div className="">
        <Carousel
          className="rounded-xl"
          prevArrow={({ handlePrev }) => (
            <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </IconButton>
          )}
        >
          <img src="/images/carousel_1.png" alt="image 1" className="h-auto w-full object-cover" />
          <img src="/images/carousel_2.png" alt="image 2" className="h-auto w-full object-cover" />
          <img src="/images/carousel_3.png" alt="image 3" className="h-auto w-full object-cover" />
        </Carousel>
      </div>
    </div>
  );
}
