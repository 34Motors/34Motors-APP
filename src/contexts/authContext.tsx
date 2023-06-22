import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { NextRouter, useRouter } from "next/router";
import { API } from "@/services/apis";
import { LoginData } from "@/schemas/login/login.schema";
import { AxiosResponse } from "axios";

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
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export function AuthProvider({ children }: iProps) {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<iUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router: NextRouter = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      const cookies: { [key: string]: string } = parseCookies();
      const token: string = cookies.token;

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response: AxiosResponse<any, any> = await API.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
      API.defaults.headers.common.authorization = `Bearer ${token}`;
      setLoading(false);
    };
    validateUser();
  }, []);

  const login = (userData: LoginData) => {
    API.post("/login", userData)
      .then((response) => {
        setCookie(null, "token", response.data.token, {
          maxAge: 86400,
          path: "/",
        });
        setToken(response.data.token);
        const userToCookie = JSON.stringify(response.data.user);
        setCookie(null, "user", userToCookie, {
          maxAge: 86400,
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

  const logout = () => {
    setUser(null);
    destroyCookie(null, "token");
    destroyCookie(null, "user");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{ login, token, user, setToken, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
