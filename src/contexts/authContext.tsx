import {
  Dispatch,
  ReactNode,
  SetStateAction,
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
import { iUserComplete } from "@/interfaces/user.interfaces";
import { toast } from "react-toastify";

interface iProps {
  children: ReactNode;
}

interface AuthProviderData {
  login: (userData: LoginData) => void;
  token: string | undefined;
  user: iUserComplete;
  logout: () => void;
  loading: boolean;
  isLoggedIn:boolean
  setIsloggedIn: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export function AuthProvider({ children }: iProps) {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<iUserComplete>({} as iUserComplete);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const router: NextRouter = useRouter();

  const getUser = async (bearerToken: string) => {
    console.log(bearerToken)
    API.defaults.headers.common.authorization = `Bearer ${bearerToken}`;
    const response: AxiosResponse<any, any> = await API.get("/users");
    setUser(response.data);
  };

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

  const login = async (userData: LoginData) => {
    try {
      const response = await API.post("/login", userData);
      setCookie(null, "token", response.data.token, {
        maxAge: 86400,
        path: "/",
      });
      setToken(response.data.token);
      setIsloggedIn(true)
      await getUser(response.data.token);
      toast.success("Login realizado com sucesso")
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.error(error);
    }
  };

  const logout = () => {
    destroyCookie(null, "token");
    setToken("");
    window.location.assign("/");
  };

  return (
    <AuthContext.Provider value={{ login, token, user, logout, loading , isLoggedIn, setIsloggedIn}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
