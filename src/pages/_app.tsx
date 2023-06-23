import { AuthProvider } from "@/contexts/authContext";
import { CarsProvider } from "@/contexts/carsContext";
import { UserProvider } from "@/contexts/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CarsProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </CarsProvider>
    </AuthProvider>
  );
}
