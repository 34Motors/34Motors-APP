import Image from "next/image";
import logo from "../assets/logo-34-motors-black.png";
import { FaCarBattery } from "react-icons/fa";
import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Erro 500 - 34 Motors</title>
        <meta name="description" content="Página de erro 500" />
      </Head>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
        <FaCarBattery size={80} color="#4529E6" title="Ícone de rosto triste" />
        <Image src={logo} alt={"Logo 34 Motors"} height={60} />
        <h1 className="flex items-center gap-3 text-heading6">
          Erro 500 - Ops, erro de servidor.
        </h1>
        <p>Entre em contato com o suporte.</p>
      </div>
    </>
  );
}
