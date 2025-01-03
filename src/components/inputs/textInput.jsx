import React, { useState } from "react";

// Icons:
import showIcon from "../../assets/icons/UI/show.png";
import hideIcon from "../../assets/icons/UI/hide.png";

function TextInput({
  icon,
  type,
  name,
  label,
  onChange,
  state,
  errorMessage,
  predata,
}) {
  // State para mostrar ou esconder a senha:
  const [showPassword, setShowPassword] = useState(false);

  // State para o valor do input:
  const [value, setValue] = useState("");

  // Função para lidar com a mudança do input:
  function handleOnChange(e) {
    onChange(e);
    setValue(e.target.value);
  }

  // Retorno do componente:
  return (
    <div className="group">
      <label
        htmlFor={name ? name : "input"}
        className={`relative duration-75${
          // Se o input estiver preenchido, ele sobe.
          value.length > 0 || predata.length > 0 || !!predata
            ? " top-0 left-0"
            : " top-8 left-3 group-hover:left-4 text-iflab_gray"
        }`}
      >
        {label ? label + (value.length > 0 ? ":" : "") : "Insira informação"}
      </label>
      <div
        className={`group w-full flex border-b-2 rounded-sm bg-iflab_white hover:bg-iflab_white_light duration-75 border-b-iflab_gray_light ${
          value.length === 0
            ? "hover:border-b-iflab_green_light"
            : state
            ? "hover:border-b-iflab_green_light"
            : "hover:border-b-iflab_red"
        } `}
      >
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="z-10 w-full p-2 outline-none bg-opacity-0 bg-iflab_white group-hover:pl-3 group-focus-within:pl-3 duration-75"
          name={name ? name : "input"}
          onChange={handleOnChange}
          value={!!predata ? predata : ""}
        ></input>
        {type === "password" ? (
          <div
            className="right-0 outline-none w-[40px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? showIcon : hideIcon}
              alt={label ? label : "Visibilidade da senha"}
              className="h-5 w-5 m-2 select-none cursor-pointer"
            />
          </div>
        ) : (
          <div className="right-0 outline-none w-[40px]">
            <img
              src={icon}
              alt={label ? label : "Icone do input"}
              className="h-5 w-5 m-2 select-none cursor-pointer"
            />
          </div>
        )}
      </div>
      <p
        className={`text-iflab_red w-fit text-sm left-2 relative duration-75 ${
          value.length === 0
            ? "-top-10 text-opacity-0"
            : state
            ? "-top-10 text-opacity-0"
            : "top-0 text-opacity-100"
        }`}
      >
        {errorMessage}
      </p>
    </div>
  );
}

export default TextInput;
