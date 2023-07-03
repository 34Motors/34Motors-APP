import { DefaultFieldset } from "@/components/defaultFieldset";
import { API, carsAPI } from "@/services/apis";
import {
  capitalizeFirstLetter,
  formatCurrency,
} from "@/utils/formatingFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  useForm,
  UseFormRegister,
  UseFormReturn,
  FieldValues,
  Form,
} from "react-hook-form";
import { createAnnouncementSchema } from "../validator";
import { SmallLoading } from "@/components/smallLoading";
import { SingleImageInput } from "@/components/imageInputs";
import { useAuth } from "@/contexts/authContext";
import { toast } from "react-toastify";
interface iCar {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}

const avaliableBrands = [
  "chevrolet",
  "citroën",
  "fiat",
  "ford",
  "honda",
  "hyundai",
  "nissan",
  "peugeot",
  "renault",
  "toyota",
  "volkswagen",
];

const fuels = ["", "Flex", "Hibrido", "Eletrico"];

interface iFormProps {
  setPage: (page: number) => void;
  setAnnouncementId: (id: number) => void;
}

export const ModalCreateAnnouncementForm = ({
  setPage,
  setAnnouncementId,
}: iFormProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [models, setModels] = useState<iCar[] | null>(null);
  const [selectedModel, setSelectedModel] = useState<iCar | null>(null);
  const { token } = useAuth();

  async function handleBrandChange(event: any) {
    if (event.target.value == "null") {
      setSelectedBrand(null);
      setModels(null);
      setSelectedModel(null);
      return;
    }

    const brand = event.target.value;

    setSelectedBrand(brand);
    setSelectedModel(null);

    const response = await carsAPI.get(`/cars?brand=${brand}`);

    setModels(response.data);
  }

  function handleModelChange(event: any) {
    if (event.target.value == "null") {
      setSelectedModel(null);
      return;
    }

    const selected = models!.find((car) => car.name == event.target.value);

    setSelectedModel(selected!);
  }

  const formHandler = useForm({
    mode: "onTouched",
    resolver: zodResolver(createAnnouncementSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = formHandler;

  async function submitForm(data: any) {
    data.quilometers = +data.quilometers;
    const { frontImage, ...rest } = data;

    const fd = new FormData();
    fd.append("frontImage", frontImage);

    if (!frontImage) {
      toast.error("Por favor, adicione uma imagem!");
      return;
    }

    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const createdAnnouncement = await API.post("cars", rest);
      setAnnouncementId(createdAnnouncement.data.id);
      await API.patch(`cars/${createdAnnouncement.data.id}/upload`, fd, config);

      toast.success("Anúncio cadastrado com sucesso!");
      setPage(2);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
      <SelectBrands handleChange={handleBrandChange} register={register} />
      {selectedBrand && (
        <SelectModel
          models={models}
          handleChange={handleModelChange}
          register={register}
        />
      )}
      {selectedModel && (
        <>
          <OtherInputs car={selectedModel} form={formHandler} />
          <button
            type="submit"
            className="btn-big btn-brand bg-brand-1"
            disabled={isValid ? false : true}
          >
            Adicionar imagens
          </button>
        </>
      )}
    </form>
  );
};

interface SelectBrandsProps {
  handleChange: (event: any) => void;
  register: UseFormRegister<any>;
}

function SelectBrands({ handleChange, register }: SelectBrandsProps) {
  return (
    <fieldset className="flex flex-col">
      <label className="default-label" htmlFor="brand">
        Marca
      </label>
      <select
        className="default-select"
        id="brand"
        onChangeCapture={handleChange}
        {...register("brand")}
      >
        <option value="null">Selecione a marca</option>
        {avaliableBrands.map((brand) => (
          <option key={brand} value={brand}>
            {capitalizeFirstLetter(brand)}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

interface SelectModelsProps {
  models: iCar[] | null;
  handleChange: (event: any) => void;
  register: UseFormRegister<any>;
}

function SelectModel({ models, handleChange, register }: SelectModelsProps) {
  if (models == null) {
    return <SmallLoading />;
  }

  return (
    <fieldset className="flex flex-col">
      <label htmlFor="model" className="default-label">
        Modelo
      </label>
      <select
        className="default-select"
        id="model"
        {...register("model")}
        onChange={handleChange}
      >
        <option value={"null"}>Selecione o modelo</option>
        {models.map((model: iCar, index: number) => (
          <option key={model.id} value={model.name}>
            {capitalizeFirstLetter(model.name)}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

interface OtherInputsProps {
  car: iCar;
  form: UseFormReturn<FieldValues, any>;
}

function OtherInputs({ car, form }: OtherInputsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <DefaultFieldset
          label={"Ano"}
          id={"year"}
          inputProps={{
            value: car.year,
            readOnly: true,
            ...register("year"),
          }}
        />
        <DefaultFieldset
          label={"Combustível"}
          id={"fuelType"}
          inputProps={{
            value: fuels[car.fuel],
            readOnly: true,
            ...register("fuelType"),
          }}
        />
      </div>
      <div className="flex justify-between">
        <DefaultFieldset
          label={"Quilometragem"}
          id={"quilometers"}
          inputProps={{
            type: "number",
            placeholder: "Quilometragem",
            ...register("quilometers"),
            className: errors.quilometers
              ? "default-input-error"
              : "default-input",
          }}
        />
        <DefaultFieldset
          label={"Cor"}
          id={"color"}
          inputProps={{
            placeholder: "Cor",
            ...register("color"),
            className: errors.color ? "default-input-error" : "default-input",
          }}
        />
      </div>
      <div className="flex justify-between">
        <DefaultFieldset
          label={"Preço tabela FIPE"}
          id={"fipePrice"}
          inputProps={{
            value: formatCurrency(car.value),
            readOnly: true,
            ...register("fipePrice"),
          }}
        />
        <DefaultFieldset
          label={"Valor"}
          id={"price"}
          inputProps={{
            type: "number",
            placeholder: "Valor",
            ...register("price"),
            className: errors.price ? "default-input-error" : "default-input",
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
          id="description"
          cols={10}
          {...register("description")}
        ></textarea>
      </fieldset>
      <SingleImageInput form={form} />
    </div>
  );
}
