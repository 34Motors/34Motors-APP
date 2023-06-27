import { useRouter } from "next/router";
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { ICarsReturn, IFilterOption } from "@/interfaces/cars.interfaces";
import { API } from "@/services/apis";

interface Props {
  children: ReactNode;
}

interface iCarsProvider {
  cars: ICarsReturn[];
  listFilters: IFilterOption[];
  selectedFilters: string;
  setSelectedFilters: (value: string) => void;
  setLoadCars: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
}

const CarsContext = createContext<iCarsProvider>({} as iCarsProvider);

export function CarsProvider({ children }: Props) {
  const [cars, setCars] = useState([] as ICarsReturn[]);
  const [loadCars, setLoadCars] = useState(true);
  const [listFilters, setListFilters] = useState<IFilterOption[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { query } = router;

  const getAllCars = async () => {
    const responseCars = await API.get(`cars?${selectedFilters}`);
    setCars(responseCars.data.cars);
    setListFilters(responseCars.data.filterOptions);
    setLoadCars(false);
  };

  useEffect(() => {
    if (loadCars) {
      getAllCars();
    }
  }, [loadCars]);

  return (
    <CarsContext.Provider
      value={{
        cars,
        setIsModalOpen,
        isModalOpen,
        setLoadCars,
        listFilters,
        selectedFilters,
        setSelectedFilters,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}

export const useCarsContext = () => useContext(CarsContext);
