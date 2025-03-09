/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Importando componentes:
import Header from "../../components/header/Header";

// API:
import { getLabUsers, getCampusUsers } from "../../api/user_requests";
import {
  getLabById,
  addUserToLab,
  removeUserFromLab,
  turnLabAdmin,
  removeLabAdmin,
  getLabUserRelation,
} from "../../api/lab_requests";

// Importando imagens e ícones:
import userIcon from "../../assets/icons/UI/user.png";

/* O=============================================================================================O */

function AccessManager() {
  const [labUserlist, setLabUserlist] = useState(null);
  const [notInLabUserlist, setNotInLabUserlist] = useState(null);
  const [campusUserlist, setCampusUserlist] = useState(null);
  const [labInfo, setLab] = useState(null);
  const { id } = useParams();
  const labId = parseInt(id);

  const [page, setPage] = useState(1);
  const [selectedLabUser, setSelectedLabUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userLab = await getLabUserRelation(labId);

      if ((userLab.status && userLab.data.userLevel <= 2) || !userLab.status) {
        window.location.href = "/home";
      } else {
        const labResponse = await getLabUsers(labId);

        if (labResponse.status) {
          setLabUserlist(labResponse.users);
        } else {
          setLabUserlist([]);
        }

        const lab = await getLabById(labId);

        if (!lab.status) {
          window.location.href = "/home";
        } else {
          setLab(lab.lab);
        }

        const campusResponse = await getCampusUsers(lab.lab.campusID);

        if (campusResponse.status) {
          setCampusUserlist(campusResponse.users);
        }

        if (labResponse.status && campusResponse.status) {
          const notInLabUserlist = campusResponse.users.filter((campusUser) => {
            return !labResponse.users.find(
              (labUser) => labUser.userId === campusUser.userId
            );
          });

          setNotInLabUserlist(notInLabUserlist);
        }
      }

      return;
    }

    fetchData();
  }, [labId]);

  // +---------------------------------------------------------------------------------+

  async function handleAddUserToLab(userId) {
    const response = await addUserToLab(userId, labId);

    if (response.status) {
      window.location.reload();
    } else {
      console.log(response.message);
    }
  }

  async function handleRemoveUserFromLab(userId) {
    const response = await removeUserFromLab(userId, labId);

    if (response.status) {
      window.location.reload();
    } else {
      console.log(response.message);
    }
  }

  async function handleTurnLabAdmin(userId) {
    const response = await turnLabAdmin(userId, labId);

    if (response.status) {
      window.location.reload();
    } else {
      console.log(response.message);
    }
  }

  async function handleRemoveLabAdmin(userId) {
    const response = await removeLabAdmin(userId, labId);

    if (response.status) {
      window.location.reload();
    } else {
      console.log(response.message);
    }
  }

  // +---------------------------------------------------------------------------------+

  return (
    !!labUserlist &&
    !!campusUserlist &&
    !!notInLabUserlist && (
      <>
        <div className="w-screen h-screen flex flex-col pb-0 overflow-hidden">
          <Header />

          <div
            className=" z-50 w-fit h-fit m-5 p-5 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg shadow-lg cursor-pointer duration-75 fixed"
            onClick={() => (window.location.href = "/home")}
          >
            <h1>Voltar para tela inicial</h1>
          </div>

          <div className="lg:pb-28 lg:gap-28 lg:px-28 mt-28 w-full h-full flex lg:flex-row items-center justify-center">
            <div className="w-full h-full lg:rounded-lg">
              <div className="w-full h-fit p-2 pl-5 bg-iflab_gray_dark lg:rounded-t-lg">
                <h1 className="text-xl text-iflab_white">
                  Sem acesso ao laboratório{" "}
                  <span className="font-bold text-iflab_green_light">
                    {labInfo.labName}
                  </span>
                </h1>
              </div>

              <div className="w-full h-[50rem] border border-t-0 border-iflab_gray_dark rounded-b-lg overflow-hidden">
                <div className="w-full h-fit max-h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10 pt-20 overflow-y-auto">
                  {notInLabUserlist.map((user) => (
                    <div
                      key={user.userId}
                      className="w-36 p-5 gap-3 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg shadow-md hover:shadow-lg hover:scale-105 flex flex-col items-center justify-center cursor-pointer duration-75"
                      onClick={() => handleAddUserToLab(user.userId)}
                    >
                      <div className="flex items-center justify-center">
                        <img
                          src={user.userImage || userIcon}
                          alt="User"
                          className={`w-20 h-20 object-cover rounded-full ${
                            !user.userImage &&
                            "border rounded-full p-1 border-iflab_gray_medium"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <h1>{user.userName.split(" ")[0]}</h1>
                        <h1 className="text-iflab_gray text-sm">
                          {user.userType === 1
                            ? "Aluno"
                            : user.userType === 2
                            ? "Professor"
                            : "Funcionário"}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full h-full lg:rounded-lg">
              <div className="w-full h-fit p-2 pl-5 bg-iflab_gray_dark lg:rounded-t-lg">
                <h1 className="text-xl text-iflab_white">
                  Com acesso ao laboratório{" "}
                  <span className="font-bold text-iflab_green_light">
                    {labInfo.labName}
                  </span>
                </h1>
              </div>

              <div className="w-full h-[50rem] flex flex-col border border-t-0 border-iflab_gray_dark rounded-b-lg overflow-hidden">
                <div className="w-full h-fit">
                  <ul className="flex">
                    <li
                      className={`w-full flex items-center justify-center p-2 border-b border-r duration-75 border-iflab_gray_medium ${
                        page === 1
                          ? "border-b-0 hover:text-iflab_gray"
                          : "border-r-0 hover:bg-iflab_green_light hover:text-iflab_white cursor-pointer"
                      }`}
                      onClick={() => {
                        setPage(1);
                        setSelectedLabUser(null);
                      }}
                    >
                      Acesso comum
                    </li>
                    <li
                      className={`w-full flex items-center justify-center p-2 border-b border-x duration-75 border-iflab_gray_medium ${
                        page === 2
                          ? "border-b-0 hover:text-iflab_gray"
                          : "border-x-0 hover:bg-iflab_green_light hover:text-iflab_white cursor-pointer"
                      }`}
                      onClick={() => {
                        setPage(2);
                        setSelectedLabUser(null);
                      }}
                    >
                      Administrador
                    </li>
                    <li
                      className={`w-full flex items-center justify-center p-2 border-b border-l duration-75 border-iflab_gray_medium ${
                        page === 3
                          ? "border-b-0 hover:text-iflab_gray"
                          : "border-l-0 hover:bg-iflab_green_light hover:text-iflab_white cursor-pointer"
                      }`}
                      onClick={() => {
                        setPage(3);
                        setSelectedLabUser(null);
                      }}
                    >
                      Responsável
                    </li>
                  </ul>
                </div>

                <div className="h-full w-full flex flex-col">
                  <div className="w-full h-fit max-h-[44.5rem] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10 overflow-y-auto">
                    {labUserlist
                      .filter((user) => user.userLevel === page)
                      .map((user) => (
                        <div
                          key={user.userId}
                          className={`w-36 p-5 gap-3 border hover:bg-iflab_white_dark rounded-lg shadow-md hover:shadow-lg hover:scale-105 flex flex-col items-center justify-center cursor-pointer duration-75 ${
                            user.userId === selectedLabUser
                              ? "bg-iflab_white_dark border-iflab_gray_medium"
                              : "bg-iflab_white_light border-iflab_white_light"
                          }`}
                          onClick={() => setSelectedLabUser(user.userId)}
                        >
                          <div className="flex items-center justify-center">
                            <img
                              src={user.userImage || userIcon}
                              alt="User"
                              className={`w-20 h-20 object-cover rounded-full ${
                                !user.userImage &&
                                "border rounded-full p-1 border-iflab_gray_medium"
                              }`}
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <h1>{user.userName.split(" ")[0]}</h1>
                            <h1 className="text-iflab_gray text-sm">
                              {user.userType === 1
                                ? "Aluno"
                                : user.userType === 2
                                ? "Professor"
                                : "Funcionário"}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="w-full h-fit">
                  <ul className="flex">
                    {page === 1 ? (
                      <>
                        <li
                          className={`flex w-full justify-center items-center p-2 border-t duration-75 ${
                            selectedLabUser !== null
                              ? "cursor-pointer hover:text-iflab_white hover:border-iflab_red_dark hover:bg-iflab_red_dark"
                              : "cursor-not-allowed text-iflab_gray_light border-iflab_gray_light"
                          }`}
                          onClick={() => {
                            if (selectedLabUser !== null) {
                              handleRemoveUserFromLab(selectedLabUser);
                            }
                          }}
                        >
                          Remover do laboratório
                        </li>
                        <li
                          className={`flex w-full justify-center items-center p-2 border-t duration-75 ${
                            selectedLabUser !== null
                              ? "cursor-pointer hover:text-iflab_white hover:border-iflab_green_dark hover:bg-iflab_green_dark"
                              : "cursor-not-allowed text-iflab_gray_light border-iflab_gray_light"
                          }`}
                          onClick={() => {
                            if (selectedLabUser !== null) {
                              handleTurnLabAdmin(selectedLabUser);
                            }
                          }}
                        >
                          Tornar administrador
                        </li>
                      </>
                    ) : page === 2 ? (
                      <>
                        <li
                          className={`flex w-full justify-center items-center p-2 border-t duration-75 ${
                            selectedLabUser !== null
                              ? "cursor-pointer hover:text-iflab_white hover:border-iflab_red_dark hover:bg-iflab_red_dark"
                              : "cursor-not-allowed text-iflab_gray_light border-iflab_gray_light"
                          }`}
                          onClick={() => {
                            if (selectedLabUser !== null) {
                              handleRemoveUserFromLab(selectedLabUser);
                            }
                          }}
                        >
                          Remover do laboratório
                        </li>
                        <li
                          className={`flex w-full justify-center items-center p-2 border-t duration-75 ${
                            selectedLabUser !== null
                              ? "cursor-pointer hover:text-iflab_white hover:border-iflab_green_light hover:bg-iflab_green_light"
                              : "cursor-not-allowed text-iflab_gray_light border-iflab_gray_light"
                          }`}
                          onClick={() => {
                            if (selectedLabUser !== null) {
                              handleRemoveLabAdmin(selectedLabUser);
                            }
                          }}
                        >
                          Tornar usuário comum
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-iflab_red fixed bottom-0 p-2 pb-0 text-iflab_white rounded-tr-lg z-50">
          <h1 className="text-sm">
            Essa é uma versão BETA do IFLab. É possível que hajam alguns
            problemas!
          </h1>
        </div>
      </>
    )
  );
}

export default AccessManager;
