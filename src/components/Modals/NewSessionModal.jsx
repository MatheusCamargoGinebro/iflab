// O=============================================================================================O */

// Hooks de state:
import React, { useState, useEffect } from "react";

// Imagens e icones:

// Componentes:
import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";
import ErrorModal from "../Modals/ErrorModal";

// API:
import { registerSession } from "../../api/lab_requests";
import { getLabEquipments } from "../../api/equipments_requests";
import { getLabElements } from "../../api/elements_requests";

// O=============================================================================================O */

// Função:
function NewSessionModal({ labId, closeModal }) {
  // +---------------------------------------------------------+

  // States:
  const [page, setPage] = useState(1);

  /* {
    "session_start_at": 1736173800,
    "session_end_at": 1736176200,
    "session_labId": 1
  } */

  const [newSession, setNewSession] = useState({
    session_start_at: Math.floor(Date.now() / 1000) + 600, // Horário de hoje + 10min, em timestamp
    session_end_at: Math.floor(Date.now() / 1000) + 1200, // Horário de hoje + 20min, em timestamp
    session_labId: labId,
  });

  const [checkData, setCheckData] = useState({
    start: false,
    end: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    start: "Informe o horário de início",
    end: "Informe o horário de término",
  });

  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  // +---------------------------------------------------------+

  const [reservedEquipments, setReservedEquipments] = useState([]);
  /* 
    Estrutura:
    [
        {
            "session_id": 2,
            "session_equipment":
            {
                "id": 1,
                "quantity": 5
            }
        },
        {
            "session_id": 2,
            "session_equipment":
            {
                "id": 2,
                "quantity": 3
            }
        },
        {
            "session_id": 2,
            "session_equipment":
            {
                "id": 3,
                "quantity": 1
            }
        },
        ...
    ]
  */

  // +---------------------------------------------------------+

  const [reservedElements, setReservedElements] = useState([]);

  /* Estrutura:
    [
        {
            "session_id": 2,
            "session_element": 
            {
                "id": 1,
                "quantity": 5.69
            }
        },
        {
            "session_id": 2,
            "session_element": 
            {
                "id": 2,
                "quantity": 3.14
            }
        },
        ...
    ]

  */

  // +---------------------------------------------------------+

  const [equipmentsList, setEquipmentsList] = useState(null);
  const [elementsList, setElementsList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const equipments = await getLabEquipments(labId);

      if (equipments.status === false) {
        setEquipmentsList([]);
      } else {
        setEquipmentsList(equipments.data);
      }

      const elements = await getLabElements(labId);

      if (elements.status === false) {
        setElementsList([]);
      } else {
        setElementsList(elements.data);
      }

      return;
    }

    fetchData();

    console.log("Equipamentos:", equipmentsList);
  }, [labId]);

  // +---------------------------------------------------------+

  // Funções:
  function handleStartTimeChange(e) {
    const newStartData = new Date(e.target.value).getTime() / 1000;

    setNewSession({ ...newSession, session_start_at: newStartData });

    if (newStartData < new Date().getTime() / 1000) {
      setCheckData({ ...checkData, start: false });
      setErrorMessage({
        ...errorMessage,
        start: "Sessão não pode começar no passado",
      });

      return;
    }

    if (newStartData >= newSession.session_end_at) {
      setCheckData({ ...checkData, start: false });
      setErrorMessage({
        ...errorMessage,
        start: "Sessão não pode começar após ou durante o término",
      });

      return;
    }

    setCheckData({ ...checkData, start: true });
    setErrorMessage({ ...errorMessage, start: "Insira a data corretamente" });

    return;
  }

  // +---------------------------------------------------------+

  function handleEndTimeChange(e) {
    const newEndData = new Date(e.target.value).getTime() / 1000;
    setNewSession({ ...newSession, session_end_at: newEndData });

    if (newEndData < new Date().getTime() / 1000) {
      setCheckData({ ...checkData, end: false });
      setErrorMessage({
        ...errorMessage,
        end: "Sessão não pode terminar no passado",
      });

      return;
    }

    if (newEndData < newSession.session_start_at) {
      setCheckData({ ...checkData, end: false });
      setErrorMessage({
        ...errorMessage,
        end: "Sessão não pode terminar antes de começar",
      });

      return;
    }

    if (newEndData === newSession.session_start_at) {
      setCheckData({ ...checkData, end: false });
      setErrorMessage({
        ...errorMessage,
        end: "Sessão não pode terminar no mesmo horário que começa",
      });

      return;
    }

    setCheckData({ ...checkData, end: true });
    setErrorMessage({ ...errorMessage, end: "Insira a data corretamente" });

    return;
  }

  // +---------------------------------------------------------+

  async function handleRegisterSession() {
    /*     if (checkData.start === false || checkData.end === false) {
      setRequestError({ status: true, message: "Dados inválidos" });
      return;
    }

    const result = await registerSession(newSession);

    if (result.status === false) {
      setRequestError({ status: true, message: result.message });
      return;
    }

    // Reserva de equipamentos e elementos:

    closeModal(); */
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="w-full">
          <ul className="flex">
            <li
              className={`hover:text-iflab_white w-full flex justify-center cursor-pointer duration-75 pb-3 pt-3 hover:pb-2 hover:pt-4 border-b border-r ${
                page === 1
                  ? "border-b-iflab_white border-r border-iflab_gray_medium"
                  : " border-b-iflab_gray_medium border-iflab_white"
              }  ${
                checkData.start === true && checkData.end === true
                  ? "hover:bg-iflab_green_light"
                  : "bg-iflab_red text-iflab_white hover:bg-iflab_red_dark"
              }`}
              onClick={() => setPage(1)}
            >
              Data
            </li>
            <li
              className={`hover:text-iflab_white hover:bg-iflab_green_light w-full flex justify-center cursor-pointer duration-75 pb-3 pt-3 hover:pb-2 hover:pt-4 border-b border-x  ${
                page === 2
                  ? "border-b-iflab_white border-x border-iflab_gray_medium"
                  : " border-b-iflab_gray_medium border-iflab_white"
              }`}
              onClick={() => setPage(2)}
            >
              Equipamentos
            </li>
            <li
              className={`hover:text-iflab_white hover:bg-iflab_green_light w-full flex justify-center cursor-pointer duration-75 pb-3 pt-3 hover:pb-2 hover:pt-4 border-b border-x  ${
                page === 3
                  ? "border-b-iflab_white border-x border-iflab_gray_medium"
                  : " border-b-iflab_gray_medium border-iflab_white"
              }`}
              onClick={() => setPage(3)}
            >
              Elementos
            </li>
            <li
              className={`border-iflab_gray_light w-full flex justify-center duration-75 pb-3 pt-3 border-b border-l ${
                checkData.start === true && checkData.end === true
                  ? "hover:text-iflab_white hover:bg-iflab_green_light hover:pb-2 hover:pt-4 cursor-pointer"
                  : "text-iflab_gray_light hover:text-iflab_gray cursor-not-allowed"
              } ${
                page === 4
                  ? "border-b-iflab_white border-iflab_gray_medium"
                  : " border-b-iflab_gray_medium border-iflab_white"
              }`}
              onClick={() => {
                if (checkData.start === true && checkData.end === true) {
                  setPage(4);
                } else {
                  setPage(1);
                }
              }}
            >
              Revisar e agendar
            </li>
          </ul>
        </div>

        {page === 1 ? (
          <form
            className="w-full h-full p-6 flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="border-b border-iflab_gray_light">
              <h1 className="text-lg text-iflab_gray font-bold">
                Data de início da sessão
              </h1>
              <div className="w-full p-5">
                <label htmlFor="start" className="text-iflab_gray font-bold">
                  Digite o horário de início:
                </label>
                <input
                  type="datetime-local"
                  id="start"
                  className="w-full h-10 p-3 border border-iflab_gray_light rounded-lg"
                  onChange={(e) => handleStartTimeChange(e)}
                  value={(() => {
                    const date = new Date(newSession.session_start_at * 1000);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    const hours = String(date.getHours()).padStart(2, "0");
                    const minutes = String(date.getMinutes()).padStart(2, "0");
                    return `${year}-${month}-${day}T${hours}:${minutes}`;
                  })()}
                />

                <p
                  className={`text-sm duration-75 ${
                    checkData.start === false
                      ? "text-iflab_red"
                      : "text-iflab_white"
                  }`}
                >
                  {errorMessage.start}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-lg text-iflab_gray font-bold">
                Horário de término da sessão
              </h1>
              <div className="w-full p-5">
                <label htmlFor="end" className="text-iflab_gray font-bold">
                  Hora de término:
                </label>
                <input
                  type="datetime-local"
                  id="end"
                  className="w-full h-10 p-3 border border-iflab_gray_light rounded-lg"
                  onChange={(e) => handleEndTimeChange(e)}
                  value={(() => {
                    const date = new Date(newSession.session_end_at * 1000);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    const hours = String(date.getHours()).padStart(2, "0");
                    const minutes = String(date.getMinutes()).padStart(2, "0");
                    return `${year}-${month}-${day}T${hours}:${minutes}`;
                  })()}
                />

                <p
                  className={`text-sm duration-75 ${
                    checkData.end === false
                      ? "text-iflab_red"
                      : "text-iflab_white"
                  }`}
                >
                  {errorMessage.end}
                </p>
              </div>
            </div>
          </form>
        ) : page === 2 ? (
          <div className="w-full h-full p-6 flex flex-col gap-3">
            <h1 className="text-lg text-iflab_gray font-bold">
              Reservar equipamentos
            </h1>
            {equipmentsList.length === 0 ? (
              <div className="w-full h-full">
                <h1 className="text-iflab_gray">
                  Nenhum equipamento disponível
                </h1>
              </div>
            ) : (
              <></>
            )}

            <div className="w-full h-full flex justify-end items-end">
              <TButton text="Limpar lista" />
            </div>
          </div>
        ) : page === 3 ? (
          <div className="w-full h-full p-6 flex flex-col gap-3">
            <h1 className="text-lg text-iflab_gray font-bold">
              Reservar elementos
            </h1>
          </div>
        ) : (
          <div className="w-full h-full p-6 flex flex-col gap-3">
            <h1 className="text-lg text-iflab_gray font-bold">
              Revisar dados e reservar
            </h1>
            <div className="w-full h-full flex flex-col">
              <h1>
                Horário de início:{" "}
                {new Date(
                  newSession.session_start_at * 1000
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  newSession.session_start_at * 1000
                ).toLocaleTimeString()}
              </h1>
              <h1>
                Horário de término:{" "}
                {new Date(
                  newSession.session_end_at * 1000
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  newSession.session_end_at * 1000
                ).toLocaleTimeString()}
              </h1>

              <div className="w-full h-full max-h-full flex pt-5 mt-5 border-t border-iflab_gray_medium">
                <div className="w-full h-full max-h-full">
                  <h1 className="mb-2">Equipamentos reservados:</h1>
                  <div className="w-full h-[12rem] px-2 gap-2 flex flex-col overflow-y-scroll">
                    {reservedEquipments.length === 0 ? (
                      <h1 className="text-iflab_gray">
                        Nenhum equipamento reservado
                      </h1>
                    ) : (
                      reservedEquipments.map((equipment, index) => (
                        <div key={index} className="p-5 bg-iflab_gray border" />
                      ))
                    )}
                  </div>
                </div>
                <div className="w-full h-full max-h-full">
                  <h1 className="mb-2">Elementos reservados:</h1>
                  <div className="w-full h-[12rem] px-2 gap-2 flex flex-col overflow-y-scroll">
                    {reservedElements.length === 0 ? (
                      <h1 className="text-iflab_gray">
                        Nenhum elemento reservado
                      </h1>
                    ) : (
                      reservedElements.map((element, index) => (
                        <div key={index} className="p-5 bg-iflab_gray border" />
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex justify-end items-end px-2">
                <div className="flex gap-5">
                  <TButton text="Cancelar" onClick={() => closeModal()} />
                  <PButton
                    text="Confirmar"
                    onClick={() => handleRegisterSession()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {requestError.status === true ? (
        <ErrorModal
          message={requestError.message}
          onClose={() => setRequestError({ status: false, message: "" })}
        />
      ) : null}
    </>
  );
}

export default NewSessionModal;
