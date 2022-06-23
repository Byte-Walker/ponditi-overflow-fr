import React from "react";

const Input = ({ type, title, value, setValue }) => {
  return (
    <>
      <label className={`${value ? "" : "hidden"}`}>{title}</label>
      <input
        className=""
        type={type}
        placeholder={title}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
};

export default Input;
