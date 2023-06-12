import ModalBase from "./modalBase";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { Inter, Lexend } from "next/font/google";

interface ModalDeleteCarProps {
  toggleModal: () => void;
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });


const ModalDeleteCar = ({ toggleModal }: ModalDeleteCarProps) => {
  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-10 bg-grey-whiteFixed p-5 shadow-xl min-w-[33%] max-w-lg rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 text-grey-1 ${lexend.className}`}>Excluir anúncio</h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>
        <div className={`flex flex-col gap-4`}>
          <h4 className={`text-body1 font-500 text-grey-1 ${lexend.className}`}>
            Tem certeza que deseja remover este anúncio?
          </h4>
          <p className={`text-body1 font-400 text-grey-2 leading-7 ${inter.className}`}>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
            conta e removerá seus dados de nossos servidores.
          </p>
        </div>
        <div className={`flex justify-end gap-3 ${inter.className}`}>
          <button
            onClick={toggleModal}
            className={`btn-negative py-3 px-6 rounded text-body2 font-600`}
          >
            Cancelar
          </button>
          <button
            className={`btn-alert py-3 px-6 rounded text-body2 font-600`}
          >
            Sim, excluir anúncio
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalDeleteCar;
