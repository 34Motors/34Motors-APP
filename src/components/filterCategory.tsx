import Image from "next/image";
import React, { useState } from "react";

interface FiltroCategoryProps {
  isMobile: boolean;
}

interface Category {
  id: number;
  nome: string;
  var: string[];
}

const listCategory: Category[] = [
  { id: 1, nome: "Ano", var: ["2000", "1997", "2003"] },
  { id: 2, nome: "Marca", var: ["2000", "1997", "2003"] },
  { id: 3, nome: "Cor", var: ["2000", "1997", "2003"] },
  { id: 4, nome: "Modelo", var: ["2000", "1997", "2003"] },
  { id: 4, nome: "Combustível", var: ["Gasolina", "Etanol", "Diesel"] },
  { id: 6, nome: "Preço", var: ["Mínimo", "Máximo"] },
  { id: 7, nome: "km", var: ["Mínimo", "Máximo"] },
];

const FiltroCategory: React.FC<FiltroCategoryProps> = ({ isMobile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderFilterContent = () => {
    if (isMobile) {
      return (
        <>
          <button
            onClick={handleToggleModal}
            className="w-full btn-big bg-brand-2 my-12"
          >
            Filtros
          </button>
          {isModalOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
                {listCategory.map((category) => (
                  <div key={category.id}>
                    <h4 className="my-3 font-lexend font-600 text-heading4 text-black">
                      {category.nome}
                    </h4>
                    {category.nome !== "km" && category.nome !== "Preço" ? (
                      <div className="overflow-y-auto space-y-1 ml-3">
                        <ul className="overflow-y-auto space-y-1 ml-3">
                          {category.var.map((categorySpecific) => (
                            <li key={categorySpecific}>
                              <button className="font-lexend font-500 text-heading6 text-grey-3">
                                {categorySpecific}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="w-4/5 flex">
                        {category.var.map((specificValue) => (
                          <input
                            key={specificValue}
                            type="text"
                            placeholder={specificValue}
                            className="w-2/5 font-lexend font-500 text-heading6 text-grey-3"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="text-center mt-4">
                  <button className="w-full btn-big bg-brand-2">
                    Ver Anúncios
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    } else {
      return (
        <div>
          {listCategory.map((category) => (
            <div key={category.id}>
              <h4 className="my-3 font-lexend font-600 text-heading4 text-black">{category.nome}</h4>
              {category.nome !== "km" && category.nome !== "Preço" ? (
                <ul>
                  {category.var.map((categorySpecific) => (
                    <li key={categorySpecific}>
                      <button className="font-lexend font-500 text-heading6 text-grey-3">
                        {categorySpecific}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="w-4/5 flex">
                  {category.var.map((specificValue) => (
                    <input
                      key={specificValue}
                      type="text"
                      placeholder={specificValue}
                      className="w-2/5 font-lexend font-500 text-heading6 text-grey-3"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="w-full btn-big bg-brand-2">Limpar Filtro</button>
        </div>
      );
    }
  };

  return <aside>{renderFilterContent()}</aside>;
};

export default FiltroCategory;
