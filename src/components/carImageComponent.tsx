import { CarImage } from "@/interfaces/cars.interfaces";
import Image from "next/image";

const CarImageComponent = ({ carImage }: { carImage: CarImage }) => {
  return (
    <li
      key={carImage.id}
      className="bg-grey-7 h-20 grid justify-center items-center rounded cursor-pointer"
    >
      <Image
        width={90}
        height={54}
        src={carImage.imageUrl}
        alt="Foto de um carro"
        className="object-cover h-full w-full mix-blend-multiply rounded"
      />
    </li>
  );
};

export { CarImageComponent };
