import Password_Input from "../../components/inputs/Password_Input";
import Text_Input from "../../components/inputs/Text_Input";

import Header from "../../components/header/Header";



import Primary_button from "../../components/buttons/Primary_button";
import Secundary_button from "../../components/buttons/Secundary_button";
import Tertiary_button from "../../components/buttons/Tertiary_button";

import user from "../../assets/icons/UI/user.png";
import email from "../../assets/icons/UI/email.png";

function NotFound() {
  return (
    <>
      <Header />
      <div className="bg-iflab_white_light w-screen h-screen flex justify-center items-center flex-col">
        <div className="bg-slate-100 p-5 w-[32rem]">
          <Text_Input
            placeholder="Digite seu nome..."
            icon={user}
            alt="usuário"
          />
          <Text_Input
            placeholder="Digite seu email..."
            icon={email}
            alt="email"
          />
          <Password_Input />
        </div>

        <div className=" w-full flex justify-center gap-10">
          <Primary_button text="Enviar" />
          <Secundary_button text="Cancelar" />
          <Tertiary_button text="Voltar" />
        </div>
      </div>
    </>
  );
}

export default NotFound;
