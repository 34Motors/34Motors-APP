import Image from "next/image";
import carImage from "../assets/img/MaseratiExample.png";
import { UserBadge } from "./userBadge";
import { CardDetail } from "./cardDetail";

const SellerCarCard = () => {
    return (
        <li className="w-[312px] md:w-[40%] md:max-w-[312px]">
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
                <h6 className="font-lexend font-600 text-heading7 text-grey-1">
                    Maserati - Ghibli
                </h6>
                <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...
                </p>
                <UserBadge
                    bg_color="bg-brand-1"
                    initials_color="text-white"
                    name_color="grey-2"
                />
                <div className=" flex justify-between items-center">
                    <div className="flex gap-3">
                        <CardDetail text="0 KM" />
                        <CardDetail text="2019" />
                    </div>
                    <p className="text-base text-grey-1 font-600 font-lexend"> R$ 00.000,00</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <button className="border-[1.5px] py-[12px] px-[20px] border-grey-0 text-grey-0 rounded">Editar</button>
                    <button className="border-[1.5px] py-[12px] px-[20px] border-grey-0 text-grey-0 rounded"> ver detalhes</button>
                </div>
            </div>
        </li>
    );
}

export default SellerCarCard;