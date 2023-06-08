import ModalBase from "./modalBase";
import { IoMdClose } from "react-icons/io";
import { Inter, Lexend } from "next/font/google";

interface ModalCreateCarProps {
  toggleModal: () => void;
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const ModalSuccessCreateCar = ({
  toggleModal,
}: ModalCreateCarProps) => {
  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-10 bg-grey-whiteFixed p-5 shadow-xl min-w-[50%] max-w-lg rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 text-grey-1 ${lexend.className}`}>Sucesso!</h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>
        <div className={`flex flex-col gap-4`}>
          <h4 className={`text-body1 font-500 text-grey-1 ${lexend.className}`}>
            Seu anúncio foi criado com sucesso!
          </h4>
          <p className={`text-body1 font-400 text-grey-2 leading-7 ${inter.className}`}>
            Agora você poderá ver seus negócios crescendo em grande escala
          </p>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalSuccessCreateCar;
