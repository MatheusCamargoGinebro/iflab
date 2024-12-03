import React, { useState } from "react";

// Icons:
import showIcon from "../../assets/icons/UI/show.png";
import hideIcon from "../../assets/icons/UI/hide.png";

// Input que pode ser de diferentes tipos.
// Se for do tipo senha, ele pode ser ocultado ou exibido.
function TextInput({ placeholder, icon, alt, type, name }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="group w-full flex border-b-2 rounded-sm border-b-iflab_gray_light bg-iflab_white hover:bg-iflab_white_light hover:border-b-iflab_green_light duration-75">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="w-full p-2 outline-none bg-opacity-0 bg-iflab_white group-hover:pl-3 group-focus-within:pl-3 duration-75"
          placeholder={placeholder ? placeholder : "Digite aqui..."}
          name={name ? name : alt ? alt : "input"}
        ></input>

        {/* Sistema de ícones */}

        {type === "password" ? (
          <div
            className="right-0 outline-none w-[40px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? showIcon : hideIcon}
              alt={alt ? alt : "Visibilidade da senha"}
              className="h-5 w-5 m-2 select-none cursor-pointer"
            />
          </div>
        ) : (
          <div className="right-0 outline-none w-[40px]">
            <img
              src={icon}
              alt={alt ? alt : "Icone do input"}
              className="h-5 w-5 m-2 select-none cursor-pointer"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default TextInput;
