import Header from "../../components/header/Header";
import Card from "../../components/card/Card";
import Primary_button from "../../components/buttons/Primary_button";
import Tertiary_button from "../../components/buttons/Tertiary_button";

import more from "../../assets/icons/UI/more.png";
import close from "../../assets/icons/UI/close.png";

import { useState } from "react";

function Home() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="bg-iflab_white_dark h-full pb-20">
      {showAddForm && (
        <div className="z-50 bg-iflab_gray bg-opacity-50 h-full w-full fixed flex justify-center items-center">
          <div className="bg-iflab_white rounded-lg w-[30rem]">
            <div className="bg-iflab_gray rounded-t-lg flex justify-between p-3">
              <h1 className="text-xl text-iflab_white_light">
                Adicionar um laboratório
              </h1>
              <button
                onClick={() => setShowAddForm(false)}
                className="float-right"
              >
                <img
                  src={close}
                  alt="Fechar formulário de adição de laboratório"
                  className="bg-iflab_gray h-[24px] hover:animate-pulse"
                />
              </button>
            </div>
            <div className="flex flex-col pt-6 px-6 text-iflab_gray">
              <label htmlFor="labName" className="mb-1">Nome do laboratório:</label>
              <input
                type="text"
                id="labName"
                placeholder="Digite o nome do novo laboratório"
                className="p-3 hover:pl-4 hover:border-iflab_gray duration-100 outline-none border-iflab_gray_light border rounded-md"
              />
            </div>
            <div className="flex justify-between text-iflab_gray mt-6 pl-14 p-6">
              <Tertiary_button text="Limpar"/>
              <Primary_button text="Adicionar laboratório" />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-3 right-3 shadow-md rounded-lg bg-iflab_white_light p-5">
        <ul>
          <li>
            <a href="./#">Sign</a>
          </li>
          <li>
            <a href="./#/Home">Home</a>
          </li>
          <li>
            <a href="./#/Inventory">Inventory</a>
          </li>
          <li>
            <a href="./#/AccessManager">AccessManager</a>
          </li>
          <li>
            <a href="./#/NotFoundadasdasd">NotFound</a>
          </li>
        </ul>
      </div>
      <Header />
      <div className="flex flex-col items-center justify-center pt-40 pb-20">
        <h1 className="font-bold text-2xl">
          Clique em um{" "}
          <span className="text-iflab_green_light">laboratório</span> para
          começar
        </h1>
      </div>
      <div className="w-screen flex justify-center ">
        <div className="w-fit grid grid-cols-2 gap-10">
          <Card titulo={"A105"} status={true} />

          <Card
            titulo={"A106"}
            usuarioAtual={"Luigi"}
            dataInicio={"24/03/2024 - 10:30"}
            dataFim={"24/03/2024 - 12:00"}
            status={false}
          />

          <Card titulo={"A107"} status={true} />

          <Card titulo={"A108"} status={true} />

          <Card titulo={"A109"} status={true} />

          <Card
            titulo={"A110"}
            usuarioAtual={"Yoshi"}
            dataInicio={"24/03/2024 - 10:30"}
            dataFim={"24/03/2024 - 12:00"}
            status={false}
          />

          <Card titulo={"A111"} status={true} />

          <Card
            titulo={"A112"}
            usuarioAtual={"Bowser"}
            dataInicio={"24/03/2024 - 10:30"}
            dataFim={"24/03/2024 - 12:00"}
            status={false}
          />

          <Card titulo={"A113"} status={true} />

          <Card titulo={"A114"} status={true} />

          <button
            className="w-[33rem] h-[16rem] bg-iflab_white_light shadow-md rounded-lg hover:shadow-xl flex justify-center items-center text-sm text-iflab_gray_light hover:text-iflab_gray duration-100 flex-col"
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            <img src={more} alt="Adicionar laboratório" />
            Adicionar laboratório
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
