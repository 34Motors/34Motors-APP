import { AuthProvider } from "@/contexts/authContext";
import { CarsProvider } from "@/contexts/carsContext";
import { UserProvider } from "@/contexts/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <CarsProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </CarsProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}
