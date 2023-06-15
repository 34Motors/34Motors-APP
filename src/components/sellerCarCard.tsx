import Image from "next/image";
import carImage from "../assets/img/MaseratiExample.png";
import { CardDetail } from "./cardDetail";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import { formatCurrency } from "@/utils/formatingFunctions";
import Link from "next/link";

const SellerCarCard = ({ elem }: ICarsReturn) => {

    return (
        <li className="w-[312px] md:w-[40%] md:max-w-[312px] relative">
            <span className={elem.published ? "btn-brand font-500 text-sm py-0 px-2 top-[12px] left-[12px] absolute" : "bg-grey-4 font-500 text-white text-sm py-0 px-2 top-[12px] left-[12px] absolute"}>{elem.published ? "Ativo" : "Inativo"}</span>
            <div className="w-full flex items-center justify-center bg-gray-200">
                <Image
                    width={262}
                    height={150}
                    src={carImage}
                    alt="Foto de um carro"
                    className="w-full"
                />
            </div>
            <div className="flex flex-col gap-4">
                <h6 className="font-lexend font-600 text-heading7 text-grey-1 capitalize mt-4">
                    {elem.brand} - {elem.model}
                </h6>
                <p className="text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
                    {elem.description}
                </p>
                <div className=" flex justify-between items-center">
                    <div className="flex gap-3">
                        <CardDetail text={`${elem.quilometers} KM`} />
                        <CardDetail text={elem.year} />
                    </div>
                    <p className="text-base text-grey-1 font-600 font-lexend">{formatCurrency(elem.price)}</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <button className="border-[1.5px] py-[12px] px-[20px] border-grey-0 text-grey-0 rounded">Editar</button>
                    <Link href={`/announcement/${elem.id}`} className="border-[1.5px] py-[12px] px-[20px] border-grey-0 text-grey-0 rounded" > ver detalhes</Link>
                </div>
            </div>
        </li>
    );
}

export default SellerCarCard;