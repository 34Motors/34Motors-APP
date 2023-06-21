import { API } from "@/services/apis";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ReactNode, useContext, createContext } from "react";
import { useAuth } from "./authContext";

interface Props {
  children: ReactNode;
}

interface iUserProvider {
  deleteUser: (passData: any) => void;
}

const UserContext = createContext<iUserProvider>({} as iUserProvider);

export function UserProvider({ children }: Props) {
  const router = useRouter();
  const { logout } = useAuth();

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

  return (
    <UserContext.Provider value={{ deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
