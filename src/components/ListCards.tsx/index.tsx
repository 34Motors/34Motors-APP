import React from "react";
import { ProductCard } from "../ProductCard";

interface ListCardsProps {
  listCardsData: React.ReactNode[];
  currentPage: number;
  cardsPerPage: number;
}

export const ListCards: React.FC<ListCardsProps> = ({
  listCardsData,
  currentPage,
  cardsPerPage,
}) => {
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = listCardsData.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <ul>
        {currentCards.map((card, index) => (
          <li key={index}>
            {card}
          </li>
        ))}
      </ul>
    </div>
  );
};