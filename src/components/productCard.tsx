import carImage from "../assets/img/MaseratiExample.png"
import Image from "next/image";
import { CardDetail } from "./cardDetail";
import { UserBadge } from "./userBadge";

export const ProductCard = () => {
  return (
    <div className="box-content w-80 flex flex-col gap-4">
      <div className="w-80 flex items-center justify-center bg-gray-200">
        <Image width={262} height={150} src={carImage} alt="Foto de um carro" />
      </div>
      <div className="flex flex-col gap-4">
        <h6 className="font-lexend font-600 text-heading7 text-grey-1">
          Maserati - Ghibli
        </h6>
        <p className="w-72 h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores,
          quas delectusss luptates debitis doloremque distinctio provident vero
          accusantium, ut, impedit deserunt sint dicta rerum voluptatum,
          recusandae sit perspiciatis mollitia dolorem.
        </p>
        <UserBadge bg_color="bg-brand-1" initials_color="text-white" name_color="grey-2"/>
        <div className="w-80 flex justify-between items-center">
          <div className="flex gap-3">
            <CardDetail text="0 KM" />
            <CardDetail text="2019" />
          </div>
          <p className="text-base text-grey-1 font-500 font-lexend">
            R$ 00.000,00
          </p>
        </div>
      </div>
    </div>
  );
};
