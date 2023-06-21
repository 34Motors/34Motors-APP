import { DefaultFieldset } from "@/components/defaultFieldset";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { iUserBody } from "@/interfaces/user.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "./schema";
import { API } from "@/services/apis";
import ModalSuccessCreateAccount from "@/components/Modals/modalSuccessCreateAccount";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserBody>({
    resolver: zodResolver(registerSchema),
  });

  const [isSeller, setIsSeller] = useState<boolean>(true);
  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const submit = async (data: iUserBody) => {
    const userData = {
      ...data,
      isSeller,
    };
    if (userData.complement === "") {
      delete userData.complement;
    }

    if (userData.description === "") {
      delete userData.description;
    }
    try {
      await API.post("/users", userData);
      setModalIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <main className="flex justify-center bg-grey-8 h-full">
        <form
          className="bg-grey-10 py-11 h-fit px-12 mt-[46px] mb-[97px] rounded md:w-[411px]"
          onSubmit={handleSubmit(submit)}
        >
          <h2 className="mb-8 font-500 text-heading5">Cadastro</h2>
          <h3 className="mb-6 font-500 text-sm">Informações pessoais</h3>
          <div className="flex flex-col gap-6 w-full">
            <DefaultFieldset
              label="Nome"
              id="name"
              inputProps={{
                placeholder: "Digite seu nome",
                ...register("name"),
              }}
            />
            {errors.name?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.name.message}
              </small>
            )}
            <DefaultFieldset
              label="Email"
              id="email"
              inputProps={{
                placeholder: "Digite seu email",
                ...register("email"),
              }}
            />
            {errors.email?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.email.message}
              </small>
            )}
            <DefaultFieldset
              label="CPF"
              id="cpf"
              inputProps={{
                placeholder: "Digite seu cpf",
                ...register("cpf"),
              }}
            />
            {errors.cpf?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.cpf.message}
              </small>
            )}
            <DefaultFieldset
              label="Celular"
              id="phone"
              inputProps={{
                placeholder: "Digite seu telefone",
                ...register("phone"),
              }}
            />
            {errors.phone?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.phone.message}
              </small>
            )}
            <DefaultFieldset
              label="Data de nascimento"
              id="birthDate"
              inputProps={{
                placeholder: "Digite sua data de nascimento",
                ...register("birthDate"),
              }}
            />
            {errors.birthDate?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.birthDate.message}
              </small>
            )}
            <DefaultFieldset
              label="Descrição"
              id="description"
              inputProps={{
                placeholder: "Digite uma descrição",
                ...register("description"),
              }}
            />
            {errors.description?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.description.message}
              </small>
            )}
            <h3 className="font-500 text-sm">Informações de endereço</h3>
            <DefaultFieldset
              label="CEP"
              id="cep"
              inputProps={{
                placeholder: "Digitar seu cep",
                ...register("cep"),
              }}
            />
            {errors.cep?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.cep.message}
              </small>
            )}
            <div className="flex gap-2">
              <div className="flex flex-col">
                <DefaultFieldset
                  label="Estado"
                  id="state"
                  inputProps={{
                    placeholder: "Digite seu estado",
                    ...register("state"),
                  }}
                />
                {errors.state?.message && (
                  <small className="text-alert-1 ">
                    {errors.state.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <DefaultFieldset
                  label="Cidade"
                  id="city"
                  inputProps={{
                    placeholder: "Digite sua cidade",
                    ...register("city"),
                  }}
                />
                {errors.city?.message && (
                  <small className="text-alert-1 ">{errors.city.message}</small>
                )}
              </div>
            </div>
            <DefaultFieldset
              label="Rua"
              id="street"
              inputProps={{
                placeholder: "Digite uma rua",
                ...register("street"),
              }}
            />
            {errors.street?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.street.message}
              </small>
            )}
            <div className="flex gap-2">
              <div className="flex flex-col">
                <DefaultFieldset
                  label="Número"
                  id="number"
                  inputProps={{
                    placeholder: "Digite seu número",
                    ...register("number"),
                  }}
                />
                {errors.number?.message && (
                  <small className="text-alert-1 ">
                    {errors.number.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <DefaultFieldset
                  label="Complemento"
                  id="complement"
                  inputProps={{
                    placeholder: "Digite um complemento",
                    ...register("complement"),
                  }}
                />
                {errors.complement?.message && (
                  <small className="text-alert-1 ">
                    {errors.complement.message}
                  </small>
                )}
              </div>
            </div>

            <h3 className="font-500 text-sm">Tipo de conta</h3>
            <div className="flex gap-2">
              <button
                className={`px-4 ${
                  buttonColor
                    ? "bg-brand-1 text-white border-brand-1"
                    : "bg-gray-9 border border-grey-3"
                } py-2 w-full h-full bg-gray-9 border border-grey-3 rounded focus:bg-brand-1 focus:text-white focus:border-brand-1`}
                onClick={(e) => {
                  e.preventDefault(),
                    setIsSeller(false),
                    setButtonColor(!buttonColor);
                }}
              >
                Comprador
              </button>
              <button
                className={`px-4 ${
                  !buttonColor
                    ? "bg-brand-1 text-white border-brand-1"
                    : "bg-gray-9 border border-grey-3"
                } py-2 w-full h-full bg-gray-9 border rounded`}
                onClick={(e) => {
                  e.preventDefault(),
                    setIsSeller(true),
                    setButtonColor(!buttonColor);
                }}
              >
                Anunciante
              </button>
            </div>
            {errors.isSeller?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.isSeller.message}
              </small>
            )}
            <DefaultFieldset
              label="Senha"
              id="password"
              inputProps={{
                placeholder: "Digite uma senha",
                ...register("password"),
              }}
            />
            {errors.password?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.password.message}
              </small>
            )}
            <DefaultFieldset
              label="Confimar senha"
              id="confirmPassword"
              inputProps={{
                placeholder: "confirme sua senha",
                ...register("confirmPassword"),
              }}
            />
            {errors.confirmPassword?.message && (
              <small className="text-alert-1 my-[-22px]">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>
          <button
            className={`btn-brand w-full ${
              errors.confirmPassword ? "mt-9" : "mt-6"
            } py-3 px-7 rounded`}
          >
            Finalizar cadastro
          </button>
        </form>
      </main>
      <Footer />
      {modalIsOpen && <ModalSuccessCreateAccount toggleModal={toggle} />}
    </div>
  );
};

export default RegisterPage;
