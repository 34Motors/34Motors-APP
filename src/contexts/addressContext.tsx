import { useRouter } from "next/router";
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { API } from "@/services/apis";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";

interface Props {
  children: ReactNode;
}

interface iAddressUser {
  city: string;
  street: string;
  number: string;
  cep: string;
  state: string;
  complement: string;
}

interface iAddressProvider {
  updateAddress: (data: object) => void;
  addressUser: iAddressUser | null;
  setAddressUser: (data: iAddressUser) => void | null;
}

const AddressContext = createContext<iAddressProvider>({} as iAddressProvider);

export function AddressProvider({ children }: Props) {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const [addressUser, setAddressUser] = useState<iAddressUser | null>(null);
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const user = JSON.parse(cookies.user || "{}");
  const id = user.id || null;

  useEffect(() => {
    const getAddress = async () => {
      try {
        const responseAddress = await API.get(`/users/${id}`, headers);
        setAddressUser(responseAddress.data.address);
      } catch (error) {
        throw new Error("Ops! Algo está errado");
      }
    };
    getAddress();
  }, []);

  const updateAddress = async (data: object) => {
    try {
      const responseAddress = await API.patch(
        `/users/${id}/address`,
        data,
        headers
      );
      if (responseAddress.status === 200) {
        setAddressUser(responseAddress.data);
      }
      console.log(responseAddress);
      
    } catch (error) {
      throw new Error("Ops! Algo está errado");
    }
  };

  return (
    <AddressContext.Provider value={{ updateAddress, addressUser, setAddressUser }}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddressContext = () => useContext(AddressContext);
