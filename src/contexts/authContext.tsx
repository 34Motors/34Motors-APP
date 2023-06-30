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
import { set } from "lodash";
import { LoadingScreen } from "@/components/loadingScreen";

interface iProps {
  children: ReactNode;
}

interface AuthProviderData {
  login: (userData: LoginData) => void;
  token: string | undefined;
  user: iUserComplete;
  logout: () => void;
  loading: boolean;
  isLoggedIn: boolean;
  setIsloggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export function AuthProvider({ children }: iProps) {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<iUserComplete>({} as iUserComplete);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const router: NextRouter = useRouter();

  const getUser = async (bearerToken: string) => {
    API.defaults.headers.common.authorization = `Bearer ${bearerToken}`;
    try {
      const response: AxiosResponse<any, any> = await API.get("/users");
      setUser(response.data);
      setLoading(false);
    } catch (error: any) {
      if (error.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    const validateUser = async () => {
      const cookies: { [key: string]: string } = parseCookies();
      const cookieToken: string = cookies.token;

      if (!cookieToken) {
        setLoading(false);
        return;
      }

      setToken(cookieToken);
      await getUser(cookieToken);
    };
    validateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (userData: LoginData) => {
    try {
      const response = await API.post("/login", userData);
      setCookie(null, "token", response.data.token, {
        maxAge: 86400,
        path: "/",
      });
      setToken(response.data.token);
      setIsloggedIn(true);
      await getUser(response.data.token);
      toast.success("Login realizado com sucesso");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  function logout() {
    setLoading(true);
    destroyCookie(null, "token");
    setToken("");
    setUser({} as iUserComplete);
    setIsloggedIn(false);
    router.push("/login");
    setLoading(false);
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{ login, token, user, logout, loading, isLoggedIn, setIsloggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
