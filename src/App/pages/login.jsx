// importando hooks do React:
import { useState } from "react";

// importando funções de requisicão da API:
import { login } from "../../api/userAuth";

// importando componentes de inputs e botões:
import TextInput from "../../components/inputs/textInput";
import PButton from "../../components/buttons/PButton";
import TButton from "../../components/buttons/TButton";

// importando imagens e ícones:
import email from "../../assets/icons/UI/email.png";

function Login() {
  const [checkData, setcheckData] = useState({
    email: false,
    password: false,
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className='h-screen w-screen bg-iflab_white_dark flex justify-center items-center'>
      <form className='px-10 pt-5 pb-10 min-w-[28rem] bg-iflab_white rounded-md shadow-md'>
        <div className='flex justify-center'>
          <h1 className='text-2xl'>
            Logar no <span className='font-bold text-iflab_green_light'>IFLab</span>
          </h1>
        </div>

        <div className='flex flex-col gap-5 pb-10 py-10'>
          <div className='group flex flex-col gap-2'>
            <label
              htmlFor='email-input'
              className='text-iflab_gray group-hover:text-iflab_gray_dark'
            >
              Email
            </label>
            <TextInput
              label='Email'
              type='email'
              placeholder='Digite seu email...'
              name={"email-input"}
              icon={email}
              state={userData.email.length === 0 ? true : checkData.email}
              errorMessage={"Email inválido!"}
              onChange={(e) => {
                if (
                  !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(e.target.value) &&
                  !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(e.target.value)
                ) {
                  setcheckData({ ...checkData, email: false });
                } else {
                  setcheckData({ ...checkData, email: true });
                }

                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </div>
          <div className='group flex flex-col gap-2'>
            <label
              htmlFor='password-input'
              className='text-iflab_gray group-hover:text-iflab_gray_dark'
            >
              Senha
            </label>
            <TextInput
              label='Senha'
              type='password'
              placeholder='Digite sua senha...'
              name={"password-input"}
              state={userData.password.length === 0 ? true : checkData.password}
              errorMessage={"Senha inválida!"}
              onChange={(e) => {
                if (e.target.value.length < 0) {
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
            }}
          />
          <PButton
            text='Fazer login'
            onClick={() => {
              login(userData.email, userData.password);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
