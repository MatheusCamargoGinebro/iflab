/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useState } from "react";

// Importando imagens e ícones:
import close from "../../assets/icons/UI/close.png";
import trash from "../../assets/icons/UI/delete.png";
import chevrom from "../../assets/icons/UI/chevrom.png";
import equipmentIcon from "../../assets/icons/UI/equipment.png";
import qualityOn from "../../assets/icons/UI/quality-1.png";
import qualityOff from "../../assets/icons/UI/quality-2.png";
import quantity from "../../assets/icons/UI/ec-number.png";

// Importando componente:
import PButton from "../buttons/PButton";
import TextInput from "../inputs/TextInput";
import ErrorModal from "../Modals/ErrorModal";

// Importando API:
import { registerEquipment } from "../../api/equipments_requests";

/* O=============================================================================================O */

function AddEquipment({ labId, closeModal }) {
  const [page, setPage] = useState(1);

  function nextPage() {
    if (page < 3) {
      setPage(page + 1);
    }
  }

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  // +--------------------------------------------------------+

  const [newEquipmentInfo, setNewEquipmentInfo] = useState({
    equipment_name: "",
    equipment_description: "",
    equipment_totalQuantity: 0,
    equipment_quality: 0,
    equipment_image: "",
    equipment_supervisorLevel: 0,
    equipment_labId: labId,
  });

  const [checkData, setCheckData] = useState({
    equipment_name: false,
    equipment_description: false,
    equipment_totalQuantity: false,
    equipment_quality: false,
    equipment_image: false,
    equipment_supervisorLevel: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    equipment_name: "Sem erros",
    equipment_description: "Sem erros",
    equipment_totalQuantity: "Sem erros",
    equipment_quality: "Sem erros",
    equipment_image: "Sem erros",
    equipment_supervisorLevel: "Sem erros",
  });

  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  // +--------------------------------------------------------+

  function handleTypeName(e) {
    const name = e.target.value;

    setNewEquipmentInfo({ ...newEquipmentInfo, equipment_name: name });

    if (name.length < 3) {
      setErrorMessages({
        ...errorMessages,
        equipment_name: "O nome deve ter no mínimo 3 caracteres.",
      });
      setCheckData({ ...checkData, equipment_name: false });

      return;
    }

    if (name.length > 128) {
      setErrorMessages({
        ...errorMessages,
        equipment_name: "O nome deve ter no máximo 128 caracteres.",
      });
      setCheckData({ ...checkData, equipment_name: false });

      return;
    }

    setErrorMessages({ ...errorMessages, equipment_name: "Sem erros" });
    setCheckData({ ...checkData, equipment_name: true });

    return;
  }

  function handleTypeDescription(e) {
    const description = e.target.value;

    setNewEquipmentInfo({
      ...newEquipmentInfo,
      equipment_description: description,
    });

    if (description.length < 3) {
      setErrorMessages({
        ...errorMessages,
        equipment_description: "A descrição deve ter no mínimo 3 caracteres.",
      });
      setCheckData({ ...checkData, equipment_description: false });

      return;
    }

    if (description.length > 1024) {
      setErrorMessages({
        ...errorMessages,
        equipment_description:
          "A descrição deve ter no máximo 1024 caracteres.",
      });
      setCheckData({ ...checkData, equipment_description: false });

      return;
    }

    setErrorMessages({ ...errorMessages, equipment_description: "Sem erros" });
    setCheckData({ ...checkData, equipment_description: true });

    return;
  }

  function handleTypeTotalQuantity(e) {
    const totalQuantity = parseInt(e.target.value);

    setNewEquipmentInfo({
      ...newEquipmentInfo,
      equipment_totalQuantity: totalQuantity,
    });

    if (totalQuantity < 0) {
      setErrorMessages({
        ...errorMessages,
        equipment_totalQuantity:
          "A quantidade total deve ser maior ou igual a 0.",
      });
      setCheckData({ ...checkData, equipment_totalQuantity: false });

      return;
    }

    if (
      isNaN(totalQuantity) ||
      totalQuantity === null ||
      e.target.value === ""
    ) {
      setErrorMessages({
        ...errorMessages,
        equipment_totalQuantity:
          "A quantidade total deve ser um número inteiro.",
      });
      setCheckData({ ...checkData, equipment_totalQuantity: false });

      return;
    }

    setErrorMessages({
      ...errorMessages,
      equipment_totalQuantity: "Sem erros",
    });
    setCheckData({ ...checkData, equipment_totalQuantity: true });

    return;
  }

  function handleTypeImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewEquipmentInfo({
        ...newEquipmentInfo,
        equipment_image: reader.result,
      });
    };

    setCheckData({ ...checkData, equipment_image: true });
    setErrorMessages({ ...errorMessages, equipment_image: "Sem erros" });

    reader.readAsDataURL(file);

    return;
  }

  // +--------------------------------------------------------+

  async function hanndleRegister() {
    console.log(newEquipmentInfo);
    const response = await registerEquipment(
      newEquipmentInfo.equipment_name,
      newEquipmentInfo.equipment_description,
      newEquipmentInfo.equipment_totalQuantity,
      newEquipmentInfo.equipment_quality,
      newEquipmentInfo.equipment_image,
      newEquipmentInfo.equipment_supervisorLevel,
      newEquipmentInfo.equipment_labId
    );

    if (response.status) {
      closeModal();
      window.location.reload();
      return;
    } else if (response.status === false) {
      setRequestError({ status: true, message: response.message });
      return;
    }

    return;
  }

  // +--------------------------------------------------------+

  return (
    <>
      <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
        <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col xs:w-full xs:h-full xs:rounded-none">
          <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
            <h1 className="text-lg text-iflab_white">
              Adicionar novo equipamento
            </h1>
            <img
              src={close}
              alt="close"
              className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
              onClick={() => {
                closeModal();
              }}
            />
          </div>
          <div className="w-full h-full">
            {page === 1 ? (
              <div className="w-full h-full p-5 flex flex-col gap-5">
                {/* Nome, Quantidade, Qualidade, Nível de supervisão */}
                <TextInput
                  predata={newEquipmentInfo.equipment_name}
                  label={"Nome do equipamento"}
                  name={"equipment_name"}
                  errorMessage={errorMessages.equipment_name}
                  state={checkData.equipment_name}
                  type={"text"}
                  icon={equipmentIcon}
                  onChange={(e) => handleTypeName(e)}
                />
                <TextInput
                  predata={newEquipmentInfo.equipment_totalQuantity}
                  label={"Quantidade total"}
                  name={"equipment_totalQuantity"}
                  errorMessage={errorMessages.equipment_totalQuantity}
                  state={checkData.equipment_totalQuantity}
                  type={"number"}
                  icon={quantity}
                  onChange={(e) => handleTypeTotalQuantity(e)}
                />

                <div className="w-full flex">
                  <div className="w-[65%] h-full">
                    <label htmlFor="supervision">Supervisão:</label>
                    <div className="flex w-full rounded-md border text-center border-iflab_white">
                      <div
                        className={`w-full p-2 flex justify-center items-center rounded-l-md ${
                          newEquipmentInfo.equipment_supervisorLevel === 0
                            ? "bg-iflab_white_dark"
                            : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                        }`}
                        onClick={() => {
                          setNewEquipmentInfo({
                            ...newEquipmentInfo,
                            equipment_supervisorLevel: 0,
                          });

                          setCheckData({
                            ...checkData,
                            equipment_supervisorLevel: true,
                          });
                        }}
                      >
                        IFLab
                      </div>
                      <div
                        className={`w-full p-2 flex justify-center items-center ${
                          newEquipmentInfo.equipment_supervisorLevel === 1
                            ? "bg-iflab_white_dark"
                            : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                        }`}
                        onClick={() => {
                          setNewEquipmentInfo({
                            ...newEquipmentInfo,
                            equipment_supervisorLevel: 1,
                          });

                          setCheckData({
                            ...checkData,
                            equipment_supervisorLevel: true,
                          });
                        }}
                      >
                        Polícia Federal
                      </div>

                      <div
                        className={`w-full p-2 flex justify-center items-center rounded-r-md ${
                          newEquipmentInfo.equipment_supervisorLevel === 2
                            ? "bg-iflab_white_dark"
                            : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                        }`}
                        onClick={() => {
                          setNewEquipmentInfo({
                            ...newEquipmentInfo,
                            equipment_supervisorLevel: 2,
                          });

                          setCheckData({
                            ...checkData,
                            equipment_supervisorLevel: true,
                          });
                        }}
                      >
                        Exército Brasileiro
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-[30%] pl-3 h-full">
                    <h1>Qualidade:</h1>
                    <div className="flex gap-1 h-full items-center justify-end">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <img
                          key={index}
                          src={
                            index < newEquipmentInfo.equipment_quality
                              ? qualityOn
                              : qualityOff
                          }
                          alt="Quality"
                          className={`w-7 h-7 cursor-pointer filter duration-75${
                            index < newEquipmentInfo.equipment_quality
                              ? " opacity-100 hover:brightness-110"
                              : " opacity-50 hover:brightness-0"
                          }`}
                          onClick={() => {
                            setNewEquipmentInfo({
                              ...newEquipmentInfo,
                              equipment_quality: index + 1,
                            });

                            setCheckData({
                              ...checkData,
                              equipment_quality: true,
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : page === 2 ? (
              <div className="w-full h-full p-5 flex flex-col">
                {/* descrição */}
                <label htmlFor="description">Descrição:</label>
                <textarea
                  id="description"
                  name="description"
                  className={`w-full h-[90%] border rounded-lg p-5 bg-iflab_white_light resize-none outline-none ${
                    !checkData.equipment_description &&
                    newEquipmentInfo.equipment_description !== ""
                      ? "border-iflab_red"
                      : newEquipmentInfo.equipment_description === ""
                      ? "border-iflab_white"
                      : "border-iflab_green_light"
                  }`}
                  placeholder="Descrição do elemento"
                  value={newEquipmentInfo.equipment_description}
                  onChange={(e) => handleTypeDescription(e)}
                ></textarea>
                <p
                  className={`text-sm text-iflab_red duration-75 ${
                    checkData.equipment_description ||
                    newEquipmentInfo.equipment_description === ""
                      ? "text-iflab_white"
                      : "text-iflab_red"
                  }`}
                >
                  {errorMessages.equipment_description}
                </p>
              </div>
            ) : (
              <div className="w-full h-full p-5 flex flex-col gap-5">
                <h1>Imagem do equipamento:</h1>
                <div className="w-full h-full flex">
                  <input
                    id="image"
                    name="image"
                    accept="image/*"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleTypeImage(e)}
                  />

                  <label
                    htmlFor="image"
                    className="w-full h-full items-center justify-center flex flex-col gap-2 cursor-pointer bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg"
                  >
                    <div
                      className={`w-40 h-40 rounded-full overflow-hidden flex justify-center items-center${
                        !!newEquipmentInfo.equipment_image
                          ? ""
                          : "flex justify-center items-center border border-iflab_gray_medium"
                      }`}
                    >
                      <img
                        src={newEquipmentInfo.equipment_image || equipmentIcon}
                        alt={"Equipamento"}
                        className={`${
                          !!newEquipmentInfo.equipment_image
                            ? "object-cover w-full h-full"
                            : ""
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="flex w-full p-5">
            <div className="w-full flex items-center gap-5">
              <div
                className={`rounded-lg w-6 flex justify-start ${
                  page !== 1 ? "bg-iflab_white_light cursor-pointer" : ""
                }`}
                onClick={() => previousPage()}
              >
                <img src={chevrom} alt="Voltar" className="h-5 w-5 rotate-90" />
              </div>
              <h1>Página {page}</h1>

              <div
                className={`rounded-lg w-6 flex justify-end ${
                  page !== 3 ? "bg-iflab_white_light cursor-pointer" : ""
                }`}
                onClick={() => nextPage()}
              >
                <img
                  src={chevrom}
                  alt="Avançar"
                  className="h-5 w-15 -rotate-90"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-end">
              <PButton
                text="Registrar elemento"
                onClick={() => hanndleRegister()}
                disabled={
                  checkData.equipment_name &&
                  checkData.equipment_description &&
                  checkData.equipment_totalQuantity &&
                  checkData.equipment_quality &&
                  checkData.equipment_image &&
                  checkData.equipment_supervisorLevel
                    ? false
                    : true
                }
              />
            </div>
          </div>
        </div>
      </div>

      {requestError.status && (
        <ErrorModal
          message={requestError.message}
          closeModal={() => setRequestError({ status: false, message: "" })}
        />
      )}
      {console.log(checkData, newEquipmentInfo)}
    </>
  );
}

export default AddEquipment;
