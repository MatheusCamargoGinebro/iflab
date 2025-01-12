/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useState } from "react";

// Importando imagens e ícones:
import close from "../../assets/icons/UI/close.png";
import potion from "../../assets/icons/UI/potion.png";
import trash from "../../assets/icons/UI/delete.png";
import chevrom from "../../assets/icons/UI/chevrom.png";
import equipment from "../../assets/icons/UI/equipment.png";
import cas from "../../assets/icons/UI/cas-number.png";
import ec from "../../assets/icons/UI/ec-number.png";
import TextInput from "../inputs/TextInput";
import quantity from "../../assets/icons/UI/access-relatory.png";

// Importando componente:
import PButton from "../buttons/PButton";
import TButton from "../buttons/TButton";

// API:
import {
  editName,
  editQuantity,
  editDescription,
  editMolarMass,
  editCASNumber,
  editECNumber,
  editPhysicalState,
  editImage,
  DeleteElement,
} from "../../api/elements_requests";

/* O=============================================================================================O */

function ElementModal({ element, closeModal, reload }) {
  const [page, setpage] = useState(1);
  const [subPage, setSubPage] = useState(1);

  function nextPage() {
    if (subPage < 3) {
      setSubPage(subPage + 1);
    }
  }

  function prevpage() {
    if (subPage > 1) {
      setSubPage(subPage - 1);
    }
  }

  const [newElementInfo, setNewElementInfo] = useState({
    CASNumber: element.CASNumber,
    ECNumber: element.ECNumber,
    Quantity: element.Quantity,
    description: element.description,
    elementName: element.elementName,
    image: element.image,
    molecularWeight: element.molecularWeight,
    physicalState: element.physicalState,
  });

  const [checkData, setCheckData] = useState({
    CASNumber: true,
    ECNumber: true,
    Quantity: true,
    description: true,
    elementName: true,
    image: true,
    molecularWeight: true,
    physicalState: true,
  });

  const [errorMessage, setErrorMessage] = useState({
    CASNumber: "Sem erros",
    ECNumber: "Sem erros",
    Quantity: "Sem erros",
    description: "Sem erros",
    elementName: "Sem erros",
    image: "Sem erros",
    molecularWeight: "Sem erros",
    physicalState: "Sem erros",
  });

  // +------------------------------------------------------------------------+

  function handleTypeName(e) {
    const name = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      elementName: name,
    });

    if (name.length < 3) {
      setCheckData({
        ...checkData,
        elementName: false,
      });
      setErrorMessage({
        ...errorMessage,
        elementName: "O nome do elemento deve ter pelo menos 3 caracteres.",
      });

      return;
    }

    if (name.length > 128) {
      setCheckData({
        ...checkData,
        elementName: false,
      });
      setErrorMessage({
        ...errorMessage,
        elementName: "O nome do elemento deve ter no máximo 128 caracteres.",
      });

      return;
    }

    setCheckData({
      ...checkData,
      elementName: true,
    });
    setErrorMessage({
      ...errorMessage,
      elementName: "Sem erros",
    });

    return;
  }

  function handleTypeQuantity(e) {
    const quantity = parseFloat(e.target.value);

    setNewElementInfo({
      ...newElementInfo,
      Quantity: quantity,
    });

    if (quantity <= 0) {
      setCheckData({
        ...checkData,
        Quantity: false,
      });
      setErrorMessage({
        ...errorMessage,
        Quantity: "Inválido",
      });

      return;
    }

    console.log(e.target.value);

    if (isNaN(quantity) || quantity === null || e.target.value === "") {
      setCheckData({
        ...checkData,
        Quantity: false,
      });

      setErrorMessage({
        ...errorMessage,
        Quantity: "Inválido",
      });

      return;
    }

    setCheckData({
      ...checkData,
      Quantity: true,
    });

    setErrorMessage({
      ...errorMessage,
      Quantity: "Sem erros",
    });

    return;
  }

  function handleTypeDescription(e) {
    const description = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      description: description,
    });

    if (description.length < 3) {
      setCheckData({
        ...checkData,
        description: false,
      });
      setErrorMessage({
        ...errorMessage,
        description:
          "A descrição do elemento deve ter pelo menos 3 caracteres.",
      });

      return;
    }

    if (description.length > 1024) {
      setCheckData({
        ...checkData,
        description: false,
      });
      setErrorMessage({
        ...errorMessage,
        description:
          "A descrição do elemento deve ter no máximo 1024 caracteres.",
      });

      return;
    }

    setCheckData({
      ...checkData,
      description: true,
    });
    setErrorMessage({
      ...errorMessage,
      description: "Sem erros",
    });

    return;
  }

  function handleTypeMolarMass(e) {
    const molarMass = parseFloat(e.target.value);

    setNewElementInfo({
      ...newElementInfo,
      molecularWeight: molarMass,
    });

    if (molarMass <= 0) {
      setCheckData({
        ...checkData,
        molecularWeight: false,
      });
      setErrorMessage({
        ...errorMessage,
        molecularWeight: "A massa molar do elemento deve ser maior que 0.",
      });

      return;
    }

    if (isNaN(molarMass) || molarMass === null || e.target.value === "") {
      setCheckData({
        ...checkData,
        molecularWeight: false,
      });

      setErrorMessage({
        ...errorMessage,
        molecularWeight: "Inválido",
      });

      return;
    }

    setCheckData({
      ...checkData,
      molecularWeight: true,
    });

    setErrorMessage({
      ...errorMessage,
      molecularWeight: "Sem erros",
    });

    return;
  }

  function handleTypeCASNumber(e) {
    const CASNumber = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      CASNumber: CASNumber,
    });

    if (CASNumber.length < 3) {
      setCheckData({
        ...checkData,
        CASNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        CASNumber: "O número CAS do elemento deve ter pelo menos 3 caracteres.",
      });

      return;
    }

    if (CASNumber.length > 32) {
      setCheckData({
        ...checkData,
        CASNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        CASNumber: "O número CAS do elemento deve ter no máximo 32 caracteres.",
      });

      return;
    }

    setCheckData({
      ...checkData,
      CASNumber: true,
    });
    setErrorMessage({
      ...errorMessage,
      CASNumber: "Sem erros",
    });

    return;
  }

  function handleTypeECNumber(e) {
    const ECNumber = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      ECNumber: ECNumber,
    });

    if (ECNumber.length < 3) {
      setCheckData({
        ...checkData,
        ECNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        ECNumber: "O número EC do elemento deve ter pelo menos 3 caracteres.",
      });

      return;
    }

    if (ECNumber.length > 32) {
      setCheckData({
        ...checkData,
        ECNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        ECNumber: "O número EC do elemento deve ter no máximo 32 caracteres.",
      });

      return;
    }

    setCheckData({
      ...checkData,
      ECNumber: true,
    });
    setErrorMessage({
      ...errorMessage,
      ECNumber: "Sem erros",
    });

    return;
  }

  function handleTypeImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewElementInfo({
        ...newElementInfo,
        image: reader.result.toString(),
      });
    };

    setCheckData({ ...checkData, image: true });
    setErrorMessage({ ...errorMessage, image: "Sem erros!" });

    reader.readAsDataURL(file);

    return;
  }

  // +------------------------------------------------------------------------+

  async function handleEditAll() {
    // Nome:
    if (
      checkData.elementName &&
      newElementInfo.elementName !== element.elementName
    ) {
      const result = await editName(
        element.elementId,
        newElementInfo.elementName
      );

      if (result.status === false) {
        setCheckData({
          ...checkData,
          elementName: false,
        });
        setErrorMessage({
          ...errorMessage,
          elementName: result.message,
        });
      }
    }

    // Quantidade:
    if (checkData.Quantity && newElementInfo.Quantity !== element.Quantity) {
      const result = await editQuantity(
        element.elementId,
        newElementInfo.Quantity
      );

      if (result.status === false) {
        setCheckData({
          ...checkData,
          Quantity: false,
        });
        setErrorMessage({
          ...errorMessage,
          Quantity: result.message,
        });
      }
    }

    // Descrição:
    if (
      checkData.description &&
      newElementInfo.description !== element.description
    ) {
      const result = await editDescription(
        element.elementId,
        newElementInfo.description
      );

      if (result.status === false) {
        setCheckData({
          ...checkData,
          description: false,
        });
        setErrorMessage({
          ...errorMessage,
          description: result.message,
        });
      }
    }

    // Massa molar:
    if (
      checkData.molecularWeight &&
      newElementInfo.molecularWeight !== element.molecularWeight
    ) {
      const result = await editMolarMass(
        element.elementId,
        newElementInfo.molecularWeight
      );

      if (result.status === false) {
        setCheckData({
          ...checkData,
          molecularWeight: false,
        });
        setErrorMessage({
          ...errorMessage,
          molecularWeight: result.message,
        });
      }
    }

    // Número CAS:
    if (checkData.CASNumber && newElementInfo.CASNumber !== element.CASNumber) {
      const result = await editCASNumber(
        element.elementId,
        newElementInfo.CASNumber
      );

      if (result.status === false) {
        setCheckData({
          ...checkData,
          CASNumber: false,
        });
        setErrorMessage({
          ...errorMessage,
          CASNumber: result.message,
        });
      }
    }

    // Número EC:
    if (checkData.ECNumber && newElementInfo.ECNumber !== element.ECNumber) {
      const result = await editECNumber(
        element.elementId,
        newElementInfo.ECNumber
      );

      if (result.status === false) {
        setCheckData({
          ...checkData,
          ECNumber: false,
        });
        setErrorMessage({
          ...errorMessage,
          ECNumber: result.message,
        });
      }
    }

    // Estado físico:
    if (
      checkData.physicalState &&
      newElementInfo.physicalState !== element.physicalState
    ) {
      const result = await editPhysicalState(
        element.elementId,
        newElementInfo.physicalState
      );

      if (result.status === false) {
        setCheckData({
          ...checkData,
          physicalState: false,
        });
        setErrorMessage({
          ...errorMessage,
          physicalState: result.message,
        });
      }
    }

    // Imagem:
    if (checkData.image && newElementInfo.image !== element.image) {
      const result = await editImage(element.elementId, newElementInfo.image);

      if (result.status === false) {
        setCheckData({
          ...checkData,
          image: false,
        });
        setErrorMessage({
          ...errorMessage,
          image: result.message,
        });
      }
    }

    if (
      checkData.elementName &&
      checkData.Quantity &&
      checkData.description &&
      checkData.molecularWeight &&
      checkData.CASNumber &&
      checkData.ECNumber &&
      checkData.physicalState &&
      checkData.image
    ) {
      reload();
    }

    return;
  }

  return (
    <>
      <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
        <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col xs:w-full xs:h-full xs:rounded-none">
          <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
            <h1 className="text-lg text-iflab_white">
              {" "}
              Informações sobre o elemento{" "}
              <span className="font-bold text-iflab_green_light">
                {element.elementName}
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
            <div className="w-full h-full gap-2 flex flex-col">
              <div className="w-full">
                <ul className="flex">
                  <li
                    className={`w-full text-center py-2 border-iflab_gray_medium duration-75 ${
                      page === 1
                        ? "border-b-iflab_white hover:text-iflab_gray border-r"
                        : "border-b hover:bg-iflab_green_light hover:text-iflab_white cursor-pointer"
                    }`}
                    onClick={() => setpage(1)}
                  >
                    Detalhes
                  </li>
                  <li
                    className={`w-full text-center py-2 border-iflab_gray_medium duration-75 ${
                      page === 2
                        ? "border-b-iflab_white hover:text-iflab_gray border-x"
                        : "border-b hover:bg-iflab_green_light hover:text-iflab_white cursor-pointer"
                    }`}
                    onClick={() => setpage(2)}
                  >
                    Editar informações
                  </li>
                  <li
                    className={`w-full text-center py-2 border-iflab_gray_medium duration-75 ${
                      page === 3
                        ? "border-b-iflab_white hover:text-iflab_gray border-l"
                        : "border-b hover:bg-iflab_red hover:text-iflab_white cursor-pointer"
                    }`}
                    onClick={() => setpage(3)}
                  >
                    Excluir elemento
                  </li>
                </ul>
              </div>

              {page === 1 ? (
                <div className="w-full h-full gap-2 flex flex-col p-5">
                  <h1 className="text-sm text-iflab_gray font-bold">
                    Detalhes do elemento
                  </h1>
                  <div className="w-full h-full gap-2 flex flex-col">
                    <div className="flex w-full h-fit gap-2 border border-iflab_gray_medium rounded-lg">
                      <div className="h-[13rem] w-[13rem] flex justify-center items-center border-r border-iflab_gray_medium">
                        <img
                          src={element.image || potion}
                          alt={"Elemento"}
                          className={`${
                            !!element.image ? "w-full h-full object-cover" : ""
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-2 p-5 justify-center">
                        <h1 className="text-sm text-iflab_gray">
                          Nome:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {element.elementName}
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray">
                          Massa molar:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {element.molecularWeight} g/mol
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray">
                          Estado físico:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {element.physicalState === 1
                              ? "Sólido"
                              : element.physicalState === 2
                              ? "Líquido"
                              : "Gasoso"}
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray">
                          Quantidade:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {element.Quantity}{" "}
                            {element.physicalState === 1
                              ? "g"
                              : element.physicalState === 2
                              ? "mL"
                              : "un"}
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray">
                          Número CAS:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {element.CASNumber}
                          </span>
                        </h1>
                        <h1 className="text-sm text-iflab_gray">
                          Número EC:{" "}
                          <span className="font-bold text-iflab_gray_dark">
                            {element.ECNumber}
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="w-full h-full p-5">
                      <h1>Observações:</h1>
                      <p className="text-sm text-iflab_gray">
                        {element.description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : page === 2 ? (
                <div className="w-full h-full gap-2 flex flex-col p-5">
                  <div className="w-full h-full gap-2 flex flex-col">
                    <div className="h-full p-5 flex flex-col gap-2">
                      {subPage === 1 ? (
                        <>
                          <div className="w-full flex gap-2">
                            <div className="w-[70%]">
                              <TextInput
                                predata={newElementInfo.elementName}
                                label={"Nome do elemento"}
                                name={"elementName"}
                                errorMessage={errorMessage.elementName}
                                state={checkData.elementName}
                                type={"text"}
                                icon={potion}
                                onChange={(e) => handleTypeName(e)}
                              />
                            </div>
                            <div className="w-[30%]">
                              <TextInput
                                predata={newElementInfo.Quantity}
                                label={"Quantidade"}
                                name={"Quantity"}
                                errorMessage={errorMessage.Quantity}
                                state={checkData.Quantity}
                                type={"number"}
                                icon={quantity}
                                onChange={(e) => handleTypeQuantity(e)}
                              />
                            </div>
                          </div>
                          <div className="flex w-full gap-5">
                            {/* CAS e EC */}
                            <div className="w-full">
                              <TextInput
                                predata={newElementInfo.CASNumber}
                                label={"Número CAS"}
                                name={"CASNumber"}
                                errorMessage={errorMessage.CASNumber}
                                state={checkData.CASNumber}
                                type={"text"}
                                icon={cas}
                                onChange={(e) => handleTypeCASNumber(e)}
                              />
                            </div>

                            <div className="w-full">
                              <TextInput
                                predata={newElementInfo.ECNumber}
                                label={"Número EC"}
                                name={"ECNumber"}
                                errorMessage={errorMessage.ECNumber}
                                state={checkData.ECNumber}
                                type={"text"}
                                icon={ec}
                                onChange={(e) => handleTypeECNumber(e)}
                              />
                            </div>
                          </div>

                          <div className="flex w-full gap-5">
                            <div className="w-full">
                              <TextInput
                                predata={newElementInfo.molecularWeight}
                                label={"Massa molar (g/mol)"}
                                name={"molecularWeight"}
                                errorMessage={errorMessage.molecularWeight}
                                state={checkData.molecularWeight}
                                type={"number"}
                                icon={equipment}
                                onChange={(e) => handleTypeMolarMass(e)}
                              />
                            </div>
                            <div className="w-full flex justify-center items-center">
                              <div
                                className={`flex w-full rounded-md border ${
                                  !checkData.physicalState ||
                                  newElementInfo.physicalState ===
                                    element.physicalState
                                    ? "border-iflab_white"
                                    : "border-iflab_green_light"
                                }`}
                              >
                                <div
                                  className={`w-full p-2 text-center rounded-l-md ${
                                    newElementInfo.physicalState === 1
                                      ? "bg-iflab_white_dark"
                                      : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                                  }`}
                                  onClick={() => {
                                    setNewElementInfo({
                                      ...newElementInfo,
                                      physicalState: 1,
                                    });

                                    setCheckData({
                                      ...checkData,
                                      physicalState: true,
                                    });
                                  }}
                                >
                                  Sólido
                                </div>
                                <div
                                  className={`w-full p-2 text-center ${
                                    newElementInfo.physicalState === 2
                                      ? "bg-iflab_white_dark"
                                      : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                                  }`}
                                  onClick={() => {
                                    setNewElementInfo({
                                      ...newElementInfo,
                                      physicalState: 2,
                                    });

                                    setCheckData({
                                      ...checkData,
                                      physicalState: true,
                                    });
                                  }}
                                >
                                  Líquido
                                </div>

                                <div
                                  className={`w-full p-2 text-center rounded-r-md ${
                                    newElementInfo.physicalState === 3
                                      ? "bg-iflab_white_dark"
                                      : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                                  }`}
                                  onClick={() => {
                                    setNewElementInfo({
                                      ...newElementInfo,
                                      physicalState: 3,
                                    });

                                    setCheckData({
                                      ...checkData,
                                      physicalState: true,
                                    });
                                  }}
                                >
                                  Gasoso
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : subPage === 2 ? (
                        <>
                          <div className="w-full h-full">
                            <label htmlFor="description">Observações:</label>
                            <textarea
                              id="description"
                              name="description"
                              className={`w-full h-[90%] border rounded-lg p-5 bg-iflab_white_light resize-none outline-none ${
                                !checkData.description
                                  ? "border-iflab_red"
                                  : newElementInfo.description ===
                                    element.description
                                  ? "border-iflab_white"
                                  : "border-iflab_green_light"
                              }`}
                              placeholder="Descrição do elemento"
                              value={newElementInfo.description}
                              onChange={(e) => handleTypeDescription(e)}
                            ></textarea>
                          </div>
                        </>
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
                                className={`w-40 h-40 border rounded-full overflow-hidden flex justify-center items-center ${
                                  !checkData.image
                                    ? "border-iflab_red"
                                    : newElementInfo.image === element.image
                                    ? !!newElementInfo.image
                                      ? "border-iflab_white "
                                      : "border-iflab_gray bg-iflab_white_dark"
                                    : "border-iflab_green_light"
                                }`}
                              >
                                <img
                                  src={newElementInfo.image || potion}
                                  alt="Elemento"
                                  className={`${
                                    !!newElementInfo.image
                                      ? "object-cover w-full h-full"
                                      : ""
                                  }`}
                                />
                              </div>

                              <h1 className="text-iflab_gray text-sm">
                                Clique para alterar a imagem
                              </h1>
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
                        onClick={() => prevpage()}
                      >
                        <img
                          src={chevrom}
                          alt="Voltar"
                          className="h-5 w-5 rotate-90"
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
                          className="h-5 w-15 -rotate-90"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 h-fit w-full justify-end">
                      <TButton
                        text="Desfazer"
                        onClick={() => {
                          setNewElementInfo(element);
                          setCheckData({
                            CASNumber: true,
                            ECNumber: true,
                            Quantity: true,
                            description: true,
                            elementName: true,
                            image: true,
                            molecularWeight: true,
                            physicalState: true,
                          });

                          setErrorMessage({
                            CASNumber: "Sem erros",
                            ECNumber: "Sem erros",
                            Quantity: "Sem erros",
                            description: "Sem erros",
                            elementName: "Sem erros",
                            image: "Sem erros",
                            molecularWeight: "Sem erros",
                            physicalState: "Sem erros",
                          });
                        }}
                        disabled={
                          newElementInfo.elementName === element.elementName &&
                          newElementInfo.Quantity === element.Quantity &&
                          newElementInfo.description === element.description &&
                          newElementInfo.molecularWeight ===
                            element.molecularWeight &&
                          newElementInfo.CASNumber === element.CASNumber &&
                          newElementInfo.ECNumber === element.ECNumber &&
                          newElementInfo.physicalState ===
                            element.physicalState &&
                          newElementInfo.image === element.image
                        }
                      />
                      <PButton
                        text={"Salvar alterações"}
                        onClick={() => handleEditAll()}
                        disabled={
                          (newElementInfo.elementName === element.elementName &&
                            newElementInfo.Quantity === element.Quantity &&
                            newElementInfo.description ===
                              element.description &&
                            newElementInfo.molecularWeight ===
                              element.molecularWeight &&
                            newElementInfo.CASNumber === element.CASNumber &&
                            newElementInfo.ECNumber === element.ECNumber &&
                            newElementInfo.physicalState ===
                              element.physicalState &&
                            newElementInfo.image === element.image) ||
                          !checkData.elementName ||
                          !checkData.Quantity ||
                          !checkData.description ||
                          !checkData.molecularWeight ||
                          !checkData.CASNumber ||
                          !checkData.ECNumber ||
                          !checkData.physicalState ||
                          !checkData.image
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full gap-2 flex flex-col p-5">
                  <h1 className="text-sm text-iflab_gray font-bold">
                    Excluir elemento
                  </h1>
                  <div className="w-full h-[80%] p-5 flex flex-col items-center justify-center gap-10">
                    <h1 className="text-lg text-iflab_gray">
                      Tem certeza que deseja{" "}
                      <span className="text-iflab_red_dark font-bold">
                        excluir
                      </span>{" "}
                      o elemento{" "}
                      <span className="font-bold text-iflab_gray_dark">
                        {element.elementName}
                      </span>
                      ?
                    </h1>

                    <PButton
                      text="Excluir elemento"
                      goodAction={false}
                      icon={trash}
                      onClick={() => {
                        DeleteElement(element.elementId);
                        reload();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ElementModal;
