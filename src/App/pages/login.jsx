/* O=============================================================================================O */

// importando hooks do React:
import { useState } from "react";

// importando componentes de inputs e botões:
import TextInput from "../../components/inputs/textInput";
import PButton from "../../components/buttons/PButton";
import TButton from "../../components/buttons/TButton";

// importando imagens e ícones:
import email from "../../assets/icons/UI/email.png";

/* O=============================================================================================O */

// Função de verificação do input de email:
function checkEmail(email) {
  if (
    !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(email) &&
    !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(email)
  ) {
    return false;
  } else {
    return true;
  }
}

// Função de verificação do input de senha:
function checkPassword(password) {
  if (password.length < 0) {
    return false;
  } else {
    return true;
  }
}

/* O=============================================================================================O */

// Função de requisitar login:
const login = async (email, password) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_email: email, user_password: password }),
  };

  try {
    const response = await fetch("http://localhost:3333/user/login", options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: "Erro ao requisitar login!" };
  }
};

/* O=============================================================================================O */

// Função de login:
function Login() {
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

  return (
    <div className='h-screen w-screen bg-iflab_white_dark flex justify-center items-center'>
      <form className='px-10 pt-5 pb-10 min-w-[28rem] bg-iflab_white rounded-md shadow-md'>
        <div className='flex justify-center'>
          <h1 className='text-2xl'>Logar no <span className='font-bold text-iflab_green_light'>IFLab</span></h1>
        </div>

        <div className='flex flex-col gap-5 pb-10 py-10'>

          <div className='group flex flex-col gap-2'>
            <label htmlFor='email-input' className='text-iflab_gray group-hover:text-iflab_gray_dark'>Email</label>
            <TextInput label='Email' type='email' name={"email-input"} placeholder='Digite seu email...' icon={email} errorMessage={"Email inválido!"}
              state={userData.email.length === 0 ? true : checkData.email}
              onChange={(e) => {
                if (!checkEmail(e.target.value)) {
                  setcheckData({ ...checkData, email: false });
                } else {
                  setcheckData({ ...checkData, email: true });
                }

                setUserData({ ...userData, email: e.target.value });
              }} />
          </div>

          <div className='group flex flex-col gap-2'>
            <label htmlFor='password-input' className='text-iflab_gray group-hover:text-iflab_gray_dark'> Senha </label>
            <TextInput label='Senha' type='password' name={"password-input"} placeholder='Digite sua senha...' errorMessage={"Senha inválida!"}
              state={userData.password.length === 0 ? true : checkData.password}
              onChange={(e) => {
                if (!checkPassword(e.target.value)) {
                  setcheckData({ ...checkData, password: false });
                } else {
                  setcheckData({ ...checkData, password: true });
                }

                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </div>

        </div>

        <div className='flex justify-between items-end gap-5'>
          <TButton
            text='Registrar uma nova conta'
            onClick={() => {
              window.location.href = "#/register";
            }} />

          <PButton
            text='Fazer login'
            disabled={!(checkData.email && checkData.password)}
            onClick={() => {
              login(userData.email, userData.password).then((response) => {
                if (response.status || response.auth) {
                  // Logou
                    window.location.href = "#/home";
                } else {
                  // Erro
                  setError({ status: true, message: response.error_at !== "user_password" ? response.message : "usuário ou senha inválidos!" });
                }
              });
            }} />
        </div>
      </form>
      {error.status ? (
        <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen fixed flex justify-center items-center z-50">
          <div className="bg-iflab_white rounded-md w-[30rem] shadow-xl p-5">
            <div className="flex justify-center mb-5">
              <h1 className="text-2xl">Houve um erro...</h1>
            </div>
            <div>
              <p className="text-justify flex justify-center items-center p-5 min-h-[5rem] bg-iflab_white_dark rounded-sm w-full h-full">{error.message}</p>
            </div>
            <div className="flex justify-center pt-5 bottom-0 left-0 w-full">
              <PButton text="Tentar novamente" onClick={() => setError({ ...error, status: false })} />
            </div>
          </div>
        </div>) : null}
    </div>
  );
}

export default Login;
