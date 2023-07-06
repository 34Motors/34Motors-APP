import { DefaultFieldset } from "@/components/defaultFieldset";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { API } from "@/services/apis";
import { Router, useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface IEmailSend {
  email: string;
}

const SendRecoverEmail = () => {
  const { register, handleSubmit } = useForm<IEmailSend>({});
  const router = useRouter();

  const submit = async (data: IEmailSend) => {
    try {
      await API.post("/users/recover", data);
      router.push("/");
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
            label={"Email para recuperação de senha"}
            id={"email"}
            inputProps={{
              placeholder: "Digite seu email",
              ...register("email"),
            }}
          />

          <button
            type="submit"
            className={`btn-brand bg-brand-1 py-3 px-5 rounded text-body2 font-600  w-full`}
          >
            Enviar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SendRecoverEmail;
