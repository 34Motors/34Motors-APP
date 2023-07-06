import { useCarsContext } from "@/contexts/carsContext";
import React, { useState } from "react";

interface ModalFiltroMobileProps {
  content: React.ReactNode;
}

export const ModalFiltroMobile = ({ content }: ModalFiltroMobileProps) => {
  const { setIsModalOpen, isModalOpen } = useCarsContext();
  
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="bg-white max-w-md p-8 overflow-y-auto w-full h-full">
            <header className="mt-12 flex justify-between">
              <p className="text-center  my-3 text-lexend font-500 text-heading7 text-grey-1 mb-4">
                Filtro
              </p>
              <button
                onClick={handleToggleModal}
                className="text-center font-500 text-lexend text-heading5 text-grey-4"
              >
                x
              </button>
            </header>
            {content}
            <div className="text-center mt-4">
              <button
                className="w-full mt-5 btn-big bg-brand-2 text-white"
                onClick={handleToggleModal}
              >
                Ver Anúncios
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
