import React from "react";
import ModalBase from "./modalBase";
import carImage from "../../assets/img/MaseratiExample.png";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Inter, Lexend } from "next/font/google";
import { CarImage } from "@/interfaces/cars.interfaces";

interface ModalCarImageProps {
  toggleModal: () => void;
  carImage: string | null
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const ModalCarImage = ({ toggleModal, carImage }: ModalCarImageProps) => {
  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-8 bg-grey-whiteFixed p-5 shadow-xl min-w-[33%] max-w-lg rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 ${lexend.className}`}>Imagem do Veículo</h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>
        <div className={`flex items-center justify-center`}>
          <div
            className={`flex items-center justify-center w-[466px] rounded bg-grey-7`}
          >
            <Image src={carImage!} alt="Imagem do carro clicado" width={200} height={200} className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalCarImage;
