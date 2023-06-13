import { api } from "@/api/api";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import { useRouter } from "next/router";
import { ReactNode, useContext, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface iCarsProvider {
  cars: ICarsReturn[];
}

const CarsContext = createContext<iCarsProvider>({} as iCarsProvider);

export function CarsProvider({ children }: Props) {
  const router = useRouter();
  const [cars, setCars] = useState([] as ICarsReturn[]);
  const [loadCars, setLoadCars] = useState(true);

  const getAllCars = async () => {
    const responseCars = await api.get("cars/");
    setCars(responseCars.data);
    setLoadCars(false);
  };

  if (loadCars) {
    getAllCars();
  }

  return (
    <CarsContext.Provider value={{ cars }}>{children}</CarsContext.Provider>
  );
}

export const useCarsContext = () => useContext(CarsContext);