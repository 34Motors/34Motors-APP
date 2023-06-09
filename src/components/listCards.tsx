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
    <div className="flex justify-center items-center md:items-center">
      <ul
        className={`w-full md:w-full flex overflow-x-auto gap-3 md:gap-12 md:justify-center md:self-center${
          isMobile ? "" : "flex flex-wrap"
        }`}
      >
        {currentCards.map((card, index) => (
          <li key={index} className="min-w-[312px] md:w-[40%] md:max-w-[312px]">
            {card}
          </li>
        ))}
      </ul>
    </div>
  );
};
