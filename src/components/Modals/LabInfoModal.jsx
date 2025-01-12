// O=============================================================================================O */

// Hooks de state:
import React, { useState } from "react";

// Icones:
import close from "../../assets/icons/UI/close.png";
import schedule from "../../assets/icons/UI/schedule.png";

// Imagens:
import lab_inventory from "../../assets/icons/UI/potion.png";
import access_manegement from "../../assets/icons/UI/access-management.png";
import inventory_relatory from "../../assets/icons/UI/inventory-relatory.png";
import access_relatory from "../../assets/icons/UI/access-relatory.png";

// API:
import { endSession } from "../../api/lab_requests";

// Componentes:
import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";
import SessionListModal from "./SessionListModal";
import NewSessionModal from "./NewSessionModal";
import ReservedItems from "./ReservedItems";

function LabInfoModal({
  labInfo,
  closeModal,
  latestSession,
  sessionList,
  userAccessLevel,
}) {
  const [showSessionList, setShowSessionList] = useState(false);
  const [showAddSession, setShowAddSession] = useState(false);
  const [showReservedItems, setShowReservedItems] = useState({
    show: false,
    session: latestSession.sessionId,
  });

  async function endSessionHandler() {
    const response = await endSession(latestSession.sessionId);

    if (response.status === true) {
      window.location.href = "/home";
    } else {
      alert(response.message);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
        <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col xs:w-full xs:h-full xs:rounded-none">
          <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
            <h1 className="text-lg text-iflab_white">
              Laboratório{" "}
              <span className="font-bold text-iflab_green_light">
                {labInfo.labName}
              </span>
            </h1>
            <img
              src={close}
              alt="close"
              className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>
          <div className="w-full h-full flex flex-col">
            {showSessionList ? (
              <SessionListModal
                sessionList={sessionList}
                closeModal={() => setShowSessionList(false)}
              />
            ) : showAddSession ? (
              <NewSessionModal
                closeModal={() => {
                  setShowAddSession(false);
                  window.location.href = "/home";
                }}
                labId={labInfo.labID}
              />
            ) : showReservedItems.show ? (
              <ReservedItems
                sessionId={showReservedItems.session}
                closeModal={() =>
                  setShowReservedItems({
                    show: false,
                    session: latestSession.sessionId,
                  })
                }
              />
            ) : (
              <>
                <div className="w-full h-full p-5 border-b border-iflab_gray_light">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg text-iflab_gray_dark font-bold">
                      {latestSession.sessionId === 0
                        ? "Nenhuma sessão marcada"
                        : latestSession.sessionFinished === true
                        ? "Última sessão marcada"
                        : latestSession.sessionStarted === true
                        ? "Sessão em andamento"
                        : "Próxima sessão marcada"}
                    </h1>
                    <TButton
                      text={"Ver sessões"}
                      onClick={() => setShowSessionList(true)}
                    />
                  </div>
                  <div className="w-full h-fit p-5 flex flex-col gap-1">
                    {latestSession.sessionId === 0 ? (
                      <>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Usuário responsável: --
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data de início da sessão: --
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data de término da sessão: --
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Usuário responsável: {latestSession.userName}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data de início da sessão: {""}
                          {new Date(
                            latestSession.sessionStartsAt * 1000
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            latestSession.sessionStartsAt * 1000
                          ).toLocaleTimeString()}{" "}
                          {latestSession.sessionStarted === true
                            ? " (iniciada)"
                            : " (agendada)"}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data de término da sessão: {""}
                          {new Date(
                            latestSession.sessionEndsAt * 1000
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            latestSession.sessionEndsAt * 1000
                          ).toLocaleTimeString()}{" "}
                          {latestSession.sessionFinished === true
                            ? " (finalizada)"
                            : latestSession.sessionStarted === true
                            ? " (em andamento)"
                            : ""}
                        </h1>
                      </>
                    )}
                  </div>
                  <div className="w-full flex justify-end items-center bottom-0 gap-5">
                    {userAccessLevel >= 2 &&
                      (latestSession.sessionStarted === true &&
                      latestSession.sessionFinished === false ? (
                        <>
                          <TButton
                            text="Ver insumos"
                            onClick={() =>
                              setShowReservedItems({
                                show: true,
                                session: latestSession.sessionId,
                              })
                            }
                          />

                          <SButton
                            text="Encerrar sessão"
                            onClick={() => endSessionHandler()}
                          />
                          <PButton
                            text="Agendar sessão"
                            icon={schedule}
                            onClick={() => setShowAddSession(true)}
                          />
                        </>
                      ) : (
                        <PButton
                          text="Agendar sessão"
                          icon={schedule}
                          onClick={() => setShowAddSession(true)}
                        />
                      ))}
                  </div>
                </div>
                <div className="w-full h-full p-5 flex flex-col">
                  <h1 className="text-lg text-iflab_gray_dark font-bold ">
                    Informações sobre o laboratório
                  </h1>

                  <div className="grid grid-rows-2 grid-cols-2 gap-5 pt-5">
                    <a
                      href={`/inventory/${labInfo.labID}`}
                      className="flex items-center justify-center gap-2 bg-iflab_white_light hover:bg-iflab_white_dark p-5 pr-7 rounded-lg duration-75"
                    >
                      <img
                        src={lab_inventory}
                        alt="Inventário"
                        className="w-10 h-10"
                      />
                      <h1 className="text-sm text-iflab_gray_dark font-bold text-center">
                        Inventário do <br></br>laboratório
                      </h1>
                    </a>

                    <a
                      href={`/accessmanager/${labInfo.labID}`}
                      className="flex items-center justify-center gap-2 bg-iflab_white_light hover:bg-iflab_white_dark p-5 pr-7 rounded-lg duration-75"
                    >
                      <img
                        src={access_manegement}
                        alt="Gerenciamento de acesso"
                        className="w-10 h-10"
                      />
                      <h1 className="text-sm text-iflab_gray_dark font-bold text-center">
                        Gerenciar acessos <br></br>do laboratório
                      </h1>
                    </a>

                    <a
                      href={"/" /* Ainda não implementado */}
                      className="flex items-center justify-center gap-2 bg-iflab_white_light hover:bg-iflab_white_dark p-5 pr-7 rounded-lg duration-75"
                    >
                      <img
                        src={inventory_relatory}
                        alt="Relatório de inventário"
                        className="w-10 h-10"
                      />
                      <h1 className="text-sm text-iflab_gray_dark font-bold text-center">
                        Gerar relatório de<br></br>inventário
                      </h1>
                    </a>

                    <a
                      href={"/" /* Ainda não implementado */}
                      className="flex items-center justify-center gap-2 bg-iflab_white_light hover:bg-iflab_white_dark p-5 pr-7 rounded-lg duration-75"
                    >
                      <img
                        src={access_relatory}
                        alt="Relatório de acessos"
                        className="w-10 h-10"
                      />
                      <h1 className="text-sm text-iflab_gray_dark font-bold text-center">
                        Gerar relatório de<br></br>acessos
                      </h1>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LabInfoModal;
