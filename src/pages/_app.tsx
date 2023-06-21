import { AuthProvider } from "@/contexts/authContext";
import { CarsProvider } from "@/contexts/carsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CarsProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CarsProvider>
  );
}
