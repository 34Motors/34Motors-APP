import Image from "next/image";
import { CardDetail } from "./cardDetail";
import { UserBadge } from "./userBadge";
import { ICarsReturn } from "@/interfaces/cars.interfaces";

export const ProductCard = ({car}: {car: ICarsReturn}) => {
  return (
    <li className="box-content w-80 flex flex-col gap-4">
      <div className="w-80 flex items-center justify-center bg-gray-200">
        <Image width={262} height={150} src={car.frontImage} alt="Foto de um carro" />
      </div>
      <div className="flex flex-col gap-4">
        <h6 className="font-lexend font-600 text-heading7 text-grey-1">
          {car.model}
        </h6>
        <p className="w-72 h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
          {car.description}
        </p>
        <UserBadge bg_color="bg-brand-1" initials_color="text-white" name_color="grey-2"/>
        <div className="w-80 flex justify-between items-center">
          <div className="flex gap-3">
            <CardDetail text={car.quilometers} />
            <CardDetail text={car.year} />
          </div>
          <p className="text-base text-grey-1 font-500 font-lexend">
            {`R$ ${car.price}`}
          </p>
        </div>
      </div>
    </li>
  );
};
