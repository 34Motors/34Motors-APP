import { useRouter } from "next/router";
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { ICarsReturn, IFilterOption } from "@/interfaces/cars.interfaces";
import { API } from "@/services/apis";
import { useAuth } from "./authContext";
import { commentReturn } from "@/interfaces/comment.interfaces";

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
  getSellerAnnouncements: (sellerId: number) => void;
  sellerAnnouncements: ICarsReturn[];
  getAllCars: () => void;
  getAllComments: (id: string) => Promise<void>;
  comments: commentReturn[];
  setComments: Dispatch<
    SetStateAction<
      {
        description: string;
        id: number;
        carId: number;
        userId: number;
        user: {
          id: number;
          name: string;
          userColor: string;
        };
        postDate: Date;
      }[]
    >
  >;
  reloadComments: (carId: Number) => Promise<void>;
}

const CarsContext = createContext<iCarsProvider>({} as iCarsProvider);

export function CarsProvider({ children }: Props) {
  const [cars, setCars] = useState([] as ICarsReturn[]);
  const [sellerAnnouncements, setSellerAnnouncements] = useState(
    [] as ICarsReturn[]
  );
  const [loadCars, setLoadCars] = useState(true);
  const [comments, setComments] = useState([] as commentReturn[]);
  const [listFilters, setListFilters] = useState<IFilterOption[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleErrors } = useAuth();

  const getAllCars = async () => {
    try {
      const responseCars = await API.get(`cars?${selectedFilters}`);
      setCars(responseCars.data.cars);
      setListFilters(responseCars.data.filterOptions);
      setLoadCars(false);
    } catch (error) {
      handleErrors(error);
      setLoadCars(false);
    }
  };

  async function getSellerAnnouncements(sellerId: number) {
    try {
      const response = await API.get(`cars/seller/${sellerId}`);
      const sellerAnnouncements = response.data;
      setSellerAnnouncements(sellerAnnouncements);
    } catch (error) {
      handleErrors(error);
    }
  }
        
  const getAllComments = async (id: string) => {
    try {
      const comment = await API.get(`/comments/${id}`);
      setComments(comment.data);
    } catch (error) {
      handleErrors(error);
    }
  };

  const reloadComments = async (carId: Number) => {
    const newcommentsList = await API.get(`/comments/${carId}`);

    setComments(newcommentsList.data);
  };

  useEffect(() => {
    if (loadCars) {
      getAllCars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadCars]);

  return (
    <CarsContext.Provider
      value={{
        cars,
        setIsModalOpen,
        isModalOpen,
        setLoadCars,
        listFilters,
        getSellerAnnouncements,
        sellerAnnouncements,
        selectedFilters,
        setSelectedFilters,
        getAllCars,
        getAllComments,
        comments,
        reloadComments,
        setComments
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}

export const useCarsContext = () => useContext(CarsContext);
