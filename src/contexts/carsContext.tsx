import { useRouter } from "next/router";
import { ReactNode, useContext, createContext } from "react";

interface Props {
  children: ReactNode;
}

interface iCarsProvider {}

const CarsContext = createContext<iCarsProvider>({} as iCarsProvider);

export function CarsProvider({ children }: Props) {
  const router = useRouter();

  return <CarsContext.Provider value={{}}>{children}</CarsContext.Provider>;
}

export const useCarsContext = () => useContext(CarsContext);
