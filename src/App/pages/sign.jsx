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
  // Quando loginForm é true, exibe o formulário de login;
  // Quando loginForm é false, exibe o formulário de registro;
  const [loginForm, setLoginForm] = useState(true);

  return (
    <>
      <div className="h-screen w-screen bg-iflab_white_dark flex justify-center items-center">
        {/* Formulário */}
        {loginForm ? (
          <form className=""></form>
        ) : (
          <form className="p-5 shadow-xl bg-iflab_white rounded-md">
            <div className="flex flex-col items-start pb-10">
              <h1 className="text-3xl font-bold text-center ">
                Criar nova conta de usuário
              </h1>
              <h1>
                preencha as informações abaixo para criar uma nova conta de
                usuário.
              </h1>
            </div>
            <div className="flex gap-2">
              <div className="w-[30rem] flex flex-col gap-5">
                <div>
                  <label htmlFor="username-input">Nome de usuário</label>
                  <TextInput
                    icon={user}
                    alt="Nome de usuário"
                    placeholder={"Digite aqui seu nome de usuário..."}
                    type={"text"}
                    name={"username-input"}
                  />
                </div>
                <div>
                  <label htmlFor="email-input">Email</label>
                  <TextInput
                    icon={email}
                    alt="Email"
                    placeholder={"Digite aqui seu email..."}
                    type={"email"}
                    name={"email-input"}
                  />
                </div>
                <div>
                  <label htmlFor="password-input">Senha</label>
                  <TextInput
                    alt="Senha"
                    placeholder={"Digite aqui sua senha..."}
                    type={"password"}
                    name={"password-input"}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password-input">
                    Confirmar senha
                  </label>
                  <TextInput
                    alt="Confirmar senha"
                    placeholder={"Digite aqui sua senha..."}
                    type={"password"}
                    name={"confirm-password-input"}
                  />
                </div>
              </div>
              <div className="w-96 border"></div>
            </div>
            <div>
              <h1>Ao se registrar, você concordará com os nossos <a href="" className="text-iflab_gray underline hover:text-iflab_gray_dark">termos de uso</a></h1>
              <div className="flex gap-6 justify-end p-5">
                <TButton text={"Já tem uma conta?"} />
                <PButton text={"Criar conta"} />
              </div>
            </div>
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
