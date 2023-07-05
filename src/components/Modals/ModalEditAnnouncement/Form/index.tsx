import { DefaultFieldset } from "@/components/defaultFieldset";
import { SingleImageInput } from "@/components/imageInputs";
import { useAuth } from "@/contexts/authContext";
import { useCarsContext } from "@/contexts/carsContext";
import { ICarsReturn } from "@/interfaces/cars.interfaces";
import { API } from "@/services/apis";
import {
  capitalizeFirstLetter,
  cleanObject,
  formatCurrency,
} from "@/utils/formatingFunctions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormEditAnnouncementProps {
  announcement: ICarsReturn;
  setPage: (page: number) => void;
  toggleModal: () => void;
}

export const FormEditAnnouncement = ({
  announcement,
  setPage,
  toggleModal,
}: FormEditAnnouncementProps) => {
  const { token, user } = useAuth();
  const { getAllCars, getSellerAnnouncements } = useCarsContext();

  async function submit(data: any) {
    cleanObject(data);

    data.quilometers = +data.quilometers;
    data.price = +data.price;

    const { frontImage, ...rest } = data;

    API.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      await API.patch(`/cars/${announcement.id}`, rest);

      if (frontImage) {
        const fd = new FormData();
        fd.append("frontImage", frontImage);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        await API.patch(`cars/${announcement.id}/upload`, fd, config);
      }

      getAllCars();
      getSellerAnnouncements(announcement.userId);
      toggleModal();
      toast.success("Anúncio atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar o anúncio");
    }
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
          defaultValue: capitalizeFirstLetter(announcement.brand),
          readOnly: true,
        }}
      />
      <DefaultFieldset
        label="Modelo"
        inputProps={{
          defaultValue: capitalizeFirstLetter(announcement.model),
          readOnly: true,
        }}
      />
      <div className="flex justify-between">
        <DefaultFieldset
          label="Ano"
          inputProps={{
            defaultValue: announcement.year,
            readOnly: true,
          }}
        />
        <DefaultFieldset
          label="Combustivel"
          inputProps={{
            defaultValue: announcement.fuelType,
            readOnly: true,
          }}
        />
      </div>
      <div className="flex justify-between">
        <DefaultFieldset
          label="Quilometragem"
          inputProps={{
            defaultValue: announcement.quilometers,
            ...register("quilometers"),
          }}
        />
        <DefaultFieldset
          label="Cor"
          inputProps={{
            defaultValue: announcement.color,
            readOnly: true,
          }}
        />
      </div>
      <div className="flex justify-between">
        <DefaultFieldset
          label="Preço tabela FIPE"
          inputProps={{
            defaultValue: formatCurrency(announcement.fipePrice),
            readOnly: true,
          }}
        />
        <DefaultFieldset
          label="Valor"
          inputProps={{
            defaultValue: announcement.price,
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
          defaultValue={announcement.description}
          id="description"
          cols={10}
          {...register("description")}
        />
      </fieldset>
      <SingleImageInput form={formHandler} imageUrl={announcement.frontImage} />

      <div className="flex justify-between">
        <button className="btn-big btn-alert p-2" onClick={() => setPage(3)}>
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
