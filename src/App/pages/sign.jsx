import React, { useState } from "react";

import TextInput from "../../components/inputs/textInput";
import PButton from "../../components/buttons/PButton";
import SButton from "../../components/buttons/SButton";
import TButton from "../../components/buttons/TButton";
/* 
import lab from "../../assets/images/lab.png";
import logo from "../../assets/images/logo.png"; */
import user from "../../assets/icons/UI/user.png";
import email from "../../assets/icons/UI/email.png";

function Sign() {
  const [loginForm, setLoginForm] = useState(true);

  const userLogin = {
    email: "",
    password: "",
  };

  return (
    <>
      <div className="h-screen w-screen bg-iflab_white_dark flex justify-center items-center">
        {loginForm ? (
          <form className="px-10 pt-5 pb-3 bg-iflab_white shadow-md rounded-md min-w-[28rem]">
            <div className="pb-5">
              <h1 className="text-2xl font-bold text-center">LOGIN</h1>
            </div>
            {/* Primeira etapa: Informar email e senha */}
            <div className="flex flex-col gap-10">
              <div className="group">
                <label
                  htmlFor="email-input"
                  className="text-iflab_gray group-hover:text-iflab_gray_dark"
                >
                  Email de usuário
                </label>
                <TextInput
                  label="Email"
                  icon={email}
                  type="email"
                  placeholder="Digite seu email..."
                  name={"email-input"}
                />
              </div>

              <div className="group">
                <label
                  htmlFor="password-input"
                  className="text-iflab_gray group-hover:text-iflab_gray_dark"
                >
                  Senha
                </label>
                <TextInput
                  label="Senha"
                  icon={user}
                  type="password"
                  placeholder="Digite sua senha..."
                  name={"password-input"}
                />
              </div>
            </div>
            {/* Segunda etapa: fazer login */}
            <div className="flex flex-col-reverse justify-center gap-5 pt-10">
              <div className="flex items-center justify-center gap-2">
                <h1>Não possui uma conta?</h1>
                <TButton text="Registre-se!" onClick={
                  () => setLoginForm(!loginForm)
                }/>
              </div>
              <div className="w-full flex justify-center">
                <PButton text="Entrar" />
              </div>
            </div>
          </form>
        ) : (
          <form className="px-14 pt-5 pb-3 bg-iflab_white shadow-md rounded-md min-w-[28rem]">
            <div className="pb-5">
              <h1 className="text-2xl font-bold text-center">REGISTRO</h1>
            </div>

            {/* Primeira etapa: informar email */}
            <div className="group">
              <label
                htmlFor="email-input"
                className="text-iflab_gray group-hover:text-iflab_gray_dark"
              >
                Email de usuário
              </label>
              <TextInput
                label="Email"
                icon={email}
                type="email"
                placeholder="Digite seu email..."
                name={"email-input"}
              />
            </div>
            {/* Segunda etapa: validar o código de confirmação de email */}
            {/* Terceira etapa: informar nome de usuário e senha */}
            {/* Quarta etapa: informar tipo de usuário (aluno, professor ou outro) e a qual câmpus pertence */}
            {/* Quinta etapa: registrar usuário */}
          </form>
        )}

        <h1
          className="fixed right-5 bottom-5"
          onClick={() => setLoginForm(!loginForm)}
        >
          clique
        </h1>
      </div>
    </>
  );
}

export default Sign;
