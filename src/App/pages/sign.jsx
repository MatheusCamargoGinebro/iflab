import React, { useState } from "react";

import Password_Input from "../../components/inputs/Password_Input";
import Text_Input from "../../components/inputs/Text_Input";
import Primary_button from "../../components/buttons/Primary_button";

import lab from "../../assets/images/lab.png";
import logo from "../../assets/images/logo.png";
import user from "../../assets/icons/UI/user.png";
import email from "../../assets/icons/UI/email.png";

function Sign() {
  const [isInRegister, setIsInRegister] = useState(false);

  return (
    <div className="flex">
      <div className="bg-iflab_white_light h-screen w-[70%] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img
            src={lab}
            alt="lab"
            className="w-[100px] h-[100px] select-none"
          />
          <h1 className="text-iflab_green text-center">
            Bem vindo (a) ao <span className="font-semibold">IFLab</span>, o
            software de gerenciamento de laboratório de química do <br />{" "}
            Instituto Federal - Campus Campinas
          </h1>
        </div>
      </div>
      <div className="bg-iflab_white h-screen w-[30%] shadow-sm">
        <div className="flex justify-center items-center w-full h-[25%]">
          <img src={logo} alt="iflab" className="h-[120px] select-none" />
        </div>

        <div className="w-full h-[75%]flex flex-col">
          <div className="w-full">
            <button
              id="register"
              className={
                isInRegister
                  ? "w-1/2 p-2 border-t border-r border-iflab_gray_light hover:shadow-inner"
                  : "w-1/2 p-2 border-b border-r border-iflab_gray_light hover:shadow-inner"
              }
              onClick={() => setIsInRegister(true)}
            >
              Registrar
            </button>
            <button
              id="login"
              className={
                isInRegister
                  ? "w-1/2 p-2 border-b border-iflab_gray_light hover:shadow-inner"
                  : "w-1/2 p-2 border-t border-iflab_gray_light hover:shadow-inner"
              }
              onClick={() => setIsInRegister(false)}
            >
              Entrar
            </button>
          </div>

          {/* Register */}
          {isInRegister && (
            <div className="w-full h-[100%] flex flex-col items-center p-10 pt-16">
              <form action="" className="w-[85%]">
                <div className="mb-10 mt-8">
                  <Text_Input
                    placeholder="Digite seu nome de usuário..."
                    icon={user}
                    alt="Nome de usuário."
                  />
                </div>
                <div className="mb-10">
                  <Text_Input
                    placeholder="Digite seu email..."
                    icon={email}
                    alt="Email."
                  />
                </div>
                <div className="mb-10">
                  <Password_Input
                    placeholder="Digite sua senha..."
                    alt="Visibilidade da senha."
                  />
                </div>
                <div className="mb-10">
                  <Password_Input
                    placeholder="Confirme sua senha..."
                    alt="Visibilidade da confirmação de senha."
                  />
                </div>
                <div className="flex justify-around px-16 py-8">
                  <div>
                    <input
                      type="radio"
                      id="professor"
                      name="userType"
                      value="professor"
                      className=""
                    />
                    <label htmlFor="professor">Professor</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="student"
                      name="userType"
                      value="student"
                    />
                    <label htmlFor="student">Aluno</label>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Primary_button text="Registrar-se" />
                </div>
              </form>
            </div>
          )}

          {/* Login */}
        </div>
      </div>
    </div>
  );
}

export default Sign;
