import { DefaultFieldset } from "@/components/defaultFieldset";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { iUserBody } from "@/interfaces/user.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "./schema";
import ModalSuccessCreateAccount from "@/components/Modals/modalSuccessCreateAccount";
import { useUserContext } from "@/contexts/userContext";
import { RegisterForm } from "@/components/registerForm";
import Head from "next/head";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserBody>({
    resolver: zodResolver(registerSchema),
  });

  const { setModalIsOpen, modalIsOpen } = useUserContext();

  const toggle = () => setModalIsOpen(!modalIsOpen);

  return (
    <>
      <Head>
        <title>Registro - 34 Motors</title>
      </Head>
      <div>
        <Header />
        <main className="flex justify-center bg-grey-8 h-full">
          <RegisterForm />
        </main>
        <Footer />
        {modalIsOpen && <ModalSuccessCreateAccount toggleModal={toggle} />}
      </div>
    </>
  );
};

export default RegisterPage;
