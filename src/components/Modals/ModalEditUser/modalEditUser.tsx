import { Inter, Lexend } from "next/font/google";
import ModalBase from "../modalBase";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserData, editUserSchema } from "./validator";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { iUserBody } from "@/interfaces/user.interfaces";
import { DefaultFieldset } from "@/components/defaultFieldset";
import { API } from "@/services/apis";
import { iUser } from "@/pages/seller/interface";

interface ModalEditUserProps {
  toggleModal: () => void;
  toggleModalDeleteUser: () => void;
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

const ModalEditUser = ({ toggleModal, toggleModalDeleteUser }: ModalEditUserProps) => {
  const [loggedUser, setLoggedUser] = useState<iUserBody>({} as iUserBody);
  const [loggedToken, setLoggedToken] = useState<string>("");

  useEffect(() => {
    const validateUser = () => {
      const cookies = parseCookies();

      if (cookies.user) {
        const userParsed = JSON.parse(cookies.user);
        setLoggedUser(userParsed);
        setLoggedToken(cookies.token);
      }
    };
    validateUser();
  }, [loggedToken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iEditUserData>({
    resolver: zodResolver(editUserSchema),
    mode: "onBlur",
    defaultValues: {
      name: loggedUser?.name,
      email: loggedUser?.email,
      cpf: loggedUser?.cpf,
      phone: loggedUser?.phone,
      birthDate: loggedUser?.birthDate,
      description: loggedUser?.description,
    },
  });

  const onSubmit: SubmitHandler<EditUserData> = async(data) => {

    if(data.name === ""){
      delete data.name;
    }
    if(data.description === ""){
      delete data.description;
    }
    if(data.email === ""){
      delete data.email;
    }
    if(data.phone === ""){
      delete data.phone;
    }
    if(data.cpf === ""){
      delete data.cpf;
    }
    if(data.birthDate === ""){
      delete data.birthDate;
    }

    const cookies = parseCookies()    
    const cookieUser: iUser = JSON.parse(cookies.user)
    const token = cookies.token

    API.defaults.headers.common.authorization = `Bearer ${token}`;

    try {
      const response = await API.patch("/users/"+cookieUser.id, data)

      const userToCookie = JSON.stringify(response.data)

      setCookie(null, "user", userToCookie, {
        maxAge: 86400,
        path: "/",
      })
    } catch (error) {
      console.log(error)
    }


  }

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
            <DefaultFieldset
              label="Nome"
              id="name"
              inputProps={{
                placeholder: "Exemplo Silva",
                ...register("name"),
              }}
            />
            {errors.name?.message && (
              <small className="text-alert-1 my-[-10px]">
                {errors.name.message}
              </small>
            )}

            <DefaultFieldset
              label="E-mail"
              id="email"
              inputProps={{
                placeholder: "exemplo@mail.com",
                ...register("email"),
              }}
            />
            {errors.email?.message && (
              <small className="text-alert-1 my-[-10px]">
                {errors.email.message}
              </small>
            )}

            <DefaultFieldset
              label="CPF"
              id="cpf"
              inputProps={{
                placeholder: "100.200.300-40",
                ...register("cpf"),
              }}
            />
            {errors.cpf?.message && (
              <small className="text-alert-1 my-[-10px]">
                {errors.cpf.message}
              </small>
            )}

            <DefaultFieldset
              label="Celular"
              id="phone"
              inputProps={{
                placeholder: "00 12345 6789",
                ...register("phone"),
              }}
            />
            {errors.phone?.message && (
              <small className="text-alert-1 my-[-10px]">
                {errors.phone.message}
              </small>
            )}

            <DefaultFieldset
              label="Data de nascimento"
              id="birthDate"
              inputProps={{
                placeholder: "DD/MM/AAAA",
                ...register("birthDate"),
              }}
            />
            {errors.birthDate?.message && (
              <small className="text-alert-1 my-[-10px]">
                {errors.birthDate.message}
              </small>
            )}

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
              {errors.description?.message && (
                <small className="text-alert-1 my-[-22px]">
                  {errors.description.message}
                </small>
              )}
            </div>

            <div className={`flex justify-end gap-3 ${inter.className}`}>
              <button
                onClick={toggleModal}
                className={`btn-negative py-3 px-6 rounded text-body2 font-600`}
              >
                Cancelar
              </button>

              <button
              onClick={toggleModalDeleteUser}
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
