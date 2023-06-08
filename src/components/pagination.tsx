import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <section className="w-auto mx-auto">
      <div className="flex space-x-3 justify-center">
        {currentPage > 1 && (
          <button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="text-brand-2 font-lexend font-600 text-heading5"
          >
            Anterior
          </button>
        )}
        <p className="font-lexend font-600 text-heading5 text-grey-3">
          {currentPage} <span className=" text-grey-4"> de {totalPages}</span>
        </p>

        {currentPage < totalPages && (
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="text-brand-2 font-lexend font-600 text-heading5"
          >
            Seguinte
          </button>
        )}
      </div>
    </section>
  );
};
