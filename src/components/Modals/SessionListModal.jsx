// O=============================================================================================O */

// Hooks de state:
import React, { useState } from "react";

// Imagens e icones:

// Componentes:
import TButton from "../buttons/TButton";
import ReservedItems from "../Modals/ReservedItems";

// Função:
function SessionListModal({ sessionList, closeModal }) {
  const [showReservedSItems, setShowReservedSItems] = useState({
    show: false,
    session: 0,
  });

  return showReservedSItems.show ? (
    <ReservedItems
      sessionId={showReservedSItems.session}
      closeModal={() => setShowReservedSItems({ show: false, session: 0 })}
    />
  ) : (
    <div className="w-full h-full flex flex-col gap-5 pb-5">
      <div className="flex justify-between items-center pt-5 px-5">
        <h1 className="text-lg text-iflab_gray_dark font-bold">
          Lista de sessões
        </h1>
        <TButton text="Voltar" onClick={closeModal} />
      </div>
      <div className="w-full h-full flex justify-center items-center px-5">
        {sessionList.length > 0 ? (
          <>
            <div className="w-full h-full p-5 pb-0 border border-r-[0px] rounded-l-lg border-iflab_gray_medium">
              <h1>Sessões finalizadas:</h1>
              <div className="w-full h-fit max-h-[22rem] pt-5 rounded-lg flex flex-wrap gap-2 overflow-y-auto">
                {/* sessionFinished === true && sessionStarted === true */}
                {sessionList.map(
                  (session) =>
                    session.sessionFinished === true && (
                      <div
                        className="w-full h-fit p-2 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg duration-75 group cursor-pointer"
                        onClick={() =>
                          setShowReservedSItems({
                            show: true,
                            session: session.sessionId,
                          })
                        }
                        key={session.sessionId}
                      >
                        <h1 className="text-sm text-iflab_gray_dark font-bold">
                          Sessão {session.sessionId} - {session.userName}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data da sessão:{" "}
                          {new Date(
                            session.sessionStartsAt * 1000
                          ).toLocaleDateString()}
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

            <div className="w-full h-full overflow-y-auto p-5 pb-0 border border-l rounded-r-lg border-iflab_gray_medium">
              <h1>Próximas sessões:</h1>
              <div className="w-full h-fit max-h-[22rem] pt-5  gap-2 rounded-lg flex flex-wrap overflow-y-auto">
                {/* sessionFinished === false && (sessionStarted === false || sessionStarted === true) */}
                {sessionList.map(
                  (session) =>
                    session.sessionFinished === false &&
                    session.sessionStarted === false && (
                      <div
                        className="w-full h-fit p-2 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg duration-75 group cursor-pointer"
                        onClick={() =>
                          setShowReservedSItems({
                            show: true,
                            session: session.sessionId,
                          })
                        }
                        key={session.sessionId}
                      >
                        <h1 className="text-sm text-iflab_gray_dark font-bold">
                          Sessão {session.sessionId} - {session.userName}
                        </h1>
                        <h1 className="text-sm text-iflab_gray font-bold">
                          Data da sessão:{" "}
                          {new Date(
                            session.sessionStartsAt * 1000
                          ).toLocaleDateString()}
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
