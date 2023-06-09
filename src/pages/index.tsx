import React, { useEffect, useState } from "react";
import Image from "next/image";
import FiltroCategory from "@/components/filterCategory";
import Footer from "@/components/footer";
import { ListCards } from "@/components/listCards";
import Header from "@/components/header";
import { Pagination } from "@/components/pagination";
import coverImg from "../../src/assets/img/cover-car.png";
import { ProductCard } from "@/components/productCard";

const listCardsData = Array.from({ length: 15 }, (_, index) => (
  <ProductCard key={index + 1} />
));

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
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
      <main className="w-full md:px-4 mx-auto my-12 px-5">
        {!isMobile && (
          <div className="grid grid-cols-4 gap-8">
            <div className="col-start-1 row-span-1">
              <FiltroCategory isMobile={isMobile} />
            </div>
              <div className="col-span-3 w-full flex flex-col">
                <ListCards
                  listCardsData={listCardsData}
                  currentPage={currentPage}
                  cardsPerPage={cardsPerPage}
                  isMobile={isMobile}
                />
              </div>
            <div className="col-span-4">
              <Pagination
                totalPages={Math.ceil(listCardsData.length / cardsPerPage)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
        {isMobile && (
          <>
            <div className="flex flex-col">
              <ListCards
                listCardsData={listCardsData}
                currentPage={currentPage}
                cardsPerPage={cardsPerPage}
                isMobile={isMobile}
              />
              <FiltroCategory isMobile={isMobile} />
              <Pagination
                totalPages={Math.ceil(listCardsData.length / cardsPerPage)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
