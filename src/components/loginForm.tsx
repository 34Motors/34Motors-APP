import { LoginData, loginSchema } from "@/schemas/login/login.schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";
import { DefaultFieldset } from "./defaultFieldset";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = (formdata: LoginData) => {
    login(formdata);
    console.log(formdata);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DefaultFieldset
          label={"Usuário"}
          id={"email"}
          inputProps={{
            placeholder: "Digitar o usuário",
            ...register("email"),
          }}
        />
        <DefaultFieldset
          label={"Senha"}
          id={"password"}
          inputProps={{
            placeholder: "Digitar senha",
            ...register("password"),
          }}
        />
        <Link href={""}>Esqueci minha senha</Link>
        <button type="submit">Entrar</button>
        <small>Ainda não possui conta?</small>
        <Link href={"/register"}>Cadastrar</Link>
      </form>
    </div>
  );
};

export default LoginForm;
