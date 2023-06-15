import { DefaultFieldset } from "@/components/defaultFieldset";
import { carsAPI } from "@/services/apis";
import {
  capitalizeFirstLetter,
  formatCurrency,
} from "@/utils/formatingFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  UseFormReturn,
  FieldValues,
  UseFieldArrayReturn,
} from "react-hook-form";
import { BsFillTrashFill } from "react-icons/bs";
import { createAnnouncementSchema } from "../validator";

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
    resolver: zodResolver(createAnnouncementSchema),
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHandler;

  function submitForm(data: any) {
    console.log(data);
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
      {selectedModel && <OtherInputs car={selectedModel} form={formHandler} />}
      <button
        type="submit"
        className="btn-big btn-brand bg-brand-1"
        disabled={errors ? true : false}
      >
        Criar anúncio
      </button>
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
    return <p>Carregando...</p>;
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
      <DefaultFieldset
        label={"Imagem da capa"}
        id={"frontImage"}
        inputProps={{
          placeholder: "https://example.com/image.png",
          ...register("frontImage"),
          className: errors.frontImage
            ? "default-input-error"
            : "default-input",
        }}
      />
      <ImageInputs form={form} />
    </div>
  );
}

interface ImageInputsProps {
  form: UseFormReturn<FieldValues, any>;
}

function ImageInputs({ form }: ImageInputsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const fieldArray = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { fields, append } = fieldArray;

  console.log(fields);

  useEffect(() => {
    if (fields.length < 1) {
      append(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  function addInput() {
    append(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <ImageField
          key={field.id}
          index={index}
          form={form}
          fieldArray={fieldArray}
        />
      ))}
      <button
        className="font-inter font-600 text-brand-1 disabled:text-grey-2"
        type="button"
        onClick={addInput}
        disabled={errors.images ? true : false}
      >
        Adicionar campo para nova imagem
      </button>
    </div>
  );
}

interface ImageFieldProps {
  index: number;
  form: UseFormReturn<FieldValues, any>;
  fieldArray: UseFieldArrayReturn<FieldValues, "images", "id">;
}

function ImageField({ index, form, fieldArray }: ImageFieldProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const { fields, remove } = fieldArray;

  const onRemove = () => {
    remove(index);
  };

  const lastIndex = fields.length - 1;

  return (
    <div className="flex justify-between items-center relative">
      <DefaultFieldset
        className="flex w-[93%]"
        label={`${index + 1}ª Imagem da galeria`}
        id={`images[${index}]`}
        inputProps={{
          type: "text",
          ...register(`images[${index}]`, { required: true }),
          className: errors.images ? "default-input-error" : "default-input",
        }}
      />
      {index == lastIndex && index != 0 && (
        <BsFillTrashFill
          onClick={onRemove}
          className="absolute right-1 bottom-3 cursor-pointer"
        />
      )}
    </div>
  );
}
