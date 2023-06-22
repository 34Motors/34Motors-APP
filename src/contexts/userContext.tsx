import { API } from "@/services/apis";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactNode, useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import { useAuth } from "./authContext";
import { iUserBody } from "@/interfaces/user.interfaces";

interface Props {
  children: ReactNode;
}

interface iUserProvider {
  deleteUser: (passData: any) => void;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
  modalIsOpen: boolean
  registerUser: (data: iUserBody) => Promise<void>
}

const UserContext = createContext<iUserProvider>({} as iUserProvider);

export function UserProvider({ children }: Props) {
  const router = useRouter();
  const { logout } = useAuth();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const deleteUser = async (passData: any) => {
    const cookies = parseCookies();
    const token = cookies.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Password: `${passData.password}`,
    };

    try {
      await API.delete("/users", { headers });
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async(data: iUserBody) => {

    if(data.complement === "" ) {
        delete data.complement
    }
    
    if(data.description === "") {
        delete data.description
   }
    try {
        await API.post("/users", data)
        setModalIsOpen(true)
        
    } catch (error) {
        console.log(error)
    }
}

  return (
    <UserContext.Provider value={{ deleteUser, setModalIsOpen, modalIsOpen, registerUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
