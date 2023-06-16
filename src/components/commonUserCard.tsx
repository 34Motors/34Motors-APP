import Image from "next/image";
import carImage from "../assets/img/MaseratiExample.png";
import { CardDetail } from "./cardDetail";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import { formatCurrency } from "@/utils/formatingFunctions";
import Link from "next/link";

interface iCarCarProps {
    model: string;
    brand: string;
    year: string;
    quilometers: string;
    fuelType: "Hibrido" | "Flex" | "Eletrico";
    color: string;
    fipePrice: string;
    price: number;
    description: string;
    frontImage: string;
    images: string[];
    published: boolean;
    userId: number;
    id: number;
}

const CommonUserCarCard = ({ elem }: any) => {
    return (
        <Link href={"/announcement/"+elem.id} className="w-[312px] md:w-[40%] md:max-w-[312px] relative">

            <li>
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
                    <div className="flex items-center gap-2 font-500">
                        <span className="p-0 m-0 flex items-center justify-center text-white bg-brand-1 text-sm  w-8 h-8 rounded-full">{elem.brand.split("")[0]}</span>
                        <p className="text-grey-2 capitalize">{elem.user.name}</p>

                    </div>
                    <div className=" flex justify-between items-center">
                        <div className="flex gap-3">
                            <CardDetail text={`${elem.quilometers} KM`} />
                            <CardDetail text={elem.year} />
                        </div>
                        <p className="text-base text-grey-1 font-600 font-lexend">{formatCurrency(elem.price)}</p>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                    </div>
                </div>
            </li>
        </Link>
    );
}

export default CommonUserCarCard