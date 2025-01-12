/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useState } from "react";

// Importando imagens e ícones:
import close from "../../assets/icons/UI/close.png";
import potion from "../../assets/icons/UI/potion.png";
import chevrom from "../../assets/icons/UI/chevrom.png";
import equipment from "../../assets/icons/UI/equipment.png";
import cas from "../../assets/icons/UI/cas-number.png";
import ec from "../../assets/icons/UI/ec-number.png";
import quantity from "../../assets/icons/UI/access-relatory.png";

// Importando componente:
import PButton from "../buttons/PButton";
import TextInput from "../inputs/TextInput";
import ErrorModal from "../Modals/ErrorModal";

// API:
import { RegisterElement } from "../../api/elements_requests";

/* O=============================================================================================O */

function AddElementModal({ labId, closeModal }) {
  const [page, setPage] = useState(1);

  function nextpage() {
    if (page < 4) {
      setPage(page + 1);
    }
  }

  function previouspage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const [newElementInfo, setNewElementInfo] = useState({
    element_name: "",
    element_quantity: 0,
    element_description: "",
    element_molarMass: 0,
    element_casNumber: "",
    element_ecNumber: "",
    element_physicalState: 1,
    element_image: "",
    element_validity: 0,
    element_supervisorLevel: 0,
    element_labId: labId,
  });

  const [checkData, setCheckData] = useState({
    element_name: false,
    element_quantity: false,
    element_description: false,
    element_molarMass: false,
    element_casNumber: false,
    element_ecNumber: false,
    element_physicalState: false,
    element_image: false,
    element_validity: false,
    element_supervisorLevel: false,
    element_labId: true,
  });

  const [errorMessage, setErrorMessage] = useState({
    element_name: "Sem erros",
    element_quantity: "Sem erros",
    element_description: "Sem erros",
    element_molarMass: "Sem erros",
    element_casNumber: "Sem erros",
    element_ecNumber: "Sem erros",
    element_physicalState: "Sem erros",
    element_image: "Sem erros",
    element_validity: "Sem erros",
    element_supervisorLevel: "Sem erros",
    element_labId: "Sem erros",
  });

  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  // +---------------------------------------------------------------------------------+

  function handleTypeName(e) {
    const name = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      element_name: name,
    });

    if (name.length < 3) {
      setCheckData({
        ...checkData,
        element_name: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_name: "O nome do elemento deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (name.length > 128) {
      setCheckData({
        ...checkData,
        element_name: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_name: "O nome do elemento deve ter no máximo 128 caracteres",
      });

      return;
    }

    setCheckData({
      ...checkData,
      element_name: true,
    });
    setErrorMessage({
      ...errorMessage,
      element_name: "Sem erros",
    });

    return;
  }

  function handleTypeQuantity(e) {
    const quantity = parseFloat(e.target.value);

    setNewElementInfo({
      ...newElementInfo,
      element_quantity: quantity,
    });

    if (isNaN(quantity)) {
      setCheckData({
        ...checkData,
        element_quantity: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_quantity: "A quantidade do elemento deve ser um número",
      });
      return;
    }

    if (quantity < 0) {
      setCheckData({
        ...checkData,
        element_quantity: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_quantity: "A quantidade do elemento não pode ser negativa",
      });

      return;
    }

    setCheckData({
      ...checkData,
      element_quantity: true,
    });
    setErrorMessage({
      ...errorMessage,
      element_quantity: "Sem erros",
    });

    return;
  }

  function handleTypeDescription(e) {
    const description = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      element_description: description,
    });

    if (description.length < 3) {
      setCheckData({
        ...checkData,
        element_description: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_description:
          "A descrição do elemento deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (description.length > 1024) {
      setCheckData({
        ...checkData,
        element_description: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_description:
          "A descrição do elemento deve ter no máximo 1024 caracteres",
      });

      return;
    }

    setCheckData({
      ...checkData,
      element_description: true,
    });
    setErrorMessage({
      ...errorMessage,
      element_description: "Sem erros",
    });

    return;
  }

  function handleTypeMolarMass(e) {
    const molarMass = parseFloat(e.target.value);

    setNewElementInfo({
      ...newElementInfo,
      element_molarMass: molarMass,
    });

    if (molarMass < 0) {
      setCheckData({
        ...checkData,
        element_molarMass: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_molarMass: "A massa molar do elemento não pode ser negativa",
      });

      return;
    }

    setCheckData({
      ...checkData,
      element_molarMass: true,
    });
    setErrorMessage({
      ...errorMessage,
      element_molarMass: "Sem erros",
    });

    return;
  }

  function handleTypeCasNumber(e) {
    const casNumber = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      element_casNumber: casNumber,
    });

    if (casNumber.length < 3) {
      setCheckData({
        ...checkData,
        element_casNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_casNumber:
          "O número CAS do elemento deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (casNumber.length > 32) {
      setCheckData({
        ...checkData,
        element_casNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_casNumber:
          "O número CAS do elemento deve ter no máximo 32 caracteres",
      });

      return;
    }

    setCheckData({
      ...checkData,
      element_casNumber: true,
    });
    setErrorMessage({
      ...errorMessage,
      element_casNumber: "Sem erros",
    });

    return;
  }

  function handleTypeEcNumber(e) {
    const ecNumber = e.target.value;

    setNewElementInfo({
      ...newElementInfo,
      element_ecNumber: ecNumber,
    });

    if (ecNumber.length < 3) {
      setCheckData({
        ...checkData,
        element_ecNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_ecNumber:
          "O número EC do elemento deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (ecNumber.length > 32) {
      setCheckData({
        ...checkData,
        element_ecNumber: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_ecNumber:
          "O número EC do elemento deve ter no máximo 32 caracteres",
      });

      return;
    }

    setCheckData({
      ...checkData,
      element_ecNumber: true,
    });
    setErrorMessage({
      ...errorMessage,
      element_ecNumber: "Sem erros",
    });

    return;
  }

  function handleTypeImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewElementInfo({
        ...newElementInfo,
        element_image: reader.result.toString(),
      });
    };

    setCheckData({ ...checkData, element_image: true });
    setErrorMessage({ ...errorMessage, element_image: "Sem erros!" });

    reader.readAsDataURL(file);

    return;
  }

  function handleTypeValidity(e) {
    const validity = new Date(e.target.value).getTime() / 1000;

    setNewElementInfo({
      ...newElementInfo,
      element_validity: validity,
    });

    if (validity <= 0) {
      setCheckData({
        ...checkData,
        element_validity: false,
      });
      setErrorMessage({
        ...errorMessage,
        element_validity: "A validade do elemento deve ser uma data futura",
      });

      return;
    }

    setCheckData({
      ...checkData,
      element_validity: true,
    });
    setErrorMessage({
      ...errorMessage,
      element_validity: "Sem erros",
    });

    return;
  }

  async function hanndleRegister() {
    const response = await RegisterElement(
      newElementInfo.element_name,
      newElementInfo.element_quantity,
      newElementInfo.element_description,
      newElementInfo.element_molarMass,
      newElementInfo.element_casNumber,
      newElementInfo.element_ecNumber,
      newElementInfo.element_physicalState,
      newElementInfo.element_image,
      newElementInfo.element_validity,
      newElementInfo.element_supervisorLevel,
      newElementInfo.element_labId
    );

    if (response.status === false) {
      setRequestError({ status: true, message: response.message });
      return;
    } else if (response.status === true) {
      closeModal();
      window.location.reload();
      return;
    }

    return;
  }

  // +---------------------------------------------------------------------------------+

  return (
    <>
      <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
        <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col xs:w-full xs:h-full xs:rounded-none">
          <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
            <h1 className="text-lg text-iflab_white">
              Adicionar novo elemento
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
            <div className="w-full h-full flex flex-col justify-between items-center p-5">
              {page === 1 ? (
                <div className="w-full h-full p-5 flex flex-col gap-5">
                  {/* nome quantidade Estado físico Validade */}
                  <TextInput
                    predata={newElementInfo.element_name}
                    label="Nome do elemento"
                    name="element_name"
                    errorMessage={errorMessage.element_name}
                    state={checkData.element_name}
                    type={"text"}
                    icon={potion}
                    onChange={(e) => handleTypeName(e)}
                  />

                  <TextInput
                    predata={newElementInfo.element_quantity}
                    label={`Quantidade (${
                      newElementInfo.element_physicalState === 1
                        ? "g"
                        : newElementInfo.element_physicalState === 2
                        ? "mL"
                        : "L"
                    })`}
                    name={"Quantity"}
                    errorMessage={errorMessage.Quantity}
                    state={checkData.element_quantity}
                    type={"number"}
                    icon={quantity}
                    onChange={(e) => handleTypeQuantity(e)}
                  />

                  <div className="w-full flex flex-col gap-5">
                    <label htmlFor="validityinput">Validade:</label>
                    <input
                      type="date"
                      id="validityinput"
                      name="validityinput"
                      value={
                        newElementInfo.element_validity === 0
                          ? ""
                          : new Date(newElementInfo.element_validity * 1000)
                              .toISOString()
                              .split("T")[0]
                      }
                      onChange={(e) => handleTypeValidity(e)}
                      className="w-full outline-none border-b-2 border-iflab_gray_light p-2 cursor-pointer hover:bg-iflab_white_dark hover:pl-4 duration-75"
                    />
                  </div>

                  <div className="flex w-full rounded-md border border-iflab_white mt-5">
                    <div
                      className={`w-full p-2 text-center rounded-l-md ${
                        newElementInfo.element_physicalState === 1
                          ? "bg-iflab_white_dark"
                          : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                      }`}
                      onClick={() => {
                        setNewElementInfo({
                          ...newElementInfo,
                          element_physicalState: 1,
                        });

                        setCheckData({
                          ...checkData,
                          element_physicalState: true,
                        });
                      }}
                    >
                      Sólido
                    </div>
                    <div
                      className={`w-full p-2 text-center ${
                        newElementInfo.element_physicalState === 2
                          ? "bg-iflab_white_dark"
                          : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                      }`}
                      onClick={() => {
                        setNewElementInfo({
                          ...newElementInfo,
                          element_physicalState: 2,
                        });

                        setCheckData({
                          ...checkData,
                          element_physicalState: true,
                        });
                      }}
                    >
                      Líquido
                    </div>

                    <div
                      className={`w-full p-2 text-center rounded-r-md ${
                        newElementInfo.element_physicalState === 3
                          ? "bg-iflab_white_dark"
                          : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                      }`}
                      onClick={() => {
                        setNewElementInfo({
                          ...newElementInfo,
                          element_physicalState: 3,
                        });

                        setCheckData({
                          ...checkData,
                          element_physicalState: true,
                        });
                      }}
                    >
                      Gasoso
                    </div>
                  </div>
                </div>
              ) : page === 2 ? (
                <div className="w-full h-full p-5 flex flex-col">
                  {/* CAS EC Massa Molar Nível de supervisão */}
                  <TextInput
                    predata={newElementInfo.element_casNumber}
                    label="Número CAS"
                    name="element_casNumber"
                    errorMessage={errorMessage.element_casNumber}
                    state={checkData.element_casNumber}
                    type={"text"}
                    icon={cas}
                    onChange={(e) => handleTypeCasNumber(e)}
                  />

                  <TextInput
                    predata={newElementInfo.element_ecNumber}
                    label="Número EC"
                    name="element_ecNumber"
                    errorMessage={errorMessage.element_ecNumber}
                    state={checkData.element_ecNumber}
                    type={"text"}
                    icon={ec}
                    onChange={(e) => handleTypeEcNumber(e)}
                  />

                  <TextInput
                    predata={newElementInfo.element_molarMass}
                    label={"Massa Molar (g/mol)"}
                    name={"molarMass"}
                    errorMessage={errorMessage.molarMass}
                    state={checkData.element_molarMass}
                    type={"number"}
                    icon={equipment}
                    onChange={(e) => handleTypeMolarMass(e)}
                  />

                  <div className="w-full flex flex-col gap-3 mt-10">
                    <label htmlFor="imageinput">Supervisão:</label>
                    <div className="flex w-full rounded-md border border-iflab_white">
                      <div
                        className={`w-full p-2 text-center rounded-l-md ${
                          newElementInfo.element_supervisorLevel === 0
                            ? "bg-iflab_white_dark"
                            : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                        }`}
                        onClick={() => {
                          setNewElementInfo({
                            ...newElementInfo,
                            element_supervisorLevel: 0,
                          });

                          setCheckData({
                            ...checkData,
                            element_supervisorLevel: true,
                          });
                        }}
                      >
                        IFLab
                      </div>
                      <div
                        className={`w-full p-2 text-center ${
                          newElementInfo.element_supervisorLevel === 1
                            ? "bg-iflab_white_dark"
                            : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                        }`}
                        onClick={() => {
                          setNewElementInfo({
                            ...newElementInfo,
                            element_supervisorLevel: 1,
                          });

                          setCheckData({
                            ...checkData,
                            element_supervisorLevel: true,
                          });
                        }}
                      >
                        Polícia Federal
                      </div>

                      <div
                        className={`w-full p-2 text-center rounded-r-md ${
                          newElementInfo.element_supervisorLevel === 2
                            ? "bg-iflab_white_dark"
                            : "bg-iflab_white_light hover:bg-iflab_white_dark cursor-pointer"
                        }`}
                        onClick={() => {
                          setNewElementInfo({
                            ...newElementInfo,
                            element_supervisorLevel: 2,
                          });

                          setCheckData({
                            ...checkData,
                            element_supervisorLevel: true,
                          });
                        }}
                      >
                        Exército Brasileiro
                      </div>
                    </div>
                  </div>
                </div>
              ) : page === 3 ? (
                <div className="w-full h-full p-5 flex flex-col gap-5">
                  {/* Descrição */}
                  <label htmlFor="description">Observações:</label>
                  <textarea
                    id="description"
                    name="description"
                    className={`w-full h-[90%] border rounded-lg p-5 bg-iflab_white_light resize-none outline-none ${
                      !checkData.element_description &&
                      newElementInfo.element_description.length !== 0
                        ? "border-iflab_red"
                        : newElementInfo.element_description.length > 0
                        ? "border-iflab_green_light"
                        : "border-iflab_white"
                    }`}
                    placeholder="Descrição do elemento"
                    value={newElementInfo.element_description}
                    onChange={(e) => handleTypeDescription(e)}
                  ></textarea>
                </div>
              ) : (
                <div className="w-full h-full p-5 flex flex-col gap-5">
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
                        !checkData.element_image
                          ? "border-iflab_red"
                          : newElementInfo.element_image === ""
                          ? "border-iflab_gray bg-iflab_white_dark"
                          : "border-iflab_green_light"
                      }`}
                    >
                      <img
                        src={newElementInfo.element_image || potion}
                        alt="Elemento"
                        className={`object-cover ${
                          newElementInfo.element_image === ""
                            ? "h-20 w-20"
                            : "h-full w-full"
                        }`}
                      />
                    </div>
                    <h1 className="text-iflab_gray text-sm">
                      Clique para alterar a imagem
                    </h1>
                  </label>
                </div>
              )}
              <div className="flex w-full">
                <div className="w-full flex items-center gap-5">
                  <div
                    className={`rounded-lg w-6 flex justify-start ${
                      page !== 1 ? "bg-iflab_white_light cursor-pointer" : ""
                    }`}
                    onClick={() => previouspage()}
                  >
                    <img
                      src={chevrom}
                      alt="Voltar"
                      className="h-5 w-5 rotate-90"
                    />
                  </div>
                  <h1>Página {page}</h1>

                  <div
                    className={`rounded-lg w-6 flex justify-end ${
                      page !== 4 ? "bg-iflab_white_light cursor-pointer" : ""
                    }`}
                    onClick={() => nextpage()}
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
                      checkData.element_name &&
                      checkData.element_quantity &&
                      checkData.element_description &&
                      checkData.element_molarMass &&
                      checkData.element_casNumber &&
                      checkData.element_ecNumber &&
                      checkData.element_physicalState &&
                      checkData.element_image &&
                      checkData.element_validity &&
                      checkData.element_supervisorLevel &&
                      checkData.element_labId
                        ? false
                        : true
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {requestError.status && (
        <ErrorModal
          message={requestError.message}
          onClose={() => setRequestError({ status: false, message: "" })}
        />
      )}
    </>
  );
}

export default AddElementModal;
