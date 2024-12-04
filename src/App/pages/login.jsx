// importando funções de requisicão da API:
import { login } from "../../api/userAuth";

// importando hooks do React:
import { useState } from "react";

// importando componentes de inputs e botões:
import TextInput from "../../components/inputs/textInput";
import PButton from "../../components/buttons/PButton";
import TButton from "../../components/buttons/TButton";

// importando imagens e ícones:
import email from "../../assets/icons/UI/email.png";

function Login() {
  const [tokenAuth, setTokenAuth] = useState(false);

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
      <form className='px-10 pt-5 pb-3 min-w-[28rem] min-h-[28rem] bg-iflab_white rounded-md shadow-md'>
        <div className='flex justify-center'>
          <h1 className='text-2xl'>
            Logar no <span className='font-bold text-iflab_green_light'>IFLab</span>
          </h1>
        </div>

        <div className='flex-col gap-10 py-10'>
          <div className='group flex flex-col gap-2'>
            <label htmlFor='email-input'>Email</label>
            <TextInput
              label='Email'
              type='email'
              placeholder='Digite seu email...'
              name={"email-input"}
              icon={email}
              alt={"Icone de email"}
              onChange={(e) => {
                if (
                  !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(e.target.value) &&
                  !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(e.target.value)
                ) {
                  setcheckData({ ...checkData, email: false });
                } else {
                  setcheckData({ ...checkData, email: true });
                }
              }}
              state={checkData.email}
            />
            <p
              className={
                "text-[#ff0000] text-sm relative duration-150 z-0" +
                " " +
                (checkData.email ? "-top-10" : "top-0")
              }
            >
              {checkData.email ? "" : "Digite um email válido."}{""}
            </p>
          </div>
          <div className='group flex flex-col gap-2'></div>
        </div>
        <div className='flex justify-between items-end gap-5'>
          <TButton
            text='Registrar uma nova conta'
            onClick={() => console.log("Registrar nova conta")}
          />
          <PButton
            text='Fazer login'
            onClick={() => {
              console.log("Enviando dados para autenticação...");
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
