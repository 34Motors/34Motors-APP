import React from "react";
import Image from "next/image";
import LoadingDrift from "@/assets/loading-drift.gif";

export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-white">
      <Image
        src={LoadingDrift}
        alt="Loading"
        loading="eager"
        unoptimized={true}
        priority
      />
    </div>
  );

};
