// O=============================================================================================O */

// Hooks de state:
import React, { useState, useEffect } from "react";

// Icones:
import close from "../../assets/icons/UI/close.png";
import potion from "../../assets/icons/UI/potion.png";
import quantity from "../../assets/icons/UI/quantidade.png";

// API:
import {
  editLabCapacity,
  editLabName,
  getLabById,
} from "../../api/lab_requests";

// Componentes:
import PButton from "../buttons/PButton";
import TButton from "../buttons/TButton";
import TextInput from "../inputs/TextInput";
import ErrorModal from "./ErrorModal";

// O=============================================================================================O */

function EditLabModal({ labId, closeModal, reload }) {
  /*---------------------------------------------------------------*/

  const [atualInfo, setAtualInfo] = useState(null);
  const [newInfo, setNewInfo] = useState(null);

  const [checkData, setCheckData] = useState({
    labName: false,
    capacity: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    labName: "Sem erros",
    capacity: "Sem erros",
  });

  const [requestResult, setRequestResult] = useState({
    status: false,
    message: "",
  });

  /*---------------------------------------------------------------*/

  useEffect(() => {
    async function fetchData() {
      const labData = await getLabById(labId);

      if (labData.status) {
        setAtualInfo(labData.lab);
        setNewInfo(labData.lab);
      }
    }

    fetchData();
  }, [labId]);

  /*---------------------------------------------------------------*/

  function handleNameType(e) {
    const name = e.target.value;

    setNewInfo({
      ...newInfo,
      labName: name,
    });

    if (name.length <= 0) {
      setCheckData({
        ...checkData,
        labName: false,
      });

      setErrorMessage({
        ...errorMessage,
        labName: "O laboratório precisa de um nome",
      });

      return;
    }

    if (name.length > 16) {
      setCheckData({
        ...checkData,
        labName: false,
      });

      setErrorMessage({
        ...errorMessage,
        labName: "Nome do laboratório muito longo",
      });

      return;
    }

    if (name === atualInfo.labName) {
      setCheckData({
        ...checkData,
        labName: false,
      });

      setErrorMessage({
        ...errorMessage,
        labName: "Nome do laboratório igual ao atual",
      });

      return;
    }

    setCheckData({
      ...checkData,
      labName: true,
    });
    setErrorMessage({
      ...errorMessage,
      labName: "Sem erros",
    });

    return;
  }

  function handleCapacityType(e) {
    const capacity = parseInt(e.target.value);

    setNewInfo({
      ...newInfo,
      capacity: capacity,
    });

    if (capacity < 1 || e.target.value === "") {
      setCheckData({
        ...checkData,
        capacity: false,
      });

      setErrorMessage({
        ...errorMessage,
        capacity: "Capacidade inválida",
      });

      return;
    }

    if (capacity === atualInfo.capacity) {
      setCheckData({
        ...checkData,
        capacity: false,
      });

      setErrorMessage({
        ...errorMessage,
        capacity: "Capacidade igual à atual",
      });

      return;
    }

    setCheckData({
      ...checkData,
      capacity: true,
    });
    setErrorMessage({
      ...errorMessage,
      capacity: "Sem erros",
    });

    return;
  }

  async function handleSaveAll() {
    if (checkData.labName && newInfo.labName !== atualInfo.labName) {
      const response = await editLabName(newInfo.labName, labId);

      if (response.status === false) {
        setErrorMessage({
          ...errorMessage,
          labName: response.message,
        });

        setCheckData({
          ...checkData,
          labName: false,
        });

        setRequestResult({
          status: true,
          message: response.message,
        });
      }

      setAtualInfo({
        ...atualInfo,
        labName: newInfo.labName,
      });

      setCheckData({
        ...checkData,
        labName: true,
      });
    }

    if (checkData.capacity && newInfo.capacity !== atualInfo.capacity) {
      const response = await editLabCapacity(newInfo.capacity, labId);

      if (response.status === false) {
        setErrorMessage({
          ...errorMessage,
          capacity: response.message,
        });

        setCheckData({
          ...checkData,
          capacity: false,
        });

        setRequestResult({
          status: true,
          message: response.message,
        });
      }

      setAtualInfo({
        ...atualInfo,
        capacity: newInfo.capacity,
      });

      setCheckData({
        ...checkData,
        capacity: true,
      });
    }

    closeModal();
    reload();

    return;
  }

  /*---------------------------------------------------------------*/

  return (
    !!atualInfo &&
    !!newInfo && (
      <>
        <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
          <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col xs:w-full xs:h-full xs:rounded-none">
            <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
              <h1 className="text-lg text-iflab_white">
                Editar informações do laboratório{" "}
                <span className="text-iflab_green_light font-bold">
                  {atualInfo.labName}
                </span>
              </h1>
              <img
                src={close}
                alt="close"
                className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
                onClick={() => closeModal()}
              />
            </div>

            <div className="w-full h-full px-14 flex flex-col gap-14 pt-14">
              <TextInput
                predata={newInfo.labName}
                icon={potion}
                type="text"
                name={"labName-input"}
                label={"Digite o novo nome do laboratório"}
                state={checkData.labName}
                errorMessage={errorMessage.labName}
                onChange={(e) => handleNameType(e)}
              />

              <TextInput
                predata={newInfo.capacity}
                icon={quantity}
                type="number"
                name={"capacity-input"}
                label={"Digite a nova capacidade do laboratório"}
                state={checkData.capacity}
                errorMessage={errorMessage.capacity}
                onChange={(e) => handleCapacityType(e)}
              />
            </div>

            <div className="w-full p-10 justify-end flex gap-5">
              {/* <TButton text="Cancelar" onClick={() => closeModal()} />

              <PButton
                text="Reverter alterações"
                onClick={() => setNewInfo(atualInfo)}
                disabled={
                  newInfo.labName === atualInfo.labName &&
                  newInfo.capacity === atualInfo.capacity
                }
              /> */}
              <TButton
                text="Reverter alterações"
                onClick={() => {
                  setNewInfo(atualInfo);
                  setCheckData({
                    labName: true,
                    capacity: true,
                  });

                  setErrorMessage({
                    labName: "Sem erros",
                    capacity: "Sem erros",
                  });

                  setRequestResult({
                    status: false,
                    message: "",
                  });
                }}
                disabled={
                  newInfo.labName === atualInfo.labName &&
                  newInfo.capacity === atualInfo.capacity
                }
              />

              <PButton
                text="Salvar alterações"
                onClick={() => handleSaveAll()}
                disabled={
                  newInfo.labName === atualInfo.labName &&
                  newInfo.capacity === atualInfo.capacity
                }
              />
            </div>
          </div>
        </div>

        {requestResult.status && (
          <ErrorModal
            message={requestResult.message}
            onClose={() => setRequestResult({ status: false, message: "" })}
          />
        )}
      </>
    )
  );
}

export default EditLabModal;
