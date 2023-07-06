import { set } from "lodash";
import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { BiImageAdd, BiCar } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

interface props {
  form: UseFormReturn<FieldValues, any>;
  imageUrl?: string;
}

const SingleImageInput = ({ form, imageUrl }: props) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = form;
  const inputRef = useRef(null);
  const image = watch("frontImage");
  const [src, setSrc] = useState(imageUrl);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setValue("frontImage", file);
      setSrc(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center w-full h-[200px] bg-grey-4 rounded-lg border-2 border-gray-400 cursor-pointer`}
      >
        <input
          className="hidden"
          id="image-input"
          {...register("frontImage")}
          ref={inputRef}
          onChange={handleImageChange}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
        {src ? (
          <div className="relative w-full h-[200px] flex items-center justify-center">
            <Image
              src={src}
              alt="imagem da capa do veículo"
              width={200}
              height={200}
              className="rounded w-auto h-full"
            />
            <label
              htmlFor="image-input"
              className="absolute top-[5px] right-[5px] cursor-pointer"
            >
              <BsFillPencilFill fill="white" className="h-5 w-5 z-10" />
            </label>
          </div>
        ) : (
          <label htmlFor="image-input" className="cursor-pointer w-full h-full">
            <div className="flex justify-center items-center pt-5 pb-6 w-full h-full">
              <BiCar className="fill-gray-200 w-8 h-8" />
              <BiImageAdd className="fill-gray-200 w-10 h-10" />
            </div>
          </label>
        )}
      </div>
    </>
  );
};

export { SingleImageInput };
