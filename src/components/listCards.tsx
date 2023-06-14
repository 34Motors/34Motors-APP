import carImage from "../assets/img/MaseratiExample.png";
import Image from "next/image";
import { ProductCard } from "./productCard";
import { useCarsContext } from "@/contexts/carsContext";
import { UserBadge } from "./userBadge";
import { CardDetail } from "./cardDetail";
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
  //const currentCards = cars.slice(indexOfFirstCard, indexOfLastCard)
  /*const renderedCards = currentCards.map((car) => (
    <ProductCard key={car.id} car={car} />
  ));*/
  return (
    <ul className="flex items-center gap-3 overflow-x-auto md:overflow-hidden md:grid md:grid-cols-2 xl:grid-cols-3 md:col-span-3 md:gap-12 md:col-start-2">
        {/* MOCK */}
        <div className="min-w-[312px] flex flex-col gap-4 md:grid md:col-span-1">
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              width={262}
              height={150}
              src={carImage}
              alt="Foto de um carro"
              className="w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-lexend font-600 text-heading7 text-grey-1">
              Maserati - Ghibli
            </h6>
            <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, quas delectusss luptates debitis doloremque distinctio
              provident vero accusantium, ut, impedit deserunt sint dicta rerum
              voluptatum, recusandae sit perspiciatis mollitia dolorem.
            </p>
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-2"
            />
            <div className=" flex justify-between items-center">
              <div className="flex gap-3">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-base text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[312px] flex flex-col gap-4">
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              width={262}
              height={150}
              src={carImage}
              alt="Foto de um carro"
              className="w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-lexend font-600 text-heading7 text-grey-1">
              Maserati - Ghibli
            </h6>
            <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, quas delectusss luptates debitis doloremque distinctio
              provident vero accusantium, ut, impedit deserunt sint dicta rerum
              voluptatum, recusandae sit perspiciatis mollitia dolorem.
            </p>
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-2"
            />
            <div className=" flex justify-between items-center">
              <div className="flex gap-3">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-base text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[312px] flex flex-col gap-4">
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              width={262}
              height={150}
              src={carImage}
              alt="Foto de um carro"
              className="w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-lexend font-600 text-heading7 text-grey-1">
              Maserati - Ghibli
            </h6>
            <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, quas delectusss luptates debitis doloremque distinctio
              provident vero accusantium, ut, impedit deserunt sint dicta rerum
              voluptatum, recusandae sit perspiciatis mollitia dolorem.
            </p>
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-2"
            />
            <div className=" flex justify-between items-center">
              <div className="flex gap-3">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-base text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[312px] flex flex-col gap-4">
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              width={262}
              height={150}
              src={carImage}
              alt="Foto de um carro"
              className="w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-lexend font-600 text-heading7 text-grey-1">
              Maserati - Ghibli
            </h6>
            <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, quas delectusss luptates debitis doloremque distinctio
              provident vero accusantium, ut, impedit deserunt sint dicta rerum
              voluptatum, recusandae sit perspiciatis mollitia dolorem.
            </p>
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-2"
            />
            <div className=" flex justify-between items-center">
              <div className="flex gap-3">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-base text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[312px] flex flex-col gap-4">
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              width={262}
              height={150}
              src={carImage}
              alt="Foto de um carro"
              className="w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-lexend font-600 text-heading7 text-grey-1">
              Maserati - Ghibli
            </h6>
            <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, quas delectusss luptates debitis doloremque distinctio
              provident vero accusantium, ut, impedit deserunt sint dicta rerum
              voluptatum, recusandae sit perspiciatis mollitia dolorem.
            </p>
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-2"
            />
            <div className=" flex justify-between items-center">
              <div className="flex gap-3">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-base text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[312px] flex flex-col gap-4">
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              width={262}
              height={150}
              src={carImage}
              alt="Foto de um carro"
              className="w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-lexend font-600 text-heading7 text-grey-1">
              Maserati - Ghibli
            </h6>
            <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, quas delectusss luptates debitis doloremque distinctio
              provident vero accusantium, ut, impedit deserunt sint dicta rerum
              voluptatum, recusandae sit perspiciatis mollitia dolorem.
            </p>
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-2"
            />
            <div className=" flex justify-between items-center">
              <div className="flex gap-3">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-base text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[312px] flex flex-col gap-4">
          <div className="w-full flex items-center justify-center bg-gray-200">
            <Image
              width={262}
              height={150}
              src={carImage}
              alt="Foto de um carro"
              className="w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-lexend font-600 text-heading7 text-grey-1">
              Maserati - Ghibli
            </h6>
            <p className=" h-12 text-sm overflow-hidden text-ellipsis text-grey-2 leading-6 font-inter font-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, quas delectusss luptates debitis doloremque distinctio
              provident vero accusantium, ut, impedit deserunt sint dicta rerum
              voluptatum, recusandae sit perspiciatis mollitia dolorem.
            </p>
            <UserBadge
              bg_color="bg-brand-1"
              initials_color="text-white"
              name_color="grey-2"
            />
            <div className=" flex justify-between items-center">
              <div className="flex gap-3">
                <CardDetail text="0 KM" />
                <CardDetail text="2019" />
              </div>
              <p className="text-base text-grey-1 font-500 font-lexend">
                R$ 00.000,00
              </p>
            </div>
          </div>
        </div>
    </ul>
  );
};
