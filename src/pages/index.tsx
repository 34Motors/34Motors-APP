import Header from "@/components/header";
import { Inter } from "next/font/google";
import coverImg from "../assets/img/cover-car.png";
import Image from "next/image";
import { ListCards } from "@/components/listCards";
import { useState } from "react";
import FiltroCategory from "@/components/filterCategory";
import { Pagination } from "@/components/pagination";
import { useCarsContext } from "@/contexts/carsContext";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const {cars} = useCarsContext()
  const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <section className="w-full h-[38.5rem] md:h-[33.5rem] bg-gradient-to-b from-[rgba(0,0,0,0.29)] to-black">
        <div className="relative h-full flex flex-col md:flex-row md:justify-center md:items-center">
          <Image
            src={coverImg}
            alt="Imagem de capa"
            className="h-full object-cover md:w-1/2 z-[-3]"
            fill={true}
          />
          <div className="w-full mt-[15%] px-7 flex flex-col items-center justify-center text-grey-10 md:mt-0">
            <h3 className="mb-5 text-heading3 font-lexend font-700 text-center md:text-heading1">
              Motors Shop
            </h3>
            <h5 className="text-heading5 font-lexend font-600 text-center md:text-heading2">
              A melhor plataforma de anúncios de carros do país
            </h5>
          </div>
        </div>
      </section>
      <main className="w-11/12 mx-auto my-12 px-5 grid grid-cols-1 md:grid-cols-4 md:px-4 md:gap-16">
        <ListCards currentPage={currentPage} cardsPerPage={12} />
        <FiltroCategory />
        <Pagination
          totalPages={Math.ceil(mockList.length / 12)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  );
}
