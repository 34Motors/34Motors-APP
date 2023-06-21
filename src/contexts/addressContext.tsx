import { useRouter } from "next/router";
import { ReactNode, useContext, createContext, useState } from "react";
import { API } from "@/services/apis";
import { parseCookies } from "nookies";

interface Props {
  children: ReactNode;
}

interface iAddressProvider {
  updateAddress: (data: object) => void;
}

const AddressContext = createContext<iAddressProvider>({} as iAddressProvider);

export function AddressProvider({ children }: Props) {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const user = JSON.parse(cookies.user || "{}");
  const id = user.id || null;

  const updateAddress = async (data: object) => {
    console.log(data);
    console.log(token);
    console.log(id);
    try {
      const responseAddress = await API.patch(`/users/${id}/address`, {
        data,
        headers,
      });
      console.log(responseAddress);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AddressContext.Provider value={{ updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddressContext = () => useContext(AddressContext);
