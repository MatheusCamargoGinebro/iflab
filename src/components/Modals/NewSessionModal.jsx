// O=============================================================================================O */

// Hooks de state:
import React, { useState, useEffect } from "react";

// Imagens e icones:

// Componentes:
import PButton from "../buttons/PButton";
import TButton from "../buttons/TButton";
import ErrorModal from "../Modals/ErrorModal";
import SmallElementCard from "../card/smallElementCard";
import SmallEquipmentCard from "../card/SmallEquipmentCard";

// API:
import { registerSession } from "../../api/lab_requests";
import { getLabEquipments, addEquipment } from "../../api/equipments_requests";
import { getLabElements, addElement } from "../../api/elements_requests";

// O=============================================================================================O */

// Função:
function NewSessionModal({ labId, closeModal }) {
  // +---------------------------------------------------------+

  const [elementList, setElementList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    async function loadElements() {
      const elements = await getLabElements(labId);

      if (elements.status === false) {
        setElementList([]);
      } else {
        setElementList(elements.data);
      }

      return;
    }

    async function loadEquipments() {
      const equipments = await getLabEquipments(labId);

      if (equipments.status === false) {
        setEquipmentList([]);
      } else {
        setEquipmentList(equipments.data);
      }

      return;
    }

    loadElements();
    loadEquipments();
  }, [labId]);

  // +---------------------------------------------------------+

  // States:
  const [page, setPage] = useState(1);

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

  function handleEquipmentIncrease(equipmentId, maxQuantity) {
    // Verificar se o equipamento já está na lista de reservas:
    const equipmentIndex = reservedEquipments.findIndex(
      (item) => item.session_equipment.id === equipmentId
    );

    if (equipmentIndex === -1) {
      setReservedEquipments([
        ...reservedEquipments,
        {
          session_equipment: {
            id: equipmentId,
            quantity: 1,
          },
        },
      ]);
    } else if (
      reservedEquipments[equipmentIndex].session_equipment.quantity <
      maxQuantity
    ) {
      const newEquipments = [...reservedEquipments];
      newEquipments[equipmentIndex].session_equipment.quantity += 1;
      setReservedEquipments(newEquipments);
    }

    return;
  }

  function handleEquipmentDecrease(equipmentId) {
    const equipmentIndex = reservedEquipments.findIndex(
      (item) => item.session_equipment.id === equipmentId
    );

    if (equipmentIndex !== -1) {
      if (reservedEquipments[equipmentIndex].session_equipment.quantity === 1) {
        const newEquipments = [...reservedEquipments];
        newEquipments.splice(equipmentIndex, 1);
        setReservedEquipments(newEquipments);
      } else {
        const newEquipments = [...reservedEquipments];
        newEquipments[equipmentIndex].session_equipment.quantity -= 1;
        setReservedEquipments(newEquipments);
      }
    }

    return;
  }

  function equipmentQuantity(equipmentId) {
    const equipmentIndex = reservedEquipments.findIndex(
      (item) => item.session_equipment.id === equipmentId
    );

    if (equipmentIndex === -1) {
      return 0;
    } else {
      return reservedEquipments[equipmentIndex].session_equipment.quantity;
    }
  }

  // +---------------------------------------------------------+

  const [reservedElements, setReservedElements] = useState([]);

  function handleTypeQuantity(elementId, e, maxQuantity) {
    const newQuantity = parseFloat(e);

    if (isNaN(newQuantity) || newQuantity < 0 || newQuantity > maxQuantity) {
      // Remove da lista de reservas:
      const elementIndex = reservedElements.findIndex(
        (item) => item.session_element.id === elementId
      );

      if (elementIndex !== -1) {
        const newElements = [...reservedElements];
        newElements.splice(elementIndex, 1);
        setReservedElements(newElements);
      }

      return;
    }

    // Verificar se o elemento já está na lista de reservas:
    const elementIndex = reservedElements.findIndex(
      (item) => item.session_element.id === elementId
    );

    // Se não estiver, adicionar:
    if (elementIndex === -1) {
      setReservedElements([
        ...reservedElements,
        {
          session_element: {
            id: elementId,
            quantity: newQuantity,
          },
        },
      ]);
    } else {
      // Se estiver, atualizar a quantidade:
      const newElements = [...reservedElements];
      newElements[elementIndex].session_element.quantity = newQuantity;
      setReservedElements(newElements);
    }

    return;
  }

  function elementQuantity(elementId) {
    const elementIndex = reservedElements.findIndex(
      (item) => item.session_element.id === elementId
    );

    if (elementIndex === -1) {
      return 0;
    } else {
      return parseFloat(
        reservedElements[elementIndex].session_element.quantity
      );
    }
  }

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
    if (checkData.start === false || checkData.end === false) {
      setRequestError({ status: true, message: "Dados inválidos" });
      return;
    }

    const result = await registerSession(
      newSession.session_start_at,
      newSession.session_end_at,
      newSession.session_labId
    );

    if (result.status === false) {
      setRequestError({ status: true, message: result.message });
      return;
    }

    const sessionId = result.newSessionId;

    // Loop para reservar equipamentos foreach:
    reservedEquipments.forEach(async (equipment) => {
      await addEquipment(sessionId, equipment.session_equipment);
    });

    // Loop para reservar elementos foreach:
    reservedElements.forEach(async (element) => {
      await addElement(sessionId, element.session_element);
    });

    closeModal();
    return;
  }

  // +---------------------------------------------------------+

  return (
    !!elementList &&
    !!equipmentList && (
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
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const day = String(date.getDate()).padStart(2, "0");
                      const hours = String(date.getHours()).padStart(2, "0");
                      const minutes = String(date.getMinutes()).padStart(
                        2,
                        "0"
                      );
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
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const day = String(date.getDate()).padStart(2, "0");
                      const hours = String(date.getHours()).padStart(2, "0");
                      const minutes = String(date.getMinutes()).padStart(
                        2,
                        "0"
                      );
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
              {equipmentList.length === 0 ? (
                <div className="w-full h-full">
                  <h1 className="text-iflab_gray">
                    Nenhum equipamento disponível
                  </h1>
                </div>
              ) : (
                <div className="h-full w-full flex justify-center">
                  <div className="w-[32rem] h-full border border-iflab_gray_medium rounded-lg">
                    <div className="grid grid-cols-2 gap-5 w-fit h-fit max-h-[22rem] overflow-y-scroll p-5">
                      {equipmentList.map((equipment) => (
                        <SmallEquipmentCard
                          key={equipment.equipmentId}
                          name={equipment.equipmentName}
                          totalQuantity={equipment.totalQuantity}
                          image={equipment.image}
                          increase={() =>
                            handleEquipmentIncrease(
                              equipment.equipmentId,
                              equipment.totalQuantity
                            )
                          }
                          decrease={() =>
                            handleEquipmentDecrease(equipment.equipmentId)
                          }
                          quantity={equipmentQuantity(equipment.equipmentId)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : page === 3 ? (
            <div className="w-full h-full p-6 flex flex-col gap-3">
              <h1 className="text-lg text-iflab_gray font-bold">
                Reservar elementos
              </h1>
              {elementList.length === 0 ? (
                <div className="w-full h-full">
                  <h1 className="text-iflab_gray">
                    Nenhum elemento disponível
                  </h1>
                </div>
              ) : (
                <div className="h-full w-full flex justify-center">
                  <div className="w-[32rem] h-full border border-iflab_gray_medium rounded-lg">
                    <div className="flex flex-col gap-5 w-full h-fit max-h-[22rem] overflow-y-scroll p-5">
                      {elementList.map((element) => (
                        <>
                          <SmallElementCard
                            key={element.elementId}
                            element={element}
                            onType={(value) =>
                              handleTypeQuantity(
                                element.elementId,
                                value,
                                parseFloat(element.Quantity)
                              )
                            }
                            typed_quantity={elementQuantity(element.elementId)}
                          />

                          {console.log(reservedElements)}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
                          <div
                            key={index}
                            className="p-3 bg-iflab_white_light rounded-lg"
                          >
                            {equipment.session_equipment.quantity}x{" "}
                            {equipmentList.map((item) =>
                              item.equipmentId ===
                              equipment.session_equipment.id
                                ? item.equipmentName
                                : null
                            )}
                          </div>
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
                          <div
                            key={index}
                            className="p-3 bg-iflab_white_light rounded-lg"
                          >
                            {element.session_element.quantity}
                            {/* Percorre a lista padrão e verifica o estado físico para de finir a uidade de medida */}
                            {elementList.map((item) =>
                              item.elementId === element.session_element.id
                                ? item.physicalState === 1
                                  ? "g"
                                  : item.physicalState === 2
                                  ? "mL"
                                  : item.physicalState === 3
                                  ? "un"
                                  : null
                                : null
                            )}
                            {" de "}
                            {elementList.map((item) =>
                              item.elementId === element.session_element.id
                                ? item.elementName
                                : null
                            )}
                          </div>
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
    )
  );
}

export default NewSessionModal;
