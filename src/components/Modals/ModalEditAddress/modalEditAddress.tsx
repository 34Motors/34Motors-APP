import ModalBase from "../modalBase";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Inter, Lexend } from "next/font/google";
import { EditAddressData } from "./validator";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { API } from "@/services/apis";
import { toast } from "react-toastify";



interface ModalEditAddressProps {
  toggleModal: () => void;
}

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const ModalEditAddress = ({ toggleModal }: ModalEditAddressProps) => {
  const [cepModified, setCepModified] = useState(false);
  const { user, token } = useAuth();
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const updateAddress = async (data: object) => {
    try {
      const responseAddress = await API.patch(
        `/users/${user.id}/address`,
        data,
        headers
      );
      toast.success("Endereço atualizado com sucesso!")
    } catch (error) {
      toast.error("Não foi possível atualizar o endereço!")
      console.log(error)
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<EditAddressData>();

  const formSubmit = async (data: EditAddressData) => {
    if (Object.keys(errors).length === 0) {
      if (cepModified) {
        if (
          data.street &&
          data.state &&
          data.city &&
          data.number &&
          data.street.trim() !== "" &&
          data.state.trim() !== "" &&
          data.city.trim() !== "" &&
          data.number.trim() !== ""
        ) {
          updateAddress(data);
          toggleModal();
        }
      } else {
        updateAddress(data);
        toggleModal();
      }
    }
  };

  const checkCEP = async (e: any) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setValue("state", data.uf);
          setValue("city", data.localidade);
          setValue("street", data.logradouro);
          setFocus("number");
        });
    }
    setCepModified(true);
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
                className={`default-label ${inter.className}`}
              >
                CEP
              </label>
              <input
                type="text"
                id="cep"
                placeholder="Digite o seu cep"
                defaultValue={`${user.address?.cep}`}
                {...register("cep")}
                onBlur={checkCEP}
                className={`default-input`}
              />
            </div>

            <div className={`flex gap-[10px]`}>
              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="state"
                  className={`default-label ${inter.className}`}
                >
                  Estado
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="Digite o seu estado"
                  defaultValue={`${user.address.state}`}
                  {...register("state")}
                  className={`default-input w-full`}
                />
                {cepModified && !errors.state && (
                  <span className="text-red-500">Preencha o estado</span>
                )}
              </div>

              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="city"
                  className={`default-label ${inter.className}`}
                >
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Digite a sua cidade"
                  defaultValue={`${user.address.city}`}
                  {...register("city")}
                  className={`default-input w-full`}
                />
                {cepModified && !errors.city && (
                  <span className="text-red-500">Preencha a cidade</span>
                )}
              </div>
            </div>
            <div className={`flex flex-col gap-2`}>
              <label
                htmlFor="street"
                className={`default-label ${inter.className}`}
              >
                Rua
              </label>
              <input
                type="text"
                id="street"
                placeholder="Digite a sua rua"
                defaultValue={`${user.address.street}`}
                {...register("street")}
                className={`default-input`}
              />
              {cepModified && !errors.street && (
                <span className="text-red-500">Preencha o endereço</span>
              )}
            </div>

            <div className={`flex gap-[10px]`}>
              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="number"
                  className={`default-label ${inter.className}`}
                >
                  Número
                </label>
                <input
                  type="text"
                  id="number"
                  placeholder="Digite o seu número"
                  defaultValue={`${user.address.number}`}
                  {...register("number")}
                  className={`default-input w-full`}
                />
                {cepModified && !errors.number && (
                  <span className="text-red-500">Preencha o número</span>
                )}
              </div>

              <div className={`flex flex-col gap-2`}>
                <label
                  htmlFor="complement"
                  className={`default-label ${inter.className}`}
                >
                  Complemento
                </label>
                <input
                  type="text"
                  id="complement"
                  defaultValue={`${user.address.complement}`}
                  placeholder="Digite o complemento"
                  {...register("complement")}
                  className={`default-input w-full`}
                />
              </div>
            </div>

            <div className={`flex justify-end gap-3 ${inter.className}`}>
              {!Object.keys(errors).length && (
                <button
                  type="submit"
                  className={`btn-brand bg-brand-1 py-3 px-6 rounded text-body2 font-600`}
                >
                  Salvar alterações
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalEditAddress;
