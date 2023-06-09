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
    <div className="flex justify-center">
      <ul
        className={`flex overflow-x-auto justify-between gap-3 ${
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
