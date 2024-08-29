import Password_Input from "../../components/inputs/Password_Input";
import Text_Input from "../../components/inputs/Text_Input";

import Header from "../../components/header/Header";



import Primary_button from "../../components/buttons/Primary_button";
import Secundary_button from "../../components/buttons/Secundary_button";
import Tertiary_button from "../../components/buttons/Tertiary_button";

import user from "../../assets/icons/UI/user.png";
import email from "../../assets/icons/UI/email.png";
import Card from "../../components/card/Card";

function NotFound() {
  return (
    <>
      <Header />
      <div className="h-24">

      </div>
      <Card titulo={"Ola tudo bem"} usuarioAtual={"pa"} dataInicio={"ola"} dataFim={"ola"} status={"ola"}/>
    </>
  );
}

export default NotFound;
