import { AddressProvider } from "@/contexts/addressContext";
import { AuthProvider } from "@/contexts/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AddressProvider>
        <Component {...pageProps} />
      </AddressProvider>
    </AuthProvider>
  );
}
