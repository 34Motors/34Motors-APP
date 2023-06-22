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
  console.log(cars)
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cars.slice(indexOfFirstCard, indexOfLastCard)
  const renderedCards = currentCards.map((car) => (
    <ProductCard key={car.id} car={car} />
  ));
  return (
    <ul className="flex items-center gap-3 overflow-x-auto md:overflow-hidden md:grid md:grid-cols-2 xl:grid-cols-3 md:col-span-3 md:gap-12 md:col-start-2 md:items-start">
        {renderedCards}
    </ul>
  );
};
