import React from "react";
import ModalBase from "./modalBase";
import carImage from "../assets/img/MaseratiExample.png";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Inter, Lexend } from "next/font/google";

interface ModalCarImageProps {
  toggleModal: () => void;
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const ModalCarImage = ({ toggleModal }: ModalCarImageProps) => {
  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-8 bg-grey-whiteFixed p-5 shadow-xl min-w-[50%] max-w-lg rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 ${lexend.className}`}>Imagem do Veículo</h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>
        <div className={`flex items-center justify-center`}>
          <div
            className={`flex items-center justify-center py-7 px-3 w-[466px] rounded bg-grey-7`}
          >
            <Image src={carImage} alt="Imagem do carro clicado" />
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalCarImage;
