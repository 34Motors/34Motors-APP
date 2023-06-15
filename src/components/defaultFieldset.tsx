import { type } from "os";
import React from "react";

interface defaultFieldsetProps {
  className?: string;
  label: string;
  id: string;
  type?: string;
  inputProps: object;
}

const DefaultFieldset = ({
  className,
  label,
  id,
  type,
  inputProps,
}: defaultFieldsetProps) => {
  return (
    <fieldset className={"flex flex-col gap-2 " + className}>
      <label htmlFor={id} className="default-label">
        {label}
      </label>
      <input
        id={id}
        className="default-input w-full"
        type={type}
        {...inputProps}
      />
    </fieldset>
  );
};

DefaultFieldset.defaultProps = {
  className: "flex flex-col gap-2",
  type: "text",
};

export { DefaultFieldset };
