import ModalBase from "../modalBase";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Inter, Lexend } from "next/font/google";
import { EditAddressData } from "./validator";

interface ModalEditAddressProps {
  toggleModal: () => void;
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const ModalEditAddress = ({ toggleModal }: ModalEditAddressProps) => {
  const { register, handleSubmit, setValue, setFocus } =
    useForm<EditAddressData>();

  const formSubmit = (e: any) => {
    console.log(e);
  };

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setValue("state", data.uf);
          setValue("city", data.localidade);
          setValue("street", data.logradouro);
          setFocus("addressNumber");
        });
    }
  };

  return (
    <ModalBase toggleModal={toggleModal}>
      <div
        className={`flex flex-col gap-10 bg-grey-whiteFixed p-5 shadow-xl min-w-[33%] max-w-lg rounded-lg`}
      >
        <div className={`flex justify-between`}>
          <h3 className={`text-body1 font-500 text-grey-1 ${lexend.className}`}>
            Editar endereço
          </h3>
          <button onClick={toggleModal} className={`text-heading6 text-grey-4`}>
            <IoMdClose />
          </button>
        </div>

        <div>
          <h4
            className={`text-body2 font-500 text-grey-0 mb-[37px] ${inter.className}`}
          >
            Informações de endereço
          </h4>

          <form
            onSubmit={handleSubmit(formSubmit)}
            className={`flex flex-col gap-[37px]`}
          >
            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="cep"
                className={`text-body2 font-500 text-grey-1 ${inter.className}`}
              >
                CEP
              </label>
              <input
                type="text"
                id="cep"
                placeholder="89888-888"
                {...register("cep")}
                onBlur={checkCEP}
                className={`px-4 h-12 rounded border-solid border-2 border-grey-7 placeholder:text-body1 placeholder:font-400 placeholder:text-grey-3`}
              />
            </div>

            <div className={`flex gap-[10px]`}>
              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="state"
                  className={`text-body2 font-500 text-grey-1 ${inter.className}`}
                >
                  Estado
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="Paraíba"
                  {...register("state")}
                  className={`px-4 h-12 w-full rounded border-solid border-2 border-grey-7 placeholder:text-body1 placeholder:font-400 placeholder:text-grey-3`}
                />
              </div>

              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="city"
                  className={`text-body2 font-500 text-grey-1 ${inter.className}`}
                >
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Cachoeira dos Guedes"
                  {...register("city")}
                  className={`px-4 h-12 w-full rounded border-solid border-2 border-grey-7 placeholder:text-body1 placeholder:font-400 placeholder:text-grey-3`}
                />
              </div>
            </div>

            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="street"
                className={`text-body2 font-500 text-grey-1 ${inter.className}`}
              >
                Rua
              </label>
              <input
                type="text"
                id="street"
                placeholder="Rua do Sol"
                {...register("street")}
                className={`px-4 h-12 rounded border-solid border-2 border-grey-7 placeholder:text-body1 placeholder:font-400 placeholder:text-grey-3`}
              />
            </div>

            <div className={`flex gap-[10px]`}>
              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="addressNumber"
                  className={`text-body2 font-500 text-grey-1 ${inter.className}`}
                >
                  Número
                </label>
                <input
                  type="text"
                  id="addressNumber"
                  placeholder="1234"
                  {...register("addressNumber")}
                  className={`px-4 h-12 w-full rounded border-solid border-2 border-grey-7 placeholder:text-body1 placeholder:font-400 placeholder:text-grey-3`}
                />
              </div>

              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="complement"
                  className={`text-body2 font-500 text-grey-1 w-full ${inter.className}`}
                >
                  Complemento
                </label>
                <input
                  type="text"
                  id="complement"
                  placeholder="Apto 304"
                  {...register("complement")}
                  className={`px-4 h-12 w-full rounded border-solid border-2 border-grey-7 placeholder:text-body1 placeholder:font-400 placeholder:text-grey-3`}
                />
              </div>
            </div>

            <div className={`flex justify-end gap-3 ${inter.className}`}>
              <button
                onClick={toggleModal}
                className={`btn-negative py-3 px-6 rounded text-body2 font-600`}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className={`btn-brand bg-brand-1 py-3 px-6 rounded  text-body2 font-600`}
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalEditAddress;
