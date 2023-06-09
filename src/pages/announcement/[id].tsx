import Header from "@/components/header";
import Image from "next/image";
import { useRouter } from "next/router";
import carImage from "../../assets/img/MaseratiExample.png";
import { CardDetail } from "@/components/cardDetail";
import { CommentsList } from "@/components/commentsList";
import { UserBadge } from "@/components/userBadge";

import { useState } from "react";
import Footer from "@/components/footer";
import Link from "next/link";

const Announcement = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const disable = isLoggedIn ? false : true;
  return (
    <>
      <Header />
      <div className="bg-brand-1 h-[436px] w-screen absolute z-0"></div>
      <div className="bg-grey-8">
        <main className="grid gap-4 grid-cols-1 w-11/12 mx-auto my-10 relative z-1 md:grid-cols-3 md:grid-flow-ro md:max-w-6xl">
          <div className="bg-grey-10 rounded h-[355px] md:col-start-1 md:col-end-3 ">
            <Image
              width={351}
              height={355}
              src={carImage}
              alt="Foto de um carro"
              className="mt-[90px] mx-auto"
            />
          </div>

          <div className="bg-grey-10 rounded p-7 md:col-span-2 md:row-span-1">
            <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-[71px]">
              Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200{" "}
            </h6>
            <div className="mb-6">
              <div className="flex gap-3 mb-8">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-heading7 text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
            <button className="mb-10 btn-brand p-2 text-sm font-600 font-inter rounded" disabled={disable}>
              Comprar
            </button>
          </div>

          <div className="bg-grey-10 rounded p-7 md:col-start-1 md:col-end-3">
            <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-8">
              Descrição
            </h6>
            <p className="text-base text-grey-2 font-400 font-inter leading-7">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
              ducimus expedita est adipisci unde, doloremque culpa obcaecati,
              animi molestiae cumque soluta harum? Unde nulla quos libero
              aliquam doloremque suscipit a.
            </p>
          </div>

          <div className="bg-grey-10 rounded p-7 md:row-start-1 md:col-start-3">
            <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-8">
              Fotos
            </h6>
            <ul className="grid grid-cols-3 gap-x-[5.5px] gap-y-12">
              <li className="bg-grey-7 h-20 grid justify-center items-center rounded">
                <Image
                  width={90}
                  height={54}
                  src={carImage}
                  alt="Foto de um carro"
                />
              </li>
              <li className="bg-grey-7 h-20 grid justify-center items-center rounded">
                <Image
                  width={90}
                  height={54}
                  src={carImage}
                  alt="Foto de um carro"
                />
              </li>
              <li className="bg-grey-7 h-20 grid justify-center items-center rounded">
                <Image
                  width={90}
                  height={54}
                  src={carImage}
                  alt="Foto de um carro"
                />
              </li>
              <li className="bg-grey-7 h-20 grid justify-center items-center rounded">
                <Image
                  width={90}
                  height={54}
                  src={carImage}
                  alt="Foto de um carro"
                />
              </li>
              <li className="bg-grey-7 h-20 grid justify-center items-center rounded">
                <Image
                  width={90}
                  height={54}
                  src={carImage}
                  alt="Foto de um carro"
                />
              </li>
              <li className="bg-grey-7 h-20 grid justify-center items-center rounded">
                <Image
                  width={90}
                  height={54}
                  src={carImage}
                  alt="Foto de um carro"
                />
              </li>
            </ul>
          </div>
          <div className="bg-grey-10 rounded p-7 grid justify-center md:row-start-2 md:col-start-3 md:row-span-2">
            <div className="flex flex-col items-center justify-center gap-7">
              <div
                className={`h-[77px] w-[77px] bg-brand-1 text-white text-[26px] font-500 font-inter rounded-full p-2 flex items-center justify-center`}
              >
                SL
              </div>
              <h6 className="text-heading6 text-grey-1 font-lexend font-600 mb-8">
                Samuel Leão
              </h6>
              <p className="text-base text-grey-2 font-400 font-inter leading-7 text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt ducimus expedita est adipisci unde, doloremque culpa
                obcaecati, animi molestiae cumque soluta harum? Unde nulla quos
                libero aliquam doloremque suscipit a.
              </p>
              <Link href={"/"} className="bg-grey-0 font-inter font-600 text-base text-white p-2 rounded">
                Ver todos anúncios
              </Link>
            </div>
          </div>
          <div className="bg-grey-10 rounded px-7 py-9 md:col-start-1 md:col-end-3">
            <CommentsList />
          </div>
          <div className="bg-grey-10 rounded p-7 grid gap-6 md:col-start-1 md:col-end-3">
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-1"
            />
            <form className="relative">
              <textarea
                name=""
                id=""
                className="w-full h-[128px] p-3 border-solid border-grey-7 border-[1.5px] rounded text-grey-3 font-inter font-400 focus:border-brand-2 focus:border-[1.5px] focus:outline-none"
                placeholder="Digitar comentário"
                disabled={disable}
              ></textarea>
              <button
                className="absolute bottom-6 right-4 btn-brand p-2 text-sm font-600 font-inter rounded"
                disabled={disable}
              >
                Comentar
              </button>
            </form>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-grey-7 text-grey-3 text-xs font-inter font-500 flex items-center px-3 py-1 rounded-3xl cursor-pointer">Gostei muito!</span>
              <span className="bg-grey-7 text-grey-3 text-xs font-inter font-500 px-3 py-1 flex items-center rounded-3xl cursor-pointer">Incrível</span>
              <span className="bg-grey-7 text-grey-3 text-xs font-inter font-500 px-3 py-1 flex items-center rounded-3xl cursor-pointer">Recomendarei para meus amigos!</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Announcement;
