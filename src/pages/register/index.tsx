import { DefaultFieldset } from "@/components/defaultFieldset";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { iUserBody } from "@/interfaces/user.interfaces";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<iUserBody>({})

    const [isSeller, setIsSeller] = useState<boolean>(false)
    const [buttonColor, setButtonColor] = useState<boolean>(false)

    const submit = (data: iUserBody) => {
        const userData = {
            ...data,
            isSeller
        }
        console.log(userData)
    }

    return (
        <div className="flex flex-col justify-between h-screen">
            <Header />
            <main className="flex justify-center bg-grey-8 h-full overflow-y-scroll">
                <form className="bg-grey-10 py-11 h-fit px-12 mt-[46px] mb-[97px] rounded md:w-[411px]" onSubmit={handleSubmit(submit)}>
                    <h2 className="mb-8 font-500 text-heading5">Cadastro</h2>
                    <h3 className="mb-6 font-500 text-sm">Informações pessoais</h3>
                    <div className="flex flex-col gap-6 w-full">
                        <DefaultFieldset label="Nome" inputProps={{
                            placeholder: "Digitar seu nome",
                            ...register("name"),
                        }} />
                        <DefaultFieldset label="Email" inputProps={{
                            placeholder: "Digite seu email",
                            ...register("email"),
                        }} />
                        <DefaultFieldset label="CPF"
                            inputProps={{
                                placeholder: "Digite seu cpf",
                                ...register("cpf"),
                            }} />
                        <DefaultFieldset label="Celular"
                            inputProps={{
                                placeholder: "Digite seu telefone",
                                ...register("phone"),
                            }} />
                        <DefaultFieldset label="Data de nascimento"
                            inputProps={{
                                placeholder: "Digite sua data denascimento",
                                ...register("birthDate"),
                            }} />
                        <DefaultFieldset label="Descrição"
                            inputProps={{
                                placeholder: "Digite uma descrição",
                                ...register("description"),
                            }} />
                        <h3 className="font-500 text-sm">Informações de endereço</h3>
                        <DefaultFieldset label="CEP" inputProps={{
                            placeholder: "Digitar seu cep",
                            ...register("cep"),
                        }} />
                        <div className="flex gap-2">
                            <DefaultFieldset label="Estado"
                                inputProps={{
                                    placeholder: "Digite seu estado",
                                    ...register("state"),
                                }} />
                            <DefaultFieldset label="Cidade"
                                inputProps={{
                                    placeholder: "Digite sua cidade",
                                    ...register("city"),
                                }} />
                        </div>
                        <DefaultFieldset label="Rua"
                            inputProps={{
                                placeholder: "Digite uma rua",
                                ...register("street"),
                            }} />
                        <div className="flex gap-2">
                            <DefaultFieldset label="Número"
                                inputProps={{
                                    placeholder: "Digite seu número",
                                    ...register("number"),
                                }} />
                            <DefaultFieldset label="Complemento"
                                inputProps={{
                                    placeholder: "Digite um complemento",
                                    ...register("complement"),
                                }} />
                        </div>

                        <h3 className="font-500 text-sm">Tipo de conta</h3>
                        <div className="flex gap-2">
                            <button className={`px-4 ${buttonColor ? "bg-brand-1 text-white border-brand-1" : "bg-gray-9 border border-grey-3"} py-2 w-full h-full bg-gray-9 border border-grey-3 rounded focus:bg-brand-1 focus:text-white focus:border-brand-1`} onClick={e => { e.preventDefault(), setIsSeller(false), setButtonColor(!buttonColor) }}>Comprador</button>
                            <button className={`px-4 ${!buttonColor ? "bg-brand-1 text-white border-brand-1" : "bg-gray-9 border border-grey-3"} py-2 w-full h-full bg-gray-9 border rounded`} onClick={e => { e.preventDefault(), setIsSeller(true), setButtonColor(!buttonColor) }}>Anunciante</button>
                        </div>
                        <DefaultFieldset label="Senha"
                            inputProps={{
                                placeholder: "Digite uma senha",
                                ...register("password"),
                            }} />
                        <DefaultFieldset label="Confimar senha"
                            inputProps={{
                                placeholder: "confirme sua senha",
                                ...register("confirmPassword"),
                            }} />
                    </div>
                    <button className="btn-brand w-full mt-6 py-3 px-7 rounded">Finalizar cadastro</button>
                </form>
            </main>
            <Footer />
        </div>

    );
}

export default RegisterPage;