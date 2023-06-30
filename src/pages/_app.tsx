import { AuthProvider } from "@/contexts/authContext";
import { CarsProvider } from "@/contexts/carsContext";
import { UserProvider } from "@/contexts/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
export default function App({ Component, pageProps }: AppProps) {
  const AppComponent = Component as any;
  
  return (
      <AuthProvider>
        <CarsProvider>
          <UserProvider>
            <ToastContainer
              autoClose={1500}
            />
            <AppComponent {...pageProps} />
          </UserProvider>
        </CarsProvider>
      </AuthProvider>
  );
}
