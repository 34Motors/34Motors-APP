import React from "react";
import { MdPassword } from "react-icons/md";

export const DefaultFieldset = ({ id, name }: any) => {
  const type = id != "password" ? "text" : "password";

  return (
    <fieldset>
      <label htmlFor={id} className="default-label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={name}
        className="default-input"
      />
    </fieldset>
  );
};
