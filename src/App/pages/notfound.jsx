import Password_Input from "../../components/inputs/Password_Input";
import Text_Input from "../../components/inputs/Text_Input";

import Header from "../../components/header/Header";

import Card from "../../components/card/Card";

import more from "../../assets/icons/UI/more.png";

function NotFound() {
  return (
    <div className="bg-iflab_white_dark h-full w-screen">
      <Header />

      <div className="flex flex-col items-center justify-center pt-40 pb-20">
        <h1 className="font-bold text-2xl">
          Clique em um <span className="text-iflab_green_light">laboratório</span> para começar
        </h1>
      </div>
      <div className="w-screen flex justify-center ">
        <div className="w-fit grid grid-cols-2 gap-10">
          <Card
            titulo={"A105"}
            status={true}
          />

          <Card
            titulo={"A106"}
            usuarioAtual={"Luigi"}
            dataInicio={"24/03/2024 - 10:30"}
            dataFim={"24/03/2024 - 12:00"}
            status={false}
          />

          <Card
            titulo={"A107"}
            status={true}
          />

          <Card
            titulo={"A108"}
            status={true}
          />

          <Card
            titulo={"A109"}
            status={true}
          />

          <Card
            titulo={"A110"}
            usuarioAtual={"Yoshi"}
            dataInicio={"24/03/2024 - 10:30"}
            dataFim={"24/03/2024 - 12:00"}
            status={false}
          />

          <Card
            titulo={"A111"}
            status={true}
          />

          <Card
            titulo={"A112"}
            usuarioAtual={"Bowser"}
            dataInicio={"24/03/2024 - 10:30"}
            dataFim={"24/03/2024 - 12:00"}
            status={false}
          />

          <Card
            titulo={"A113"}
            status={true}
          />

          <button className=""><img src={more} alt="Adicionar laboratório" /></button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
