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

// Importando componentes:
import PButton from "../buttons/PButton";
import TButton from "../buttons/TButton";
import ErrorModal from "../Modals/ErrorModal";
import TextInput from "../inputs/TextInput";

// API:
import {
  RemoveEquipment,
  editName,
  editDescription,
  editQuantity,
  editQuality,
  editImage,
} from "../../api/equipments_requests";

function EquipmentModal({ equipment, closeModal, reload }) {
  // +-------------------------------------------------------------+

  const [page, setPage] = useState(1);
  const [subPage, setSubPage] = useState(1);

  function nextPage() {
    if (subPage < 3) {
      setSubPage(subPage + 1);
    }
  }

  function previousPage() {
    if (subPage > 1) {
      setSubPage(subPage - 1);
    }
  }

  // +-------------------------------------------------------------+

  const [errorModal, setErrorModal] = useState({
    state: false,
    message: "",
  });

  // +-------------------------------------------------------------+

  const [newEquipmentInfo, setNewEquipmentInfo] = useState({
    equipmentName: equipment.equipmentName,
    description: equipment.description,
    totalQuantity: equipment.totalQuantity,
    quality: equipment.quality,
    image: equipment.image,
  });

  const [checkData, setCheckData] = useState({
    equipmentName: true,
    description: true,
    totalQuantity: true,
    quality: true,
    image: true,
  });

  const [errorMessage, setErrorMessage] = useState({
    equipmentName: "Sem erros",
    description: "Sem erros",
    totalQuantity: "Sem erros",
    quality: "Sem erros",
    image: "Sem erros",
  });

  // +-------------------------------------------------------------+

  function handleTypeName(e) {
    const name = e.target.value;

    setNewEquipmentInfo({ ...newEquipmentInfo, equipmentName: name });

    if (name.length < 3) {
      setCheckData({ ...checkData, equipmentName: false });
      setErrorMessage({
        ...errorMessage,
        equipmentName: "O nome deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (name.length > 128) {
      setCheckData({ ...checkData, equipmentName: false });
      setErrorMessage({
        ...errorMessage,
        equipmentName: "O nome deve ter no máximo 128 caracteres",
      });

      return;
    }

    setCheckData({ ...checkData, equipmentName: true });
    setErrorMessage({ ...errorMessage, equipmentName: "Sem erros" });

    return;
  }

  function handleTypeDescription(e) {
    const description = e.target.value;

    setNewEquipmentInfo({ ...newEquipmentInfo, description: description });

    if (description.length < 3) {
      setCheckData({ ...checkData, description: false });
      setErrorMessage({
        ...errorMessage,
        description: "A descrição deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (description.length > 1024) {
      setCheckData({ ...checkData, description: false });
      setErrorMessage({
        ...errorMessage,
        description: "A descrição deve ter no máximo 1024 caracteres",
      });

      return;
    }

    setCheckData({ ...checkData, description: true });
    setErrorMessage({ ...errorMessage, description: "Sem erros" });

    return;
  }

  function handleTypeTotalQuantity(e) {
    const totalQuantity = parseInt(e.target.value);

    setNewEquipmentInfo({
      ...newEquipmentInfo,
      totalQuantity: totalQuantity,
    });

    if (totalQuantity < 0) {
      setCheckData({ ...checkData, totalQuantity: false });
      setErrorMessage({
        ...errorMessage,
        totalQuantity: "A quantidade total deve ser maior ou igual a 0",
      });

      return;
    }

    if (
      isNaN(totalQuantity) ||
      e.target.value === "" ||
      totalQuantity === null
    ) {
      setCheckData({ ...checkData, totalQuantity: false });
      setErrorMessage({
        ...errorMessage,
        totalQuantity: "A quantidade total deve ser um número",
      });

      return;
    }

    setCheckData({ ...checkData, totalQuantity: true });
    setErrorMessage({ ...errorMessage, totalQuantity: "Sem erros" });

    return;
  }

  function handleTypeImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewEquipmentInfo({
        ...newEquipmentInfo,
        image: reader.result.toString(),
      });
    };

    setCheckData({ ...checkData, image: true });
    setErrorMessage({ ...errorMessage, image: "Sem erros" });

    reader.readAsDataURL(file);

    return;
  }

  // +-------------------------------------------------------------+

  async function handleDelete() {
    const response = await RemoveEquipment(equipment.equipmentID);

    if (response.status) {
      closeModal();
      reload();
    } else {
    }

    return;
  }

  async function handleEditAll() {
    // Nome:
    if (
      checkData.equipmentName &&
      newEquipmentInfo.equipmentName !== equipment.equipmentName
    ) {
      const response = await editName(
        equipment.equipmentID,
        newEquipmentInfo.equipmentName
      );

      if (response.status === false) {
        setCheckData({ ...checkData, equipmentName: false });
        setErrorMessage({ ...errorMessage, equipmentName: response.message });
      }
    }

    // Descrição:
    if (
      checkData.description &&
      newEquipmentInfo.description !== equipment.description
    ) {
      const response = await editDescription(
        equipment.equipmentID,
        newEquipmentInfo.description
      );

      if (response.status === false) {
        setCheckData({ ...checkData, description: false });
        setErrorMessage({ ...errorMessage, description: response.message });
      }
    }

    // Quantidade total:
    if (
      checkData.totalQuantity &&
      newEquipmentInfo.totalQuantity !== equipment.totalQuantity
    ) {
      const response = await editQuantity(
        equipment.equipmentID,
        newEquipmentInfo.totalQuantity
      );

      if (response.status === false) {
        setCheckData({ ...checkData, totalQuantity: false });
        setErrorMessage({ ...errorMessage, totalQuantity: response.message });
      }
    }

    // Qualidade:
    if (checkData.quality && newEquipmentInfo.quality !== equipment.quality) {
      const response = await editQuality(
        equipment.equipmentID,
        newEquipmentInfo.quality
      );

      if (response.status === false) {
        setCheckData({ ...checkData, quality: false });
        setErrorMessage({ ...errorMessage, quality: response.message });
      }
    }

    // Imagem:
    if (checkData.image && newEquipmentInfo.image !== equipment.image) {
      const response = await editImage(
        equipment.equipmentID,
        newEquipmentInfo.image
      );

      if (response.status === false) {
        setCheckData({ ...checkData, image: false });
        setErrorMessage({ ...errorMessage, image: response.message });
      }
    }

    if (
      checkData.equipmentName &&
      checkData.description &&
      checkData.totalQuantity &&
      checkData.quality &&
      checkData.image
    ) {
      closeModal();
      reload();
    }

    return;
  }

  // +-------------------------------------------------------------+

  return (
    <>
      <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
        <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col xs:w-full xs:h-full xs:rounded-none">
          <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
            <h1 className="text-lg text-iflab_white">
              {" "}
              Informações sobre o equipamento{" "}
              <span className="font-bold text-iflab_green_light">
                {equipment.equipmentName}
              </span>
            </h1>
            <img
              src={close}
              alt="Close"
              className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>

          <div className="w-full h-full flex flex-col">
            <div className="w-full h-full gap-2 flex flex-col">
              <div className="w-full">
                <ul className="flex">
                  <li
                    className={`w-full text-center py-2 border-iflab_gray_medium duration-75 ${
                      page === 1
                        ? "border-b-iflab_white hover:text-iflab_gray border-r"
                        : "border-b hover:bg-iflab_green_light hover:text-iflab_white cursor-pointer"
                    }`}
                    onClick={() => setPage(1)}
                  >
                    Detalhes
                  </li>
                  <li
                    className={`w-full text-center py-2 border-iflab_gray_medium duration-75 ${
                      page === 2
                        ? "border-b-iflab_white hover:text-iflab_gray border-x"
                        : "border-b hover:bg-iflab_green_light hover:text-iflab_white cursor-pointer"
                    }`}
                    onClick={() => setPage(2)}
                  >
                    Editar informações
                  </li>
                  <li
                    className={`w-full text-center py-2 border-iflab_gray_medium duration-75 ${
                      page === 3
                        ? "border-b-iflab_white hover:text-iflab_gray border-l"
                        : "border-b hover:bg-iflab_red hover:text-iflab_white cursor-pointer"
                    }`}
                    onClick={() => setPage(3)}
                  >
                    Excluir equipamento
                  </li>
                </ul>
              </div>

              {page === 1 ? (
                <div className="w-full h-full gap-2 flex flex-col p-5">
                  <h1 className="text-sm text-iflab_gray font-bold">
                    Detalhes do equipamento
                  </h1>
                  <div className="w-full h-full gap-2 flex flex-col">
                    <div className="flex w-full h-fit gap-2 border border-iflab_gray_medium rounded-lg">
                      <div className="h-[13rem] w-[13rem] flex justify-center items-center border-r border-iflab_gray_medium">
                        <img
                          src={equipment.image || equipmentIcon}
                          alt={"Equipamento"}
                          className={`${
                            !!equipment.image
                              ? "w-full h-full object-cover"
                              : ""
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-2 p-5 justify-center">
                        <h1 className="text-sm text-iflab_gray">
                          Nome:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {equipment.equipmentName}
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray">
                          Supervisão:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {equipment.supervisorLevel === 1
                              ? "Polícia Federal"
                              : equipment.supervisorLevel === 2
                              ? "Exército"
                              : "IFLab"}
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray">
                          Quantidade:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {equipment.availableQuantity}/
                            {equipment.totalQuantity}
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray flex gap-1">
                          Qualidade:{" "}
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <img
                                key={index}
                                src={
                                  index < equipment.quality
                                    ? qualityOn
                                    : qualityOff
                                }
                                alt="Quality"
                                className="w-4 h-4"
                              />
                            ))}
                          </div>
                        </h1>
                      </div>
                    </div>
                    <div className="w-full h-full p-5">
                      <h1>Observações:</h1>
                      <p className="text-sm text-iflab_gray">
                        {equipment.description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : page === 2 ? (
                <div className="w-full h-full gap-2 flex flex-col p-5">
                  <div className="w-full h-full gap-2 flex flex-col">
                    <div className="h-full w-full p-5 flex flex-col gap-10">
                      {subPage === 1 ? (
                        <>
                          {/* Nome, quantidade e qualidade */}
                          <div className="w-full">
                            <TextInput
                              predata={newEquipmentInfo.equipmentName}
                              label="Nome do equipamento"
                              name={"equipmentName"}
                              errorMessage={errorMessage.equipmentName}
                              state={checkData.equipmentName}
                              type={"text"}
                              icon={equipmentIcon}
                              onChange={(e) => handleTypeName(e)}
                            />
                          </div>
                          <div className="w-full flex gap-5">
                            <div className="w-[70%]">
                              <TextInput
                                predata={newEquipmentInfo.totalQuantity}
                                label="Quantidade total"
                                name={"totalQuantity"}
                                errorMessage={errorMessage.totalQuantity}
                                state={checkData.totalQuantity}
                                type={"number"}
                                icon={quantity}
                                onChange={(e) => handleTypeTotalQuantity(e)}
                              />
                            </div>
                            <div className="w-[30%] h-fit flex flex-col gap-3">
                              <h1 className="">Qualidade: </h1>
                              <div className="flex gap-1 ml-3">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <img
                                    key={index}
                                    src={
                                      index < newEquipmentInfo.quality
                                        ? qualityOn
                                        : qualityOff
                                    }
                                    alt="Quality"
                                    className={`w-6 h-6 cursor-pointer filter duration-75${
                                      index < newEquipmentInfo.quality
                                        ? " opacity-100 hover:brightness-110"
                                        : " opacity-50 hover:brightness-0"
                                    }`}
                                    onClick={() => {
                                      setNewEquipmentInfo({
                                        ...newEquipmentInfo,
                                        quality: index + 1,
                                      });

                                      setCheckData({
                                        ...checkData,
                                        quality: true,
                                      });
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : subPage === 2 ? (
                        <div className="w-full h-full">
                          <label htmlFor="description">Observações:</label>
                          <textarea
                            id="description"
                            name="description"
                            className={`w-full h-[90%] border rounded-lg p-5 bg-iflab_white_light resize-none outline-none ${
                              !checkData.description
                                ? "border-iflab_red"
                                : newEquipmentInfo.description ===
                                  equipment.description
                                ? "border-iflab_white"
                                : "border-iflab_green_light"
                            }`}
                            placeholder="Descrição do elemento"
                            value={newEquipmentInfo.description}
                            onChange={(e) => handleTypeDescription(e)}
                          ></textarea>
                          <p
                            className={`text-sm text-iflab_red duration-75 ${
                              checkData.description ? "hidden" : ""
                            }`}
                          >
                            {errorMessage.description}
                          </p>
                        </div>
                      ) : (
                        <>
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
                                  !!newEquipmentInfo.image
                                    ? ""
                                    : "flex justify-center items-center border border-iflab_gray_medium"
                                }`}
                              >
                                <img
                                  src={newEquipmentInfo.image || equipmentIcon}
                                  alt={"Equipamento"}
                                  className={`${
                                    !!newEquipmentInfo.image
                                      ? "object-cover w-full h-full"
                                      : ""
                                  }`}
                                />
                              </div>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between gap-5">
                    <div className="w-full flex items-center gap-5">
                      <div
                        className={`rounded-lg w-6 flex justify-start ${
                          subPage !== 1
                            ? "bg-iflab_white_light cursor-pointer"
                            : ""
                        }`}
                        onClick={() => previousPage()}
                      >
                        <img
                          src={chevrom}
                          alt="Voltar"
                          className="w-4 h-4 transform rotate-90"
                        />
                      </div>
                      <h1>Página {subPage}</h1>
                      <div
                        className={`rounded-lg w-6 flex justify-end ${
                          subPage !== 3
                            ? "bg-iflab_white_light cursor-pointer"
                            : ""
                        }`}
                        onClick={() => nextPage()}
                      >
                        <img
                          src={chevrom}
                          alt="Avançar"
                          className="w-4 h-4 transform -rotate-90"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 h-fit w-full justify-end">
                      <TButton
                        text="Desfazer"
                        onClick={() => {
                          setNewEquipmentInfo({
                            equipmentName: equipment.equipmentName,
                            description: equipment.description,
                            totalQuantity: equipment.totalQuantity,
                            quality: equipment.quality,
                            image: equipment.image,
                          });
                          setCheckData({
                            equipmentName: true,
                            description: true,
                            totalQuantity: true,
                            quality: true,
                            image: true,
                          });
                          setErrorMessage({
                            equipmentName: "Sem erros",
                            description: "Sem erros",
                            totalQuantity: "Sem erros",
                            quality: "Sem erros",
                            image: "Sem erros",
                          });
                        }}
                        disabled={
                          newEquipmentInfo.equipmentName ===
                            equipment.equipmentName &&
                          newEquipmentInfo.description ===
                            equipment.description &&
                          newEquipmentInfo.totalQuantity ===
                            equipment.totalQuantity &&
                          newEquipmentInfo.quality === equipment.quality &&
                          newEquipmentInfo.image === equipment.image
                        }
                      />
                      <PButton
                        text="Salvar alterações"
                        goodAction={true}
                        onClick={() => handleEditAll()}
                        disabled={
                          (newEquipmentInfo.equipmentName ===
                            equipment.equipmentName &&
                            newEquipmentInfo.description ===
                              equipment.description &&
                            newEquipmentInfo.totalQuantity ===
                              equipment.totalQuantity &&
                            newEquipmentInfo.quality === equipment.quality &&
                            newEquipmentInfo.image === equipment.image) ||
                          !checkData.equipmentName ||
                          !checkData.description ||
                          !checkData.totalQuantity ||
                          !checkData.quality ||
                          !checkData.image
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full gap-2 flex flex-col p-5">
                  <h1 className="text-sm text-iflab_gray font-bold">
                    Excluir equipamento
                  </h1>
                  <div className="w-full h-[80%] p-5 flex flex-col items-center justify-center gap-10">
                    <h1 className="text-lg text-iflab_gray">
                      Tem certeza que deseja{" "}
                      <span className="text-iflab_red_dark font-bold">
                        excluir
                      </span>{" "}
                      o equipamento{" "}
                      <span className="font-bold text-iflab_gray_dark">
                        {equipment.equipmentName}
                      </span>
                      ?
                    </h1>

                    <PButton
                      text="Excluir elemento"
                      goodAction={false}
                      icon={trash}
                      onClick={() => handleDelete()}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {errorModal.state && (
        <ErrorModal
          message={errorModal.message}
          onClose={() => setErrorModal({ state: false, message: "" })}
        />
      )}
    </>
  );
}

export default EquipmentModal;
