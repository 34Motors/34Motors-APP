import { DefaultFieldset } from "@/components/defaultFieldset";
import { SingleImageInput } from "@/components/imageInputs";
import { useAuth } from "@/contexts/authContext";
import { useCarsContext } from "@/contexts/carsContext";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import {
  capitalizeFirstLetter,
  formatCurrency,
} from "@/utils/formatingFunctions";
import { useForm } from "react-hook-form";

interface FormEditAnnouncementProps {
  announcement: ICarsReturn;
  setPage: (page: number) => void;
}

export const FormEditAnnouncement = ({
  announcement,
  setPage,
}: FormEditAnnouncementProps) => {
  const { token, user } = useAuth();
  const { getAllCars, getSellerAnnouncements } = useCarsContext();

  function submit(data: any) {
    console.log(data);
  }

  const formHandler = useForm({
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = formHandler;

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <DefaultFieldset
        label="Marca"
        inputProps={{
          value: capitalizeFirstLetter(announcement.brand),
          readOnly: true,
        }}
      />
      <DefaultFieldset
        label="Modelo"
        inputProps={{
          value: capitalizeFirstLetter(announcement.model),
          readOnly: true,
        }}
      />
      <div className="flex justify-between">
        <DefaultFieldset
          label="Ano"
          inputProps={{
            value: announcement.year,
            readOnly: true,
          }}
        />
        <DefaultFieldset
          label="Combustivel"
          inputProps={{
            value: announcement.fuelType,
            readOnly: true,
          }}
        />
      </div>
      <div className="flex justify-between">
        <DefaultFieldset
          label="Quilometragem"
          inputProps={{
            value: announcement.quilometers,
            ...register("quilometers"),
          }}
        />
        <DefaultFieldset
          label="Cor"
          inputProps={{
            value: announcement.color,
            readOnly: true,
          }}
        />
      </div>
      <div className="flex justify-between">
        <DefaultFieldset
          label="Preço tabela FIPE"
          inputProps={{
            value: formatCurrency(announcement.fipePrice),
            readOnly: true,
          }}
        />
        <DefaultFieldset
          label="Valor"
          inputProps={{
            value: announcement.price,
            ...register("price"),
          }}
        />
      </div>
      <fieldset className="flex flex-col">
        <label htmlFor="description" className="default-label">
          Descrição
        </label>
        <textarea
          className={
            errors.description ? "default-input-error" : "default-input"
          }
          value={announcement.description}
          id="description"
          cols={10}
          {...register("description")}
        />
      </fieldset>
      <SingleImageInput form={formHandler} imageUrl={announcement.frontImage} />

      <div className="flex justify-between">
        <button className="btn-big btn-alert" onClick={() => setPage(3)}>
          Excluir anúncio
        </button>
        <button onClick={() => setPage(2)} className="btn-big btn-outline">
          Editar imagens
        </button>
        <button className="btn-big btn-brand">Salvar alteraçães</button>
      </div>
    </form>
  );
};
