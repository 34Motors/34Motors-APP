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
  { id: 2, nome: "Ano", var: ["2000", "1997", "2003"] },
  { id: 3, nome: "Ano", var: ["2000", "1997", "2003"] },
  { id: 4, nome: "Ano", var: ["2000", "1997", "2003"] },
  { id: 5, nome: "Preço", var: ["Mínimo", "Máximo"] },
  { id: 6, nome: "km", var: ["Mínimo", "Máximo"] },
];

const FiltroCategory: React.FC<FiltroCategoryProps> = ({ isMobile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <aside>
      {isMobile ? (
        <>
          <button onClick={handleToggleModal}>Filtros</button>
          {isModalOpen && (
            <div>
              {listCategory.map((category) => (
                <div key={category.id}>
                  <h3>{category.nome}</h3>
                  <ul>
                    {category.var.map((item) => (
                      <li key={item}>
                        <button>
                          <h6>{item}</h6>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          {listCategory.map((category) => (
            <div key={category.id}>
              <h4>{category.nome}</h4>
              <ul>
                {category.var.map((item) => (
                  <li key={item}>
                    <button>{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default FiltroCategory;
