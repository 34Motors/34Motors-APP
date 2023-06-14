import React from "react";

export const DefaultFieldset = ({ label, id, inputProps }: any) => {
  const type = id != "password" ? "text" : "password";

  return (
    <fieldset className="flex flex-col gap-2">
      <label htmlFor={id} className="default-label">
        {label}
      </label>
      <input id={id} className="default-input w-full" type={type} {...inputProps} />
    </fieldset>
  );
};
