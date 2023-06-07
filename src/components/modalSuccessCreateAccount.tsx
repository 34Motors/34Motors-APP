import ModalBase from "./modalBase";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

interface ModalCreateAccountProps {
  toggleModal: () => void;
}

const ModalSuccessCreateAccount = ({
  toggleModal,
}: ModalCreateAccountProps) => {
  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-10 bg-grey-whiteFixed p-5 shadow-xl min-w-[50%] max-w-lg rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 text-grey-1`}>Sucesso!</h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>
        <div className={`flex flex-col gap-4`}>
          <h4 className={`text-body1 font-500 text-grey-1`}>
            Sua conta foi criada com sucesso!
          </h4>
          <p className={`text-body1 font-400 text-grey-2 leading-7`}>
            Agora você poderá ver seus negócios crescendo em grande escala
          </p>
          <Link
            href={"/login"}
            className={`bg-brand-1 py-3 px-5 rounded w-[132px] text-body2 font-600 text-grey-whiteFixed`}
          >
            Ir para o login
          </Link>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalSuccessCreateAccount;
