import { ProductCard } from "./productCard";
import { useCarsContext } from "@/contexts/carsContext";

interface ListCardsProps {
  currentPage: number;
  cardsPerPage: number;
}
export const ListCards: React.FC<ListCardsProps> = ({
  currentPage,
  cardsPerPage,
}) => {
  const { cars } = useCarsContext();
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cars.slice(indexOfFirstCard, indexOfLastCard)
  const renderedCards = currentCards.map((car) => (
    <ProductCard key={car.id} car={car} />
  ));
  return (
    <ul className="flex items-start mt-4 gap-3 overflow-x-auto md:overflow-hidden md:grid homeList:grid-cols-2 xl:grid-cols-3 md:col-span-3 md:gap-12 xl:col-span-3">
        {renderedCards}
    </ul>
  );
};
