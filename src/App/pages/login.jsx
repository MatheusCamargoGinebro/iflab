/* O=============================================================================================O */

// importando hooks do React:
import { useState } from "react";

// importando componentes de inputs e botões:
import TextInput from "../../components/inputs/TextInput";
import PButton from "../../components/buttons/PButton";
import TButton from "../../components/buttons/TButton";

// importando imagens e ícones:
import email from "../../assets/icons/UI/email.png";

import { loginUser } from "../../api/requests";

/* O=============================================================================================O */

// Função de login:
function Login() {
  /*---------------------------------------------------------------*/

  // States:
  const [checkData, setcheckData] = useState({
    email: false,
    password: false,
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  /*---------------------------------------------------------------*/

  // Funções de validação de inputs:
  // Email:
  function handleMailType(e) {
    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(e.target.value) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(e.target.value)
    ) {
      setcheckData({ ...checkData, email: false });
    } else {
      setcheckData({ ...checkData, email: true });
    }

    setUserData({ ...userData, email: e.target.value });

    return;
  }

  // Senha:
  function handlePasswordType(e) {
    setUserData({ ...userData, password: e.target.value });

    if (e.target.value.length <= 0) {
      setcheckData({ ...checkData, password: false });
    } else {
      setcheckData({ ...checkData, password: true });
    }

    return;
  }

  /*---------------------------------------------------------------*/

  // Função de login:

  // Login:
  async function handleLogin() {
    const result = await loginUser(userData.email, userData.password);

    if (result.status) {
      localStorage.setItem("token", result.token);
      window.location.href = "/home";
    } else {
      setError({
        status: true,
        message:
          result.error_at !== "user_password"
            ? result.message
            : "usuário ou senha inválidos!",
      });
    }
  }

  /*---------------------------------------------------------------*/

  // Renderização:
  return (
    <div className="h-screen w-screen bg-iflab_white_dark flex justify-center items-center">
      <form
        className="px-10 pt-5 pb-10 min-w-[28rem] bg-iflab_white rounded-md shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          if (checkData.email && checkData.password) {
            handleLogin();
          }
        }}
      >
        <div className="flex justify-center">
          <h1 className="text-2xl">
            Logar no{" "}
            <span className="font-bold text-iflab_green_light">IFLab</span>
          </h1>
        </div>

        <div className="flex flex-col gap-5 pb-10 py-10">
          <div className="group flex flex-col gap-2">
            <TextInput
              predata={userData.email}
              label="Email"
              type="email"
              name={"email-input"}
              placeholder="Digite seu email..."
              icon={email}
              errorMessage={"Email inválido!"}
              state={userData.email.length === 0 ? true : checkData.email}
              onChange={(e) => handleMailType(e)}
            />
          </div>

          <div className="group flex flex-col gap-2">
            <TextInput
              predata={userData.password}
              label="Senha"
              type="password"
              name={"password-input"}
              placeholder="Digite sua senha..."
              errorMessage={"Senha inválida!"}
              state={userData.password.length === 0 ? true : checkData.password}
              onChange={(e) => handlePasswordType(e)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-5">
          <div className="flex gap-1 items-center">
            <h1>Sem conta?</h1>
            <TButton
              text="Registre-se"
              onClick={() => {
                window.location.href = "/register";
              }}
            />
          </div>
          <PButton
            text="Fazer login"
            disabled={
              checkData.email === false || checkData.password === false
                ? true
                : false
            }
            onClick={(e) => handleLogin(e)}
          />
        </div>
      </form>

      {error.status ? (
        <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen fixed flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-iflab_white rounded-md w-[30rem] shadow-xl p-5">
            <div className="flex justify-center mb-5">
              <h1 className="text-2xl">Houve um erro...</h1>
            </div>
            <div>
              <p className="text-justify flex justify-center items-center p-5 min-h-[5rem] bg-iflab_white_dark rounded-sm w-full h-full">
                {error.message}
              </p>
            </div>
            <div className="flex justify-center pt-5 bottom-0 left-0 w-full">
              <PButton
                text="Tentar novamente"
                onClick={() => setError({ ...error, status: false })}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
