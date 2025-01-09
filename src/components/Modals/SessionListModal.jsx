// O=============================================================================================O */

// Hooks de state:
import React, { useState, useEffect } from "react";

// Imagens e icones:

// Componentes:
import TButton from "../buttons/TButton";

// Função:
function SessionListModal({ sessionList, closeModal }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center pt-5 px-5">
        <h1 className="text-lg text-iflab_gray_dark font-bold">
          Lista de sessões
        </h1>
        <TButton text="Voltar" onClick={closeModal} />
      </div>
      <div className="w-full h-[80%] flex justify-center items-center px-5">
        {sessionList.status ? (
          <>
            <div className="w-full h-[90%] p-5 border border-r-[0px] rounded-l-lg border-iflab_gray_medium">
              <h1>Sessões finalizadas:</h1>
              <div className="w-full h-fit max-h-[95%] grid grid-cols-1 gap-2 p-2 overflow-y-auto">
                {sessionList.data.map(
                  (session) =>
                    session.sessionFinished === true && (
                      <div
                        className="w-full h-fit p-2 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg duration-75"
                        key={session.sessionId}
                      >
                        <h1 className="text-sm text-iflab_gray_dark font-bold">
                          Sessão {session.sessionId} - {session.userName}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data da sessão:{" "}
                          {new Date(
                            session.sessionStartsAt * 1000
                          ).toLocaleDateString()}{" "}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Horário da sessão:{" "}
                          {new Date(
                            session.sessionStartsAt * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(
                            session.sessionEndsAt * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h1>
                      </div>
                    )
                )}
              </div>
            </div>

            <div className="w-full h-[90%] overflow-y-auto p-5 border border-l-[0.5px] rounded-r-lg border-iflab_gray_medium">
              <h1>Próximas sessões:</h1>
              <div className="w-full h-fit max-h-[95%] grid grid-cols-1 gap-2 p-2 overflow-y-auto">
                {sessionList.data.map(
                  (session) =>
                    session.sessionStarted === false && (
                      <div
                        className="w-full h-fit p-2 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg duration-75"
                        key={session.sessionId}
                      >
                        <h1 className="text-sm text-iflab_gray_dark font-bold">
                          Sessão {session.sessionId} - {session.userName}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data da sessão:{" "}
                          {new Date(
                            session.sessionStartsAt * 1000
                          ).toLocaleDateString()}{" "}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Horário da sessão:{" "}
                          {new Date(
                            session.sessionStartsAt * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(
                            session.sessionEndsAt * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h1>
                      </div>
                    )
                )}
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-sm text-iflab_gray font-bold">
            Nenhuma sessão encontrada
          </h1>
        )}
      </div>
    </div>
  );
}

export default SessionListModal;
