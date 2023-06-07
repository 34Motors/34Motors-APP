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
    <section>
      <div>
        {currentPage > 1 && (
          <button disabled={currentPage === 1} onClick={handlePreviousPage}>
            Anterior
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Seguinte
          </button>
        )}
      </div>
    </section>
  );
};
