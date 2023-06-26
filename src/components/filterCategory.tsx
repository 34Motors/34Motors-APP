import React from "react";
import { useCarsContext } from "@/contexts/carsContext";
import { capitalizeFirstLetter } from "@/utils/formatingFunctions";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const hasPrice = listFilters?.some((filter) => filter.hasOwnProperty("price"));
  const hasQuilometers = listFilters?.some((filter) =>
    filter.hasOwnProperty("quilometers")
  );

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const delayedFilterUpdate = debounce((category: string, value: string) => {
    handleFilterCars(category, value);
  }, 500);

  const handleFilterCars = (category: string, value: string) => {
    const existingFilters = selectedFilters ? selectedFilters.split("&") : [];
    const updatedFilters = existingFilters.filter(
      (filter) => !filter.startsWith(category)
    );

    if (value) {
      updatedFilters.push(`${category}=${value}`);
    }

    const concatenatedFilters = updatedFilters.join("&");
    console.log(concatenatedFilters);

    setSelectedFilters(concatenatedFilters);
    setLoadCars(true);
  };

  const handleClearFilters = () => {
    setSelectedFilters("");
    setLoadCars(true);
  };
    
  const contentFilter = (
    <>
      {listFilters?.map((filter: any, index) => {
        const category = Object.keys(filter)[0];
        const { min, max } = filter[category];

        if (category !== "quilometers" && category !== "price") {
          return (
            <div key={index}>
              <h4 className="my-3 font-lexend font-600 text-heading4 text-black">
                {t(capitalizeFirstLetter(category))}
              </h4>
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
          );
        }

        if (category === "price" && hasPrice) {
          return (
            <div key={index}>
              <h4 className="my-3 font-lexend font-600 text-heading4 text-black">
                {t(capitalizeFirstLetter(category))}
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Mínimo"
                  defaultValue={min}
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                  onChange={(e) =>
                    delayedFilterUpdate(category, e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Máximo"
                  defaultValue={max}
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                  onChange={(e) =>
                    delayedFilterUpdate(category, e.target.value)
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
                {t(capitalizeFirstLetter(category))}
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Mínimo"
                  defaultValue={min}
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                />
                <input
                  type="text"
                  placeholder="Máximo"
                  defaultValue={max}
                  className="font-lexend font-500 text-heading6 text-grey-3 btn-negative text-center"
                />
              </div>
            </div>
          );
        }

        return null;
      })}
    </>
  );

  return (
    <aside className="col-span-4 md:row-start-1 md:col-span-1">
      <div className="w-full flex justify-center md:hidden">
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
      <div className="sm:hidden">
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
