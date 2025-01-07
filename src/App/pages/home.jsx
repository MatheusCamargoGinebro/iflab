// O=============================================================================================O */

// Imports:
import React, { useState } from "react";

// Icones:
import addIcon from "../../assets/icons/UI/more.png";

// API:
import { getLabs, registerNewLab } from "../../api/lab_requests";

// Componentes:
import Header from "../../components/header/Header";
import LabCard from "../../components/card/labCard";
import AddLabModal from "../../components/Modals/AddLabModal";

// O=============================================================================================O */

const labs = await getLabs();

function Home() {
  const [labList] = useState(labs.status ? labs.labs : []);

  const [showAddLabModal, setShowAddLabModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="w-screen h-screen pt-32 flex flex-col items-center">
        <Header />
        {labList.length > 0 ? (
          user.campusAdminLevel >= 2 ? (
            <h1 className="text-2xl">
              Clique em um{" "}
              <span className="font-bold text-iflab_green_light">
                laboratório
              </span>{" "}
              para começar
            </h1>
          ) : (
            <h1 className="text-2xl">
              Lista de{" "}
              <span className="font-bold text-iflab_green_light">
                laboratórios
              </span>{" "}
              que você possui acesso
            </h1>
          )
        ) : user.campusAdminLevel >= 2 ? (
          <h1 className="text-2xl">
            Não há{" "}
            <span className="font-bold text-iflab_green_light">
              laboratórios
            </span>{" "}
          </h1>
        ) : (
          <h1 className="text-2xl">
            Você ainda não pertence a nenhum{" "}
            <span className="font-bold text-iflab_green_light">
              laboratório
            </span>
          </h1>
        )}

        <div className="h-fit max-h-full w-fit overflow-y-auto p-10 mt-10 gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {labList.map((lab) => (
            <LabCard
              key={lab.labId}
              labId={lab.labId}
              userAccessLevel={lab.userLevel}
            />
          ))}
          {user.campusAdminLevel >= 2 ? (
            <div
              className="w-[25rem] h-[15rem] bg-iflab_white_light rounded-lg shadow-md hover:shadow-xl hover:scale-105 flex flex-col justify-center items-center duration-75 cursor-pointer"
              onClick={() => setShowAddLabModal(true)}
            >
              <img src={addIcon} alt="Adicionar" className="w-32 h-32" />
              <h1 className="text-lg">Adicionar novo laboratório</h1>
            </div>
          ) : null}
        </div>
      </div>
      {showAddLabModal ? (
        <AddLabModal closeModal={() => setShowAddLabModal(false)} />
      ) : null}
    </>
  );
}

export default Home;
