import Head from "next/head";
import Header from "@/components/header";
import coverImg from "../assets/img/cover-image2.jpg";
import Image from "next/image";
import { ListCards } from "@/components/listCards";
import { useState } from "react";
import FiltroCategory from "@/components/filterCategory";
import { Pagination } from "@/components/pagination";
import { useCarsContext } from "@/contexts/carsContext";
import Footer from "@/components/footer";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { cars } = useCarsContext();
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>34 Motors - Seu próximo carro está aqui</title>
        <meta
          name="description"
          content="34 Motors é uma aplicação feita em NextJS, como trabalho de conclusão do curso da Kenzie Academy Brasil."
        />
      </Head>
      <Header />
      <section className="w-full h-[38.5rem] md:h-[33.5rem] bg-gradient-to-b from-[rgba(0,0,0,0.29)] to-black">
        <div className="relative h-full flex flex-col md:flex-row md:justify-center md:items-center">
          <Image
            src={coverImg}
            alt="Imagem de capa"
            className="h-full object-cover object-center md:w-1/2 z-[-3]  "
            fill={true}
          />
          <div className="w-full mt-[15%] px-7 flex flex-col items-center justify-center text-grey-10 md:mt-0">
            <h3 className="mb-5 text-heading3 font-lexend font-700 text-center md:text-heading1">
              34 Motors
            </h3>
            <h5 className="text-heading5 font-lexend font-600 text-center md:text-heading2">
              Seu próximo carro está aqui!
            </h5>
          </div>
        </div>
      </section>
      <main className="w-11/12 mx-auto my-12 px-5 grid grid-cols-1 gap-y-6 md:grid-cols-2 tabletMin:grid-cols-4 tabletMin:px-4 tabletMin:gap-16">
        {cars.length ? (
          <>
            <ListCards currentPage={currentPage} cardsPerPage={12} />
            <FiltroCategory />
            <Pagination
              totalPages={Math.ceil(cars.length / 12)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="w-full col-span-4 col-start-2 row-span-4 row-start-3">
            <p className="text-3xl font-600 text-grey-1">
              Ainda não há anúncios cadastrados. Volte mais tarde!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
