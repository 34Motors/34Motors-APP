import React from "react";

interface ListCardsProps {
  listCardsData: React.ReactNode[];
  currentPage: number;
  cardsPerPage: number;
  isMobile: boolean;
}

export const ListCards: React.FC<ListCardsProps> = ({
  listCardsData,
  currentPage,
  cardsPerPage,
  isMobile,
}) => {
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = listCardsData.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="flex justify-center md:items-center">
      <ul
        className={`md:w-full flex overflow-x-auto gap-3 md:justify-between ${
          isMobile
            ? ""
            : "flex flex-wrap"
        }`}
      >
        {currentCards.map((card, index) => (
          <li key={index}>{card}</li>
        ))}
      </ul>
    </div>
  );
};
