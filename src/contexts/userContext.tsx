import { useRouter } from "next/router";
import { ReactNode, useContext, createContext } from "react";

interface Props {
  children: ReactNode;
}

interface iUserProvider {}

const UserContext = createContext<iUserProvider>({} as iUserProvider);

export function UserProvider({ children }: Props) {
  const router = useRouter();

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
