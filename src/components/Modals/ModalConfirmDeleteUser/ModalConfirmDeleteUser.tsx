import ModalBase from "../modalBase";
import { IoMdClose } from "react-icons/io";
import { Inter, Lexend } from "next/font/google";
import { DefaultFieldset } from "@/components/defaultFieldset";
import { SubmitHandler, useForm } from "react-hook-form";
import { tConfirmPasswordData } from "./validator";

interface ModalConfirmDeleteUserProps {
  toggleModal: () => void;
}

export interface iConfirmPassword {
  password: string;
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const ModalConfirmDeleteUser = ({
  toggleModal
}: ModalConfirmDeleteUserProps) => {
  const { register, handleSubmit } = useForm<iConfirmPassword>();

  const onSubmit: SubmitHandler<tConfirmPasswordData> = (data) => {
    console.log(data);
  };

  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-6 bg-grey-whiteFixed p-5 shadow-xl min-w-[33%] max-w-lg rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 text-grey-1 ${lexend.className}`}>
            Deseja deletar sua conta?
          </h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <DefaultFieldset
            label="Digite sua senha para confirmar a exclusão:"
            id="password"
            inputProps={{
              placeholder: "******",
              ...register("password"),
            }}
          />
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
              Quero excluir minha conta
            </button>
          </div>
        </form>
      </div>
    </ModalBase>
  );
};

export default ModalConfirmDeleteUser;
