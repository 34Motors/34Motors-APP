import { LoginData, loginSchema } from "@/schemas/login/login.schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";
import { DefaultFieldset } from "./defaultFieldset";
import { Inter, Lexend } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const LoginForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<LoginData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = (formdata: LoginData) => {
    login(formdata);
  };

  return (
    <div className={`bg-grey-10 rounded py-11 px-12 max-w-[412px] w-full`}>
      <h2 className={`${lexend.className} mb-8 text-heading5 font-500`}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-6 w-full relative`}>
        <DefaultFieldset
          label={"Usuário"}
          id={"email"}
          inputProps={{
            placeholder: "Digitar o usuário",
            ...register("email"),
          }
        }
        />
        {errors.email?.message && <small className="text-alert-1 my-[-22px]">{errors.email.message}</small>}
        <DefaultFieldset
          label={"Senha"}
          id={"password"}
          inputProps={{
            type: "password",
            placeholder: "Digitar senha",
            ...register("password"),
          }}
        />
        {errors.password?.message && <small className="text-alert-1 my-[-22px]">{errors.password.message}</small>}
        <Link href={"/resetPassword"} className="text-right">Esqueci minha senha</Link>
        <button type="submit" className={`btn-brand bg-brand-1 py-3 px-5 rounded text-body2 font-600 ${inter.className} w-full`}>Entrar</button>
        <small className={`text-center text-body2 font-400 ${inter.className}`}>Ainda não possui conta?</small>
        <Link href={"/register"} className="text-center border btn-outline-2 py-3 px-5 rounded">Cadastrar</Link>
      </form>
    </div>
  );
};

export default LoginForm;
