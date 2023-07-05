import Image from "next/image";
import { CardDetail } from "./cardDetail";
import { formatCurrency, formatNumber } from "@/utils/formatingFunctions";
import Link from "next/link";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
interface iSellerCardProps {
  car: ICarsReturn;
  handleEdit: (car: ICarsReturn) => void;
}

const SellerCarCard = ({ car, handleEdit }: iSellerCardProps) => {
  const {
    frontImage,
    published,
    model,
    brand,
    description,
    quilometers,
    year,
    id,
    price,
  } = car;

  return (
    <li className="w-[312px] md:w-[40%] md:max-w-[312px] relative">
      <div className="w-full flex items-center justify-center bg-gray-200">
        <Image
          width={262}
          height={150}
          src={frontImage}
          alt="Foto de um carro"
          className="w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h6 className="font-lexend font-600 text-heading7 text-grey-1 capitalize mt-4">
          {brand} - {model}
        </h6>
        <p className="text-sm h-12 overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
          {description}
        </p>
        <div className=" flex justify-between items-center">
          <div className="flex gap-3">
            <CardDetail text={`${formatNumber(quilometers)} KM`} />
            <CardDetail text={year} />
          </div>
          <p className="text-base text-grey-1 font-600 font-lexend">
            {formatCurrency(price)}
          </p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <button
            className="border-[1.5px] py-[12px] px-[20px] border-grey-0 text-grey-0 rounded"
            onClick={() => handleEdit(car)}
          >
            Editar
          </button>
          <Link
            href={`/announcement/${id}`}
            className="border-[1.5px] py-[12px] px-[20px] border-grey-0 text-grey-0 rounded"
          >
            {" "}
            Ver detalhes
          </Link>
        </div>
      </div>
    </li>
  );
};

export default SellerCarCard;
