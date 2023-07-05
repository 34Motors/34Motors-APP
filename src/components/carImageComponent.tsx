import { CarImage } from "@/interfaces/cars.interfaces";
import Image from "next/image";

interface CarImageComponentProps {
  carImage: CarImage;
  callback: (e:any) => void;
  id: string;
}

const CarImageComponent = ({
  carImage,
  callback,
  id
}: CarImageComponentProps) => {
  return (
    <li
      key={carImage.id}
      className="bg-grey-7 h-20 grid justify-center items-center rounded cursor-pointer"
      onClick={callback}
      id={id}
    >
      <Image
        width={500}
        height={500}
        src={carImage.imageUrl}
        alt="Foto de um carro"
        id={id}
        className="object-cover min-h-full min-w-full mix-blend-multiply rounded"
      />
    </li>
  );
};

export { CarImageComponent };
