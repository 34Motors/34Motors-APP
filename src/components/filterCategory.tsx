import React, { useRef } from "react";
import { useCarsContext } from "@/contexts/carsContext";
import { debounce } from "lodash";
import { ModalFiltroMobile } from "./Modals/ModalFilterMobile";

const FiltroCategory = () => {
  const {
    listFilters,
    setIsModalOpen,
    isModalOpen,
    setLoadCars,
    selectedFilters,
    setSelectedFilters,
  } = useCarsContext();

  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);
  const minQuilometersRef = useRef<HTMLInputElement>(null);
  const maxQuilometersRef = useRef<HTMLInputElement>(null);

  const hasPrice = listFilters?.some((filter) =>
    filter.hasOwnProperty("price")
  );
  const hasQuilometers = listFilters?.some((filter) =>
    filter.hasOwnProperty("quilometers")
  );

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const delayedFilterUpdate = debounce((category: string, value: string) => {
    handleFilterCars(category, value);
  }, 600);

  const handleFilterCars = (category: string, value: string) => {
    const existingFilters = selectedFilters ? selectedFilters.split("&") : [];
    const updatedFilters = existingFilters.filter(
      (filter) => !filter.startsWith(category)
    );

    if (value) {
      updatedFilters.push(`${category}=${value}`);
    }

    const concatenatedFilters = updatedFilters.join("&");

    setSelectedFilters(concatenatedFilters);
    setLoadCars(true);
  };

  const handleClearFilters = () => {
    setSelectedFilters("");
    setLoadCars(true);

    if (minPriceRef.current && maxPriceRef.current) {
      minPriceRef.current.value = "";
      maxPriceRef.current.value = "";
    }

    if (minQuilometersRef.current && maxQuilometersRef.current) {
      minQuilometersRef.current.value = "";
      maxQuilometersRef.current.value = "";
    }
  };

  const contentFilter = (
    <div className="tabletMax:hidden">
      {listFilters?.map((filter: any, index) => {
        const category = Object.keys(filter)[0];
        let translatedCategory = "";

        if (category === "brand") {
          translatedCategory = "Marca";
        } else if (category === "model") {
          translatedCategory = "Modelo";
        } else if (category === "year") {
          translatedCategory = "Ano";
        } else if (category === "color") {
          translatedCategory = "Color";
        } else if (category === "fuelType") {
          translatedCategory = "Combustível";
        } else if (category === "price" && hasPrice) {
          translatedCategory = "Preço";
        } else if (category === "quilometers" && hasQuilometers) {
          translatedCategory = "Km";
        }

        if (
          translatedCategory !== "Km" &&
          translatedCategory !== "Preço"
        ) {
          return (
            <div key={index}>
              <h4 className="my-3 font-lexend font-600 text-heading4 text-black">
                {translatedCategory}
              </h4>
              <div className="overflow-y-auto space-y-1 ml-3">
                <ul className="overflow-y-auto space-y-1 ml-3">
                  {Object.values(filter[category]).map(
                    (categorySpecific: any, i) => (
                      <li key={i}>
                        <button
                          className="font-lexend font-500 text-heading6 text-grey-3"
                          onClick={() =>
                            handleFilterCars(category, categorySpecific)
                          }
                        >
                          {categorySpecific}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          );
        }

        if (category === "price" && hasPrice) {
          return (
            <div key={index}>
              <h4 className="my-3 font-lexend font-600 text-heading4 text-black">
                Preço
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <input
                  ref={minPriceRef}
                  type="text"
                  placeholder="Mínimo"
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                  onChange={(e) =>
                    delayedFilterUpdate("minPrice", e.target.value)
                  }
                />
                <input
                  ref={maxPriceRef}
                  type="text"
                  placeholder="Máximo"
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                  onChange={(e) =>
                    delayedFilterUpdate("maxPrice", e.target.value)
                  }
                />
              </div>
            </div>
          );
        }

        if (category === "quilometers" && hasQuilometers) {
          return (
            <div key={index}>
              <h4 className="my-3 font-lexend font-600 text-heading4 text-black">
                Km
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <input
                  ref={minQuilometersRef}
                  type="text"
                  placeholder="Mínimo"
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                  onChange={(e) =>
                    delayedFilterUpdate("minQuilometers", e.target.value)
                  }
                />
                <input
                  type="text"
                  ref={maxQuilometersRef}
                  placeholder="Máximo"
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                  onChange={(e) =>
                    delayedFilterUpdate("maxQuilometers", e.target.value)
                  }
                />
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );

  return (
    <aside className="min-w-[200px] tabletMax:col-span-4 tabletMax:row-start-2 tabletMin:row-start-1">
      <div className="w-full flex justify-center tabletMin:hidden">
        <button
          onClick={() => {
            handleToggleModal();
            handleClearFilters();
          }}
          className="w-full max-w-[279px] btn-big bg-brand-2 text-white my-12 rounded"
        >
          Filtros
        </button>
        {isModalOpen && <ModalFiltroMobile content={contentFilter} />}
      </div>
      <div className="tabletMax:hidden">
        {contentFilter}
        <div className="w-full flex items-center mt-10">
          <button
            className="w-full max-w-[279px] mx-auto btn-big bg-brand-2 text-white rounded"
            onClick={handleClearFilters}
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FiltroCategory;
