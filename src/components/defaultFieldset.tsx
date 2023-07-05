import React from "react";
import InptMask from "react-input-mask";

interface defaultFieldsetProps {
  className?: string;
  label: string;
  id?: string;
  type?: string;
  mask?: string;
  inputProps: object;
}

const DefaultFieldset = ({
  className = "",
  label,
  id = "",
  type = "text",
  mask,
  inputProps,
}: defaultFieldsetProps) => {
  const InputMask = InptMask as any;

  const InputMasked = (
    <InputMask
      mask={mask}
      id={id}
      className="default-input w-full"
      type={type}
      {...inputProps}
    />
  );

  const Default = (
    <input
      id={id}
      className="default-input w-full"
      type={type}
      {...inputProps}
    />
  );

  return (
    <fieldset className={"flex flex-col gap-2 " + className}>
      <label className="default-label" htmlFor={id}>
        {label}
      </label>
      {mask ? InputMasked : Default}
    </fieldset>
  );
};

export { DefaultFieldset };
