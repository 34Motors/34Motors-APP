import { DefaultFieldset } from "@/components/defaultFieldset";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { iUserBody } from "@/interfaces/user.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "./schema";
import { API } from "@/services/apis";
import ModalSuccessCreateAccount from "@/components/Modals/modalSuccessCreateAccount";
import { useUserContext } from "@/contexts/userContext";
import { RegisterForm } from "@/components/registerForm";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserBody>({
    resolver: zodResolver(registerSchema),
  });

    const { setModalIsOpen, modalIsOpen } = useUserContext()

    const toggle = () => setModalIsOpen(!modalIsOpen);

    return (
        <div>
            <Header />
            <main className="flex justify-center bg-grey-8 h-full">
                <RegisterForm/>
            </main>
            <Footer />
            {modalIsOpen && <ModalSuccessCreateAccount toggleModal={toggle}/>}
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
