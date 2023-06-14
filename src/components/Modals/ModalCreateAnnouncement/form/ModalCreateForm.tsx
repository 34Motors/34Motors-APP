import { DefaultFieldset } from "@/components/defaultFieldset";
import { carsAPI } from "@/services/apis";
import {
  capitalizeFirstLetter,
  formatCurrency,
} from "@/utils/formatingFunctions";
import { useState } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { BsFillTrashFill } from "react-icons/bs";

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

const fuels = ["Gasolina", "Híbrido", "Elétrico"];

export const ModalCreateAnnouncementForm = ({}) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [models, setModels] = useState<iCar[] | null>(null);
  const [selectedModel, setSelectedModel] = useState<iCar | null>(null);

  async function handleBrandChange(event: any) {
    if (event.target.value == "null") {
      setSelectedBrand(null);
      setModels(null);
      setSelectedModel(null);
      return;
    }

    const brand = event.target.value;

    setSelectedBrand(brand);

    const response = await carsAPI.get(`/cars?brand=${brand}`);

    setModels(response.data);
  }

  function handleModelChange(event: any) {
    if (event.target.value == "null") {
      setSelectedModel(null);
      return;
    }

    setSelectedModel(models![event.target.value]);
  }

  const { register } = useForm();

  return (
    <form className="flex flex-col">
      <SelectBrands handleChange={handleBrandChange} register={register} />
      {selectedBrand && (
        <SelectModel
          models={models}
          handleChange={handleModelChange}
          register={register}
        />
      )}
      {selectedModel && <OtherInputs car={selectedModel} register={register} />}
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
        className="default-input"
        id="brand"
        onChangeCapture={handleChange}
        {...register("brand")}
      >
        <option value="null">Selecione a marca</option>
        {avaliableBrands.map((brand) => (
          <option key={brand} value={brand}>
            {brand.toLocaleUpperCase()}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

function SelectModel({ models, handleChange, register }: any) {
  if (models == null) {
    return <p>Carregando...</p>;
  }

  return (
    <fieldset className="flex flex-col">
      <label htmlFor="model" className="default-label">
        Modelo
      </label>
      <select
        className="default-input"
        id="model"
        {...register("model")}
        onChange={handleChange}
      >
        <option value={"null"}>Selecione o modelo</option>
        {models.map((model: iCar, index: number) => (
          <option key={model.id} value={index}>
            {capitalizeFirstLetter(model.name)}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

interface OtherInputsProps {
  car: iCar;
  register: UseFormRegister<any>;
}

function OtherInputs({ car, register }: OtherInputsProps) {
  return (
    <>
      <div className="flex justify-between">
        <DefaultFieldset
          label={"Ano"}
          id={"year"}
          inputProps={{ value: car.year, readOnly: true }}
        />
        <DefaultFieldset
          label={"Combustível"}
          id={"fuel"}
          inputProps={{
            value: fuels[car.fuel + 1],
            readOnly: true,
            ...register("fuel"),
          }}
        />
      </div>
      <div className="flex justify-between">
        <DefaultFieldset
          label={"Quilometragem"}
          id={"quilomenter"}
          inputProps={{
            type: "number",
            placeholder: "Quilometragem",
            ...register("quilomenter"),
          }}
        />
        <DefaultFieldset
          label={"Cor"}
          id={"color"}
          inputProps={{ placeholder: "Cor", ...register("color") }}
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
          id={"value"}
          inputProps={{ placeholder: "Valor", ...register("value") }}
        />
      </div>
      <fieldset className="flex flex-col">
        <label htmlFor="description" className="default-label">
          Descrição
        </label>
        <textarea
          className="default-input"
          id="description"
          cols={10}
          {...register("description")}
        ></textarea>
      </fieldset>
      <DefaultFieldset
        label={"Imagem da capa"}
        id={"image"}
        inputProps={{
          placeholder: "https://example.com/image.png",
          ...register("image"),
        }}
      />
      <ImageInputs register={register} />
    </>
  );
}

function ImageInputs({ register }: any) {
  const methods = useForm();
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "imageUrls",
  });

  return (
    <div>
      {fields.map((field, index) => (
        <ImageField
          key={field.id}
          index={index}
          onRemove={remove}
          register={register}
        />
      ))}
      <button
        className="font-inter font-600 text-brand-1"
        type="button"
        onClick={() => append({ url: "" })}
      >
        Adicionar campo para nova imagem
      </button>
    </div>
  );
}

function ImageField({ index, onRemove, register }: any) {
  return (
    <div className="flex justify-between items-center relative">
      <DefaultFieldset
        className="flex flex-col w-[93%]"
        label={`${index + 1}ª Imagem da galeria`}
        id={`imageUrls[${index}].url`}
        inputProps={{
          type: "text",
          ...register(`imageUrls[${index}].url`, { required: true }),
        }}
      />
      <BsFillTrashFill
        onClick={onRemove}
        className="absolute right-1 bottom-3 cursor-pointer"
      />
    </div>
  );
}
