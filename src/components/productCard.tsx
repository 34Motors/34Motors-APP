import Image from "next/image";
import Link from "next/link";
import { FiDollarSign } from "react-icons/fi";
import { CardDetail } from "./cardDetail";
import { UserBadge } from "./userBadge";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import { formatCurrency, formatNumber } from "@/utils/formatingFunctions";

export const ProductCard = ({ car }: { car: ICarsReturn }) => {
  const discountBadge =
    car.price <= parseInt(car.fipePrice) - (parseInt(car.fipePrice) / 100) * 5
      ? true
      : false;

  return (
    <li className="box-content w-80 flex flex-col gap-4 relative">
      {discountBadge ? (
        <div className="w-4 h-7 bg-random-7 rounded flex items-center absolute top-0 right-0 z-10">
          <FiDollarSign className="text-white h-[14px]" />
        </div>
      ) : null}
      <Link href={`/announcement/${car.id}`}>
        <div className="w-80 h-[150px] flex items-center justify-center bg-gray-200 relative">
          <Image
            width={262}
            height={150}
            src={car.frontImage}
            alt="Foto de um carro"
            className="object-cover h-full w-full mix-blend-multiply"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h6 className="font-lexend font-600 text-heading7 text-grey-1">
            {`${car.brand} ${car.model}`}
          </h6>
          <p className="w-72 h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
            {car.description}
          </p>
          <UserBadge
            bg_color={car.user.userColor}
            initials_color="text-white"
            name_color="grey-2"
            name={car.user.name}
          />
          <div className="w-80 flex justify-between items-center">
            <div className="flex gap-3">
              <CardDetail text={formatNumber(car.quilometers) + " KM"} />
              <CardDetail text={car.year} />
            </div>
            <p className="text-base text-grey-1 font-500 font-lexend">
              {formatCurrency(car.price)}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
