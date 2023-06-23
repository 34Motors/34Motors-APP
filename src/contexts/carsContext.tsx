import { useRouter } from "next/router";
import { ReactNode, useContext, createContext, useState } from "react";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import { API } from "@/services/apis";

interface Props {
  children: ReactNode;
}

interface iCarsProvider {
  cars: ICarsReturn[];
}

const CarsContext = createContext<iCarsProvider>({} as iCarsProvider);

export function CarsProvider({ children }: Props) {
  //const router = useRouter();
  const [cars, setCars] = useState([] as ICarsReturn[]);
  const [loadCars, setLoadCars] = useState(true);

  const getAllCars = async () => {
    const responseCars = await API.get("cars/");
    setCars(responseCars.data.cars);
    setLoadCars(false);
  };

  if (loadCars) {
    getAllCars();
    setLoadCars(false)
  }

  return (
    <CarsContext.Provider value={{ cars }}>{children}</CarsContext.Provider>
  );
}

export const useCarsContext = () => useContext(CarsContext);