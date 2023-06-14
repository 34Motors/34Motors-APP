import React from "react";

const DefaultFieldset = ({ className, label, id, inputProps }: any) => {
  const type = id != "password" ? "text" : "password";

  return (
    <fieldset className={className}>
      <label htmlFor={id} className="default-label">
        {label}
      </label>
      <input id={id} className="default-input" type={type} {...inputProps} />
    </fieldset>
  );
};

DefaultFieldset.defaultProps = {
  className: "flex flex-col",
};

export { DefaultFieldset };
