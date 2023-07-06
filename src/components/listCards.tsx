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
    <ul className="pb-10 pr-4 w-full flex items-start mt-4 gap-3 sm:gap-x-4 lg:gap-x-14 overflow-x-auto md:overflow-hidden md:grid md:grid-rows-3 md:gap-y-14 h-full homeList:grid-cols-2 xl:grid-cols-3 md:col-span-3 xl:col-span-3">
        {renderedCards}
    </ul>
  );
};
