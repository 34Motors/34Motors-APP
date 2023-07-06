import { DefaultFieldset } from "@/components/defaultFieldset";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { API } from "@/services/apis";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface iRecoverPassword {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { register, handleSubmit } = useForm<iRecoverPassword>({});

  const router = useRouter();
  const { token } = router.query;

  const submit = async (data: iRecoverPassword) => {
    try {
      await API.patch("/users/recover/" + token, data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <Header />
      <div className={` bg-grey-10 rounded py-11 px-12 max-w-[412px] w-full`}>
        <h2 className={`mb-8 text-heading5 font-500`}>Recuperação de senha</h2>
        <form
          className={`flex flex-col gap-6 w-full relative`}
          onSubmit={handleSubmit(submit)}
        >
          <DefaultFieldset
            label={"Digite uma nova senha"}
            id={"password"}
            inputProps={{
              placeholder: "Digite uma nova senha",
              ...register("password"),
              type: "password"
            }}
          />
          <DefaultFieldset
            label={"Confirmação da nova senha"}
            id={"confirmPassword"}
            inputProps={{
              placeholder: "Confirme a nova senha",
              ...register("confirmPassword"),
              type: "password"
            }}
          />

          <button
            type="submit"
            className={`btn-brand bg-brand-1 py-3 px-5 rounded text-body2 font-600  w-full`}
          >
            Atualizar senha
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
