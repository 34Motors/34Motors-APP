import Image from "next/image";
import logo from "../assets/logo-34-motors-black.png";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { FaCarCrash } from "react-icons/fa";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Erro 404 - 34 Motors</title>
        <meta
          name="description"
          content="Página de erro 404 da 34 Motors, página não encontrada."
        />
      </Head>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
        <FaCarCrash size={80} color="#4529E6" title="Ícone de rosto triste" />
        <Image src={logo} alt={"Logo 34 Motors"} height={60} />
        <h1 className="flex items-center gap-3 text-heading6">
          <MdOutlineInsertPageBreak
            size={30}
            color="#4529E6"
            title="Ícone de página quebrada"
          />
          Erro 404 - Desculpe, a página não foi encontrada
        </h1>
        <button
          className="btn-big btn-brand"
          onClick={() => router.push("/")}
        >
          Voltar para a página inicial
        </button>
      </div>
    </>
  );
}
