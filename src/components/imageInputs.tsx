import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiImageAdd, BiCar } from "react-icons/bi";

interface props {
  h: number;
  w: number;
}

const UploadImageInput = ({ h, w }: props) => {
  const [images, setImages] = useState<File[]>([] as File[]);

  const onDrop = useCallback((files: File[]) => {
    setImages([...images, ...files]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const { getRootProps, getInputProps } = dropzone;

  return (
    <>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-[${w}px] h-[${h}px] bg-grey-4 rounded-lg border-2 border-gray-400 cursor-pointer`}
      >
        <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
          <div className="flex justify-center items-center pt-5 pb-6 w-full h-full">
            <BiCar className="fill-gray-200 w-8 h-8" />
            <BiImageAdd className="fill-gray-200 w-10 h-10" />
          </div>
        </label>
        <input className="hidden" {...getInputProps()} id="image-input" />
      </div>
      {images &&
        images.map((image, index) => (
          <Image
            src={URL.createObjectURL(image)}
            key={index}
            width={500}
            height={500}
            alt="car"
          />
        ))}
    </>
  );
};

export { UploadImageInput };
