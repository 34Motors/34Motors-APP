import { Inter, Lexend } from "next/font/google";
import ModalBase from "../modalBase";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserData, editUserSchema } from "./validator";
import { IoMdClose } from "react-icons/io";

interface ModalEditUserProps {
  toggleModal: () => void;
}

export interface iEditUserData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  description?: string | null | undefined;
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const ModalEditUser = ({ toggleModal }: ModalEditUserProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<iEditUserData>({
    resolver: zodResolver(editUserSchema),
    mode: "onBlur",
    // defaultValues: {
    //   name: user?.name,
    //   email: user?.email,
    //   cpf: user?.cpf,
    //   phone: user?.phone,
    //   birthDate: user?.birthDate,
    //   description: user?.description,
    // },
  });

  const onSubmit: SubmitHandler<EditUserData> = (data) => {
    console.log(data);
  };

  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-10 bg-grey-whiteFixed p-5 shadow-xl min-w-[33%] max-w-lg h-auto rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 text-grey-1 ${lexend.className}`}>
            Editar perfil
          </h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>

        <div>
          <h4
            className={`text-body2 font-500 text-grey-0 mb-4 ${inter.className}`}
          >
            Informações pessoais
          </h4>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col gap-6`}
          >
            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="name"
                className={`default-label ${inter.className}`}
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                placeholder="Exemplo Silva"
                {...register("name")}
                className={`default-input w-full`}
              />
              {errors.name?.message && <small>{errors.name.message}</small>}
            </div>

            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="email"
                className={`default-label ${inter.className}`}
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="exemplo@mail.com"
                {...register("email")}
                className={`default-input`}
              />
              {errors.email?.message && <small>{errors.email.message}</small>}
            </div>

            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="cpf"
                className={`default-label ${inter.className}`}
              >
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                placeholder="100.200.300-40"
                {...register("cpf")}
                className={`default-input`}
              />
              {errors.cpf?.message && <small>{errors.cpf.message}</small>}
            </div>

            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="phone"
                className={`default-label ${inter.className}`}
              >
                Celular
              </label>
              <input
                type="text"
                id="phone"
                placeholder="83 12345 6789"
                {...register("phone")}
                className={`default-input`}
              />
              {errors.phone?.message && <small>{errors.phone.message}</small>}
            </div>

            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="birthDate"
                className={`default-label ${inter.className}`}
              >
                Data de nascimento
              </label>
              <input
                type="text"
                id="birthDate"
                placeholder="DD/MM/AAAA"
                {...register("birthDate")}
                className={`default-input`}
              />
              {errors.birthDate?.message && <small>{errors.birthDate.message}</small>}
            </div>

            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="description"
                className={`default-label ${inter.className}`}
              >
                Descrição
              </label>
              <textarea
                id="description"
                placeholder="Conte um pouco sobre você..."
                {...register("description")}
                className={`default-input`}
              />
              {errors.description?.message && <small>{errors.description.message}</small>}
            </div>

            <div className={`flex justify-end gap-3 ${inter.className}`}>
              <button
                onClick={toggleModal}
                className={`btn-negative py-3 px-6 rounded text-body2 font-600`}
              >
                Cancelar
              </button>

              <button
                className={`btn-alert py-3 px-6 rounded  text-body2 font-600`}
              >
                Excluir perfil
              </button>

              <button
                type="submit"
                className={`btn-brand bg-brand-1 py-3 px-6 rounded text-body2 font-600`}
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalEditUser;
