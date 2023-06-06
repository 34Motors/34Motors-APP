import { useState } from "react";

interface FiltroCategoryProps {
  isMobile: boolean;
}

const FiltroCategory: React.FC<FiltroCategoryProps> = ({ isMobile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <button onClick={handleToggleModal}>Filtros</button>
          {isModalOpen && (
            <div>
              <h4>Ano</h4>
              <ul>
                <li>
                  <button>2000</button>
                </li>
                <li>
                  <button>1997</button>
                </li>
              </ul>
              <h4>Preço</h4>
              <ul>
                <li>
                  <button>2000</button>
                </li>
                <li>
                  <button>1997</button>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div>
          <h4>Ano</h4>
          <ul>
            <li>
              <button>2000</button>
            </li>
            <li>
              <button>1997</button>
            </li>
          </ul>
          <h4>Preço</h4>
          <ul>
            <li>
              <button>2000</button>
            </li>
            <li>
              <button>1997</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default FiltroCategory;
