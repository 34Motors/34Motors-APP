import React, { useEffect, useState } from "react";
import Image from "next/image";
import FiltroCategory from "@/components/FilterCategory";
import Footer from "@/components/footer";
import { ListCards } from "@/components/ListCards.tsx";
import Header from "@/components/header";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import coverImg from "../../src/assets/img/cover-car.png";

const listCardsData = Array.from({ length: 15 }, (_, index) => (
  <ProductCard key={index + 1} />
));

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
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
      <section className="w-full h-" style={{ width: "100%", height: "36rem" }}>
        <div className="relative h-full">
          <Image
            src={coverImg}
            alt="Imagem de capa"
            className="h-full w- object-contain absolute inset-0 z-[-3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.29)] to-black flex flex-col items-center justify-center text-white">
            <h3 className="text-heading3 font-lexend font-700 text-center">
              Motors Shop
            </h3>
            <h5 className="text-heading5 font-lexend font-600 text-center">
              A melhor plataforma de anúncios de carros do país
            </h5>
          </div>
        </div>
      </section>
      <main className="w-full mx-auto my-12 px-5">
        <ListCards
          listCardsData={listCardsData}
          currentPage={currentPage}
          cardsPerPage={cardsPerPage}
        />
        <FiltroCategory isMobile={isMobile} />
        <Pagination
          totalPages={Math.ceil(listCardsData.length / cardsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
