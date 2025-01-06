// O=============================================================================================O */

// Hooks de estados:
import React, { useState, useEffect } from "react";

// API:
import { getLabById, getLabSessions } from "../../api/lab_requests";

// O=============================================================================================O */

// Icones:
import alert from "../../assets/icons/UI/alert.png";
import check from "../../assets/icons/UI/check.png";
import edit from "../../assets/icons/UI/edit.png";
import trash from "../../assets/icons/UI/delete.png";
import closeIcon from "../../assets/icons/UI/close.png";
import potion from "../../assets/icons/UI/potion.png";
import quantity from "../../assets/icons/UI/quantidade.png";

// Componentes:
import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";
import TextInput from "../inputs/TextInput";
import EditLabModal from "../Modals/EditLabModal";

// O=============================================================================================O */

function LabCard({ labId, userAccessLevel }) {
  const [labInfo, setLabInfo] = useState(null);
  const [sessionsList, setSessionsList] = useState([]);
  const [latestSession, setLatestSession] = useState(null);

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const labData = await getLabById(labId);
      const sessionsData = await getLabSessions(labId);

      setLabInfo(labData.lab[0]);
      setSessionsList(sessionsData);

      // Encontra a sessão em andamento, (ou, se não houver sessão em andamento, busca a última sessão que ocorreu)
      if (sessionsData.status) {
        const now = new Date().getTime() / 1000;
        let latestSession = null;

        for (let i = 0; i < sessionsData.data.length; i++) {
          if (
            sessionsData.data[i].sessionStartsAt <= now &&
            sessionsData.data[i].sessionEndsAt >= now
          ) {
            latestSession = sessionsData.data[i];
            break;
          } else if (
            sessionsData.data[i].sessionEndsAt < now &&
            (latestSession === null ||
              latestSession.sessionEndsAt < sessionsData.data[i].sessionEndsAt)
          ) {
            latestSession = sessionsData.data[i];
          }
        }

        setLatestSession(latestSession);
      } else {
        setLatestSession({
          sessionId: 0,
          sessionStartsAt: 0,
          sessionEndsAt: 0,
          sessionStarted: false,
          sessionFinished: false,
          userName: 0,
        });
      }
    }

    fetchData();
  }, [labId]);

  return (
    !!labInfo &&
    !!sessionsList &&
    !!latestSession && (
      <>
        <div className="w-[25rem] h-[15rem] bg-iflab_white_light p-5 rounded-lg shadow-md hover:shadow-xl hover:scale-105 flex flex-col duration-75 group">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg text-iflab_green_light font-bold">
                {labInfo.labName}
              </h1>
              <h1 className="text-sm text-iflab_gray">
                {" "}
                capacidade: {labInfo.capacity}
              </h1>
            </div>
            <h1 className="flex items-center gap-2">
              <img
                src={
                  latestSession.sessionFinished === false &&
                  latestSession.sessionStarted === false
                    ? check
                    : alert
                }
                className="w-5 h-5"
              />
              {latestSession.sessionFinished === false &&
              latestSession.sessionStarted === false
                ? "Livre para reservar"
                : "Em uso atualmente"}
            </h1>
          </div>
          <div className="w-full h-full p-2 flex flex-col gap-2 justify-center">
            {latestSession.sessionId === 0 ? (
              <h1 className="text-sm text-iflab_gray font-bold">
                Nenhuma sessão registrada
              </h1>
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
                  ).toLocaleTimeString()}
                </h1>
                <h1 className="text-sm text-iflab_gray font-bold">
                  Data de término da sessão: {""}
                  {new Date(
                    latestSession.sessionEndsAt * 1000
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    latestSession.sessionEndsAt * 1000
                  ).toLocaleTimeString()}
                </h1>
              </>
            )}
          </div>
          <div className="w-full h-fit flex justify-between items-center">
            <div className="flex gap-2">
              {userAccessLevel >= 2 && (
                <>
                  <img
                    src={edit}
                    alt={"edit"}
                    className="w-7 h-7 p-1 hidden group-hover:block cursor-pointer rounded-full hover:bg-iflab_gray_medium duration-75"
                    onClick={() => setShowEditWindow(true)}
                  />
                  <img
                    src={trash}
                    alt={"delete"}
                    className="w-7 h-7 p-1 hidden group-hover:block cursor-pointer rounded-full hover:bg-iflab_gray_medium duration-75"
                    onClick={() => setShowDeleteWindow(true)}
                  />
                </>
              )}
            </div>
            {latestSession.sessionFinished === false &&
            latestSession.sessionStarted === false ? (
              <PButton text="Ver informações" />
            ) : (
              <SButton text="Ver informações" />
            )}
          </div>
        </div>

        {showEditWindow && (
          <EditLabModal
            labId={labId}
            closeModal={() => setShowEditWindow(false)}
          />
        )}

        {showDeleteWindow && <></>}

        {showMoreInfo && <></>}
      </>
    )
  );
}

export default LabCard;
