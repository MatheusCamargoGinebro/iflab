import React, { useState } from "react";

import Password_Input from "../../components/inputs/Password_Input";
import Text_Input from "../../components/inputs/Text_Input";
import Primary_button from "../../components/buttons/Primary_button";
import Tertiary_button from "../../components/buttons/Tertiary_button";

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
      <div className="bg-iflab_white h-screen max-h-[1080px] min-w-[556px] w-[30%] shadow-sm">
        <div className="flex justify-center items-center w-full h-[25%]">
          <img src={logo} alt="iflab" className="h-[120px] select-none" />
        </div>

        <div className="w-full h-[75%] flex flex-col">
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
            <form action="" className="w-full h-full flex flex-col">
              <div className="w-full flex flex-col px-16 gap-10 mt-16">
                <div>
                  <label htmlFor="name" className="text-[15px] text-iflab_gray">
                    Nome de usuário
                  </label>
                  <Text_Input
                    id="name"
                    icon={user}
                    placeholder="Digite seu nome de usuário..."
                    type="text"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-[15px] text-iflab_gray"
                  >
                    Email
                  </label>
                  <Text_Input
                    id="email"
                    icon={email}
                    placeholder="Digite seu email..."
                    type="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-[15px] text-iflab_gray"
                  >
                    Senha
                  </label>
                  <Password_Input
                    id="password"
                    placeholder="Digite sua senha..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm_password"
                    className="text-[15px] text-iflab_gray"
                  >
                    Confirmar senha
                  </label>
                  <Password_Input
                    id="confirm_password"
                    placeholder="Digite sua senha novamente..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="user_type"
                    className="text-[15px] text-iflab_gray"
                  >
                    Tipo de usuário
                  </label>
                  <div className="w-full flex gap-5 mt-2 ml-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="user_type"
                        id="professor"
                        className="mr-2 accent-iflab_green cursor-pointer"
                      />
                      <label htmlFor="professor" className="text-iflab_gray">
                        Sou professor
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="user_type"
                        id="aluno"
                        className="mr-2 accent-iflab_green cursor-pointer"
                      />
                      <label htmlFor="aluno" className="text-iflab_gray">
                        Sou aluno
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-16 pt-10 flex justify-between items-center">
                <Tertiary_button text="Já tenho uma conta" />
                <Primary_button text="Registrar-se" />
              </div>

              <div className="px-6 flex text-iflab_gray_light w-full h-full justify-center items-end pb-3">
                <p className="text-sm">
                  Ao se registrar, você confirmará que leu os{" "}
                  <a
                    href="/"
                    className="text-iflab_green_light font-normal hover:text-iflab_green_dark duration-75"
                  >
                    termos de uso
                  </a>{" "}
                  do aplicativo.
                </p>
              </div>
            </form>
          )}

          {/* Login */}
          {!isInRegister && (
            <form action="" className="w-full h-full flex flex-col">
              <div className="w-full flex flex-col px-16 gap-10 mt-16">
                <div>
                  <label htmlFor="user" className="text-[15px] text-iflab_gray">
                    Nome de usuário
                  </label>
                  <Text_Input
                    id="user"
                    icon={user}
                    placeholder="Digite seu nome de usuário..."
                    type="user"
                  />
                </div>

                <div>
                  <label
                    htmlFor="senha"
                    className="text-[15px] text-iflab_gray"
                  >
                    senha
                  </label>
                  <Password_Input
                    id="password"
                    placeholder="Digite sua senha..."
                  />
                  <p className="text-iflab_gray text-end mt-2 text-[12px]">
                    Esqueceu a sua senha?{" "}
                    <a href="/" className="text-iflab_green_light">
                      clique aqui!
                    </a>
                  </p>
                </div>
              </div>
              <div className="w-full px-16 pt-10 flex justify-between items-center">
                <Tertiary_button text="Criar uma conta" />
                <Primary_button text="Fazer Login" />
              </div>

              <div className="px-6 flex text-iflab_gray_light w-full h-full justify-center items-end p-3 mt-16">
                <p className="text-sm">
                  Ao logar, você confirma que leu os{" "}
                  <a
                    href="/#/home"
                    /* target="_blank" */
                    className="text-iflab_green_light font-normal hover:text-iflab_green_dark duration-75"
                  >
                    termos de uso
                  </a>{" "}
                  do aplicativo.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sign;
