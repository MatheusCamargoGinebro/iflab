import React, { useEffect, useState } from "react";

// Icones:
import addIcon from "../../assets/icons/UI/more.png";
import potion from "../../assets/icons/UI/potion.png";
import quantity from "../../assets/icons/UI/quantidade.png";

// API:
import { getLabs, checktoken, registerLab } from "../../api/requests";
import closeIcon from "../../assets/icons/UI/close.png";

// Componentes:
import Header from "../../components/header/Header";
import LabCard from "../../components/card/labCard";
import TextInput from "../../components/inputs/TextInput";
import PButton from "../../components/buttons/PButton";
import TButton from "../../components/buttons/TButton";

function Home() {
  const [labs, setLabs] = useState([]);
  const [showAddLabBtn, setShowAddLabBtn] = useState(false);
  const [showNewLabMenu, setShowNewLabMenu] = useState(false);
  const [formError, setFormError] = useState({
    status: false,
    message: "",
  });

  const [newLab, setNewLab] = useState({
    lab_name: "",
    lab_capacity: "",
  });
  const [checkData, setCheckData] = useState({
    name: false,
    capacity: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "Sem erros",
    capacity: "Sem erros",
  });

  function handleNameType(e) {
    const name = e.target.value;

    setNewLab({ ...newLab, lab_name: name });

    if (name.length < 3) {
      setCheckData({ ...checkData, name: false });
      setErrorMessage({
        ...errorMessage,
        name: "Deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (name.length > 16) {
      setCheckData({ ...checkData, name: false });
      setErrorMessage({
        ...errorMessage,
        name: "Deve ter no máximo 16 caracteres",
      });

      return;
    }

    setCheckData({ ...checkData, name: true });
    setErrorMessage({ ...errorMessage, name: "Sem erros" });

    return;
  }

  function handleCapacityType(e) {
    const capacity = parseInt(e.target.value);

    setNewLab({ ...newLab, lab_capacity: capacity });

    if (capacity < 1) {
      setCheckData({ ...checkData, capacity: false });
      setErrorMessage({
        ...errorMessage,
        capacity: "Deve ser maior que 0",
      });

      return;
    }

    setCheckData({ ...checkData, capacity: true });
    setErrorMessage({ ...errorMessage, capacity: "Sem erros" });

    return;
  }

  async function registerNewLab() {
    const data = await registerLab(newLab);

    if (data.status) {
      setNewLab({ lab_name: "", lab_capacity: "" });
      setCheckData({ name: false, capacity: false });
      setErrorMessage({ name: "Sem erros", capacity: "Sem erros" });
      getLabsData();
    } else {
      setFormError({ status: true, message: data.message });
    }

    setShowNewLabMenu(false);
  }

  async function getLabsData() {
    const data = await getLabs();

    if (data.status) {
      setLabs(data.labs);
    }
  }

  useEffect(() => {
    getLabsData();
    checkToken();
  }, []);

  async function checkToken() {
    const user = await checktoken();

    if (user.data.campusAdminLevel >= 2) {
      setShowAddLabBtn(true);
    } else {
      setShowAddLabBtn(false);
    }
  }

  return (
    <>
      <Header />
      <div className="w-screen h-screen flex flex-col items-center pt-32 px-32 bg-iflab_white_dark">
        <div className="w-full flex justify-center items-center py-5">
          <h1 className="text-xl">
            Todos os{" "}
            <span className="font-bold text-iflab_green_light">
              laboratórios
            </span>{" "}
            do Instituto em que você possui acesso:
          </h1>
        </div>
        <div className="w-full h-full overflow-auto flex justify-center">
          <div className="px-5 py-10 grid grid-cols-3 gap-5 w-fit h-fit hfit">
            {labs.map((lab) => (
              <LabCard key={lab.labId} labId={lab.labId} />
            ))}

            {showAddLabBtn && (
              <div
                className="w-[33rem] h-[17rem] bg-iflab_white_light rounded-lg shadow-md hover:shadow-xl hover:scale-105 flex flex-col justify-center items-center py-5 px-7 duration-75 cursor-pointer"
                onClick={() => setShowNewLabMenu(true)}
              >
                <img
                  src={addIcon}
                  alt="Adicionar laboratório"
                  className="h-32 w-32"
                />
                <h1>Adicionar laboratório</h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {showNewLabMenu && (
        <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen top-0 left-0 fixed flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-iflab_white shadow-lg rounded-lg min-w-96 flex flex-col gap-5">
            <div className="bg-iflab_gray_dark rounded-t-lg flex justify-between items-center p-3">
              <h1 className="text-lg text-iflab_white">
                Adicionar um novo laboratório
              </h1>
              <img
                src={closeIcon}
                alt="Fechar"
                className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
                onClick={() => setShowNewLabMenu(false)}
              />
            </div>
            <div className="px-5">
              <TextInput
                predata={newLab.lab_name}
                label="Nome do novo laboratório"
                type={"text"}
                icon={potion}
                name={"lab-name-input"}
                errorMessage={errorMessage.name}
                state={newLab.lab_name.length === 0 ? true : checkData.name}
                onChange={(e) => handleNameType(e)}
              />

              <TextInput
                predata={newLab.lab_capacity}
                label="Capacidade do novo laboratório"
                type={"number"}
                icon={quantity}
                name={"lab-capacity-input"}
                errorMessage={errorMessage.capacity}
                state={
                  newLab.lab_capacity.length === 0 ? true : checkData.capacity
                }
                onChange={(e) => handleCapacityType(e)}
              />

              <div className="flex gap-5 justify-end py-5">
                <TButton
                  text={"Limpar"}
                  onClick={() => {
                    setNewLab({ lab_name: "", lab_capacity: "" });
                    setCheckData({ name: false, capacity: false });
                    setErrorMessage({
                      name: "Sem erros",
                      capacity: "Sem erros",
                    });
                  }}
                />
                <PButton
                  text={"Salvar"}
                  disabled={!checkData.name || !checkData.capacity}
                  onClick={registerNewLab}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {formError.status && (
        <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen fixed flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-iflab_white rounded-md w-[30rem] shadow-xl p-5">
            <div className="flex justify-center mb-5">
              <h1 className="text-2xl">Houve um erro...</h1>
            </div>
            <div>
              <p className="text-justify flex justify-center items-center p-5 min-h-[5rem] bg-iflab_white_dark rounded-sm w-full h-full">
                {formError.message}
              </p>
            </div>
            <div className="flex justify-center pt-5 bottom-0 left-0 w-full">
              <PButton
                text="Tentar novamente"
                onClick={() => setFormError({ status: false, message: "" })}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
