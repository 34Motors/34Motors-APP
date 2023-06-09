import Image from "next/image";
import carImage from "../assets/img/MaseratiExample.png";
import { CardDetail } from "./cardDetail";
import { formatCurrency, formatNumber } from "@/utils/formatingFunctions";
import Link from "next/link";
import { ICarsReturn } from "@/interfaces/cars.interfaces";

interface iCardProps {
  car: ICarsReturn;
}

const CommonUserCarCard = ({ car }: iCardProps) => {
  const {
    model,
    brand,
    year,
    quilometers,
    price,
    description,
    frontImage,
    published,
    id,
    user,
  } = car;

  const { name } = user;

  const nameSplit = name.split(" ");

  const userInitials =
    name.split(" ")[0][0] === name.split(" ")[nameSplit.length - 1][0]
      ? ""
      : name.split(" ")[nameSplit.length - 1][0];
  return (
    <Link
      href={"/announcement/" + id}
      className="min-w-[320px] h-[280px] md:max-w-[312px] relative"
    >
      <li className="">
        <span
          className={
            published
              ? "btn-brand font-500 text-sm py-0 px-2 top-[12px] left-[12px] absolute"
              : "bg-grey-4 font-500 text-white text-sm py-0 px-2 top-[12px] left-[12px] absolute"
          }
        >
          {published ? "Ativo" : "Inativo"}
        </span>
        <div className="w-full flex items-center justify-center bg-gray-200">
          <Image
            width={10000}
            height={10000}
            src={frontImage}
            alt="Foto de um carro"
            className="w-full max-h-[150px] object-cover "
          />
        </div>
        <div className="flex flex-col gap-4">
          <h6 className="font-lexend font-600 text-heading7 text-grey-1 capitalize mt-4">
            {brand} - {model}
          </h6>
          <p className="text-sm h-12 overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
            {description}
          </p>
          <div className="flex items-center gap-2 font-500">
            <span className="p-0 m-0 capitalize flex items-center justify-center text-white bg-brand-1 text-sm  w-8 h-8 rounded-full">
              <span className="capitalize">{name.split("")[0]}</span>
              <span className="capitalize">{userInitials}</span>
            </span>
            <p className="text-grey-2 capitalize">{name}</p>
          </div>
          <div className=" flex justify-between items-center">
            <div className="flex gap-3">
              <CardDetail text={`${formatNumber(quilometers)} KM`} />
              <CardDetail text={year} />
            </div>
            <p className="text-base text-grey-1 font-600 font-lexend">
              {formatCurrency(price)}
            </p>
          </div>
          <div className="flex items-center justify-start gap-2"></div>
        </div>
      </li>
    </Link>
  );
};

export default CommonUserCarCard;
