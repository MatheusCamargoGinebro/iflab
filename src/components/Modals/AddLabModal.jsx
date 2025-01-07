// O=============================================================================================O */

// Hooks de state:
import React, { useState } from "react";

// Icones:
import close from "../../assets/icons/UI/close.png";
import potion from "../../assets/icons/UI/potion.png";
import quantity from "../../assets/icons/UI/quantidade.png";

// API:
import { registerNewLab } from "../../api/lab_requests";

// Componentes:
import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";
import TextInput from "../inputs/TextInput";
import ErrorModal from "./ErrorModal";

function AddLabModal({ closeModal }) {
  /*--------------------------------------------------------------------------------*/

  // States:
  const [newLab, setNewLab] = useState({
    lab_name: "",
    lab_capacity: 0,
  });

  const [checkData, setCheckData] = useState({
    lab_name: false,
    lab_capacity: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    lab_name: "Sem erros",
    lab_capacity: "Sem erros",
  });

  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  /*--------------------------------------------------------------------------------*/

  // Função para verificar se o nome do laboratório é válido:
  function handleNameType(e) {
    const name = e.target.value;
    setNewLab({ ...newLab, lab_name: name });

    if (name.length < 3) {
      setCheckData({ ...checkData, lab_name: false });
      setErrorMessage({
        ...errorMessage,
        lab_name: "O nome do laboratório deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (name.length > 16) {
      setCheckData({ ...checkData, lab_name: false });
      setErrorMessage({
        ...errorMessage,
        lab_name: "O nome do laboratório deve ter no máximo 16 caracteres",
      });

      return;
    }

    setCheckData({ ...checkData, lab_name: true });
    setErrorMessage({ ...errorMessage, lab_name: "Sem erros" });

    return;
  }

  function handleCapacityType(e) {
    const capacity = parseInt(e.target.value);
    setNewLab({ ...newLab, lab_capacity: capacity });

    if (capacity <= 0) {
      setCheckData({ ...checkData, lab_capacity: false });
      setErrorMessage({
        ...errorMessage,
        lab_capacity: "A capacidade do laboratório deve ser maior que 0",
      });

      return;
    }

    if (capacity === "") {
      setCheckData({ ...checkData, lab_capacity: false });
      setErrorMessage({
        ...errorMessage,
        lab_capacity: "Precisa haver uma capacidade de pessoas",
      });

      return;
    }

    setCheckData({ ...checkData, lab_capacity: true });
    setErrorMessage({ ...errorMessage, lab_capacity: "Sem erros" });
  }

  /*--------------------------------------------------------------------------------*/

  // Função para criar um novo laboratório:
  async function handleCreateLab() {
    const response = await registerNewLab(newLab.lab_name, newLab.lab_capacity);

    if (response.status === false) {
      setRequestError({ status: true, message: response.message });
      return;
    }

    closeModal();
    window.location.reload();

    return;
  }

  /*--------------------------------------------------------------------------------*/

  return (
    <>
      <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
        <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col xs:w-full xs:h-full xs:rounded-none">
          <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
            <h1 className="text-lg text-iflab_white">
              Criar um novo laboratório
            </h1>
            <img
              src={close}
              alt="close"
              className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>
          <div className="w-full h-full px-10 pt-10 flex flex-col gap-8">
            <TextInput
              predata={newLab.lab_name}
              icon={potion}
              type="text"
              name={"labName-input"}
              label={"Digite o nome do laboratório"}
              state={checkData.lab_name}
              errorMessage={errorMessage.lab_name}
              onChange={(e) => handleNameType(e)}
            />

            <TextInput
              predata={newLab.lab_capacity}
              icon={quantity}
              type="number"
              name={"labCapacity-input"}
              label={"Digite a capacidade do laboratório"}
              state={checkData.lab_capacity}
              errorMessage={errorMessage.lab_capacity}
              onChange={(e) => handleCapacityType(e)}
            />
          </div>
          <div className="flex justify-end items-center p-5 gap-5">
            <TButton
              text="Limpar informações"
              onClick={() => {
                setNewLab({
                  lab_name: "",
                  lab_capacity: 0,
                });

                setCheckData({
                  lab_name: false,
                  lab_capacity: false,
                });

                setErrorMessage({
                  lab_name: "Precisa haver um nome",
                  lab_capacity: "Precisa haver uma capacidade",
                });
              }}
              disabled={!(newLab.lab_name || newLab.lab_capacity)}
            />
            <PButton
              text={"Criar novo laboratório"}
              disabled={!(checkData.lab_name && checkData.lab_capacity)}
              onClick={() => handleCreateLab()}
            />
          </div>
        </div>
      </div>

      {requestError.status ? (
        <ErrorModal
          message={requestError.message}
          onClose={() => setRequestError({ status: false, message: "" })}
        />
      ) : null}
    </>
  );
}

export default AddLabModal;
