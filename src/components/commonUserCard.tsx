import Image from "next/image";
import carImage from "../assets/img/MaseratiExample.png";
import { CardDetail } from "./cardDetail";
import { formatCurrency } from "@/utils/formatingFunctions";
import Link from "next/link";

interface iCarCarProps {
    model: string;
    brand: string;
    year: string;
    quilometers: string;
    price: number;
    description: string;
    frontImage: string;
    images: string[];
    published: boolean;
    id: number;
    user: string
}

const CommonUserCarCard = ({frontImage, images, published, model, brand, description, quilometers, year, id, price, user}: iCarCarProps) => {
    return (
        <Link href={"/announcement/" + id} className="w-[312px] md:w-[40%] md:max-w-[312px] relative">

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
                        {brand} - {model}
                    </h6>
                    <p className="text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
                        {description}
                    </p>
                    <div className="flex items-center gap-2 font-500">
                        <span className="p-0 m-0 flex items-center justify-center text-white bg-brand-1 text-sm  w-8 h-8 rounded-full">{brand.split("")[0]}</span>
                        <p className="text-grey-2 capitalize">{user}</p>

                    </div>
                    <div className=" flex justify-between items-center">
                        <div className="flex gap-3">
                            <CardDetail text={`${quilometers} KM`} />
                            <CardDetail text={year} />
                        </div>
                        <p className="text-base text-grey-1 font-600 font-lexend">{formatCurrency(price)}</p>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                    </div>
                </div>
            </li>
        </Link>
    );
}

export default CommonUserCarCard