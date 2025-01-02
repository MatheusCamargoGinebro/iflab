import React, { useEffect, useState } from "react";

import {
  getLabById,
  getSessionsByLabId,
  editLabName,
  editLabCapacity,
} from "../../api/requests";

import alert from "../../assets/icons/UI/alert.png";
import check from "../../assets/icons/UI/check.png";
import edit from "../../assets/icons/UI/edit.png";
import trash from "../../assets/icons/UI/delete.png";
import closeIcon from "../../assets/icons/UI/close.png";
import potion from "../../assets/icons/UI/potion.png";
import quantity from "../../assets/icons/UI/quantidade.png";

import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";
import TextInput from "../inputs/TextInput";

function LabCard({ labId }) {
  const [lab, setLab] = useState({});

  async function getLabData() {
    const data = await getLabById(labId);

    if (data.status) {
      setLab(data.lab[0]);
    }
  }

  const [session, setSession] = useState({});

  async function getSessionsData() {
    const data = await getSessionsByLabId(labId);

    if (data.status) {
      // Percorre toda a lista de sessões do laboratório e identifica a que estiver mais próxima de acontecer, a que está acontecendo, ou a última que aconteceu.
    } else {
      setSession({
        sessionId: 0,
        sessionStartsAt: "--",
        sessionEndsAt: "--",
        sessionStarted: false,
        sessionEnded: false,
        userName: "--",
      });
    }
  }

  useEffect(() => {
    getLabData();
    getSessionsData();
  }, []);

  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const [newLabData, setNewLabData] = useState({
    labName: "",
    labCapacity: 0,
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

    setNewLabData({ ...newLabData, labName: name });

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

    setNewLabData({ ...newLabData, labCapacity: capacity });

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
  }

  async function handleEditLab() {
    const checkChangeDemands = {
      name: checkData.name && newLabData.labName !== lab.labName,
      capacity:
        checkData.capacity && newLabData.labCapacity !== lab.labCapacity,
    };

    const metDemand = {
      name: false,
      capacity: false,
    };

    if (checkChangeDemands.name) {
      const data = await editLabName(newLabData.labName, labId);

      if (data.status) {
        setNewLabData({ ...newLabData, labName: lab.labName });
        setErrorMessage({ ...errorMessage, name: data.message });
        metDemand.name = true;
      } else {
        setCheckData({ ...checkData, name: false });
        setErrorMessage({ ...errorMessage, name: data.message });
      }
    } else {
      metDemand.name = true;
    }

    if (checkChangeDemands.capacity) {
      const data = await editLabCapacity(newLabData.labCapacity, labId);

      if (data.status) {
        setNewLabData({ ...newLabData, labCapacity: lab.labCapacity });
        setErrorMessage({ ...errorMessage, capacity: data.message });
        metDemand.capacity = true;
      } else {
        setCheckData({ ...checkData, capacity: false });
        setErrorMessage({ ...errorMessage, capacity: data.message });
      }
    } else {
      metDemand.capacity = true;
    }

    if (metDemand.name && metDemand.capacity) {
      setShowEditMenu(false);

      setNewLabData({ labName: "", labCapacity: 0 });
      setCheckData({ name: false, capacity: false });
      setErrorMessage({ name: "Sem erros", capacity: "Sem erros" });

      getLabData();
    }

    return;
  }

  return (
    <>
      <div className="group w-[33rem] h-[17rem] bg-iflab_white_light rounded-lg shadow-md hover:shadow-xl hover:scale-105 flex flex-col justify-between gap-7 py-5 px-7 duration-75">
        <div className="flex justify-between">
          <h1 className="text-lg">
            Laboratório{" "}
            <span className="font-bold text-iflab_green">{lab.labName}</span>
          </h1>
          <h1 className="flex items-center gap-2">
            <img
              src={session.Started && session.Ended ? alert : check}
              alt="Status"
              className="w-5 h-5"
            />{" "}
            {session.Started && session.Ended
              ? "Laboratório em uso"
              : "Laboratório disponível"}
          </h1>
        </div>
        <div>
          <h1>Usuário atual: {session.userName}</h1>
          <h1>Horário de início da sessão: {session.sessionStartsAt}</h1>
          <h1>Horário de término da sessão: {session.sessionEndsAt}</h1>
        </div>
        <div className="flex justify-between items-center gap-5">
          <div className="flex gap-2">
            <img
              src={edit}
              alt="Editar"
              className="hidden group-hover:block w-7 h-7 rounded-full bg-iflab_white_dark hover:bg-iflab_gray_light border border-iflab_white_dark p-1 hover:border-iflab_gray_light cursor-pointer"
              onClick={() => setShowEditMenu(true)}
            />
            <img
              src={trash}
              alt="Deletar"
              className="hidden group-hover:block w-7 h-7 rounded-full bg-iflab_white_dark hover:bg-iflab_gray_light border border-iflab_white_dark p-1 hover:border-iflab_gray_light cursor-pointer"
              onClick={() => setShowDeleteMenu(true)}
            />
          </div>
          {session.Started && session.Ended ? (
            <SButton text="Ver detalhes" />
          ) : (
            <PButton text="Iniciar sessão" />
          )}
        </div>
      </div>
      {showEditMenu && (
        <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen top-0 left-0 fixed flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-iflab_white shadow-lg rounded-lg min-w-fit flex flex-col gap-5">
            <div className="bg-iflab_gray_dark rounded-t-lg flex justify-between items-center p-3 gap-14">
              <h1 className="text-lg text-iflab_white">
                Editar informações do laboratório{" "}
                <span className="font-bold text-iflab_green_light">
                  {lab.labName}
                </span>
              </h1>
              <img
                src={closeIcon}
                alt="Fechar"
                className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
                onClick={() => setShowEditMenu(false)}
              />
            </div>
            <div className="px-5">
              <TextInput
                predata={!newLabData.labName ? "" : newLabData.labName}
                label={"Novo nome do laboratório"}
                type={"text"}
                icon={potion}
                name={"lab-name-input"}
                onChange={(e) => handleNameType(e)}
                state={newLabData.labName.length === 0 ? true : checkData.name}
                errorMessage={errorMessage.name}
              />

              <TextInput
                predata={!newLabData.labCapacity ? "" : newLabData.labCapacity}
                label={"Nova capacidade do laboratório"}
                type={"number"}
                icon={quantity}
                name={"lab-capacity-input"}
                onChange={(e) => handleCapacityType(e)}
                state={!newLabData.labCapacity ? true : checkData.capacity}
                errorMessage={errorMessage.capacity}
              />

              <div className="flex gap-5 justify-end py-5">
                <TButton
                  text={"Limpar"}
                  onClick={() => {
                    setNewLabData({ labName: "", labCapacity: 0 });
                    setCheckData({ name: false, capacity: false });
                    setErrorMessage({
                      name: "Sem erros",
                      capacity: "Sem erros",
                    });
                  }}
                />
                <PButton text={"Salvar"} onClick={() => handleEditLab()} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LabCard;
