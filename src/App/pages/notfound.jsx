import Password_Input from "../../components/inputs/Password_Input";
import Text_Input from "../../components/inputs/Text_Input";

import user from "../../assets/icons/UI/user.png";
import email from "../../assets/icons/UI/email.png";

function NotFound() {
  return (
    <>
      <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
        <div className="bg-slate-100 p-5 w-[120rem]">
          <Text_Input placeholder="Digite seu nome..." icon={user} alt="usuário"/>
          <Text_Input placeholder="Digite seu email..." icon={email} alt="email"/>
          <Password_Input />
        </div>
      </div>
    </>
  );
}

export default NotFound;
