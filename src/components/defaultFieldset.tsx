import React from "react";

export const DefaultFieldset = ({ label, id, inputProps }: any) => {
  const type = id != "password" ? "text" : "password";

  return (
    <fieldset>
      <label htmlFor={id} className="default-label">
        {label}
      </label>
      <input id={id} className="default-input" type={type} {...inputProps} />
    </fieldset>
  );
};
