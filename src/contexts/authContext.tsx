import { ReactNode, createContext, useContext, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { API } from "@/services/apis";
import { LoginData } from "@/schemas/login/login.schema";

interface iUser {
  name: string;
}

interface iProps {
  children: ReactNode;
}

interface AuthProviderData {
  setToken: (value: string) => void;
  login: (userData: LoginData) => void;
  token: string | undefined;
  user: iUser | null;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export function AuthProvider({ children }: iProps) {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<iUser | null>(null);
  const router = useRouter();

  const login = (userData: LoginData) => {
    API.post("/login", userData)
      .then((response) => {
        setCookie(null, "token", response.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        setToken(response.data.token);
        const userToCookie = JSON.stringify(response.data.user)
        setCookie(null, "user", userToCookie, {
          maxAge: 60 * 30,
          path: "/",
        });
        setUser(response.data.user);
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AuthContext.Provider value={{ login, token, user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
