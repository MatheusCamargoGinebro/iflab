import React, { useState } from "react";

// Icons:
import show from "../../assets/icons/UI/show.png";
import hide from "../../assets/icons/UI/hide.png";

function Password_Input({ placeholder, alt }) {
  const [showPassword, setShowPassword] = useState(false); // state to show password

  return (
    <>
      <div className="w-full flex border-b-2 border-b-iflab_gray_light hover:border-b-iflab_green_light duration-75">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-2 outline-none"
          placeholder={placeholder ? placeholder : "Digite sua senha..."}
        />
        <div
          className="right-0 outline-none w-[39px]"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img
            src={showPassword ? show : hide}
            alt={alt ? alt : "Visibilidade da senha"}
            className="h-5 w-5 m-2 select-none cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default Password_Input;
