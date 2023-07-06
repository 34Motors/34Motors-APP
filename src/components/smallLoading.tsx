import React from "react";
import Image from "next/image";
import LoadingCars from "@/assets/loading-cars.gif";

export const SmallLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-white">
      <Image
        src={LoadingCars}
        alt="Loading"
        loading="eager"
        unoptimized={true}
        priority
      />
    </div>
  );
};
