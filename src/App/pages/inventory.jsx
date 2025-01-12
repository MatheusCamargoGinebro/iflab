/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Importando componentes:
import Header from "../../components/header/Header";
import ElementCard from "../../components/card/ElementCard";
import AddElementModal from "../../components/Modals/AddElementModal";
import EquipmentCard from "../../components/card/EquipmentCard";
import AddEquipment from "../../components/Modals/AddEquipment";

// Importando imagens e ícones:
import more from "../../assets/icons/UI/more.png";

// API:
import { getLabElements } from "../../api/elements_requests";
import { getLabEquipments } from "../../api/equipments_requests";
import { getLabById } from "../../api/lab_requests";

// Renderização do componente:
function Inventory() {
  // ID do laboratório:
  const { id } = useParams();
  const labId = parseInt(id);

  const [elementsList, setElementsList] = useState(null);
  const [equipmentsList, setEquipmentsList] = useState(null);
  const [labInfo, setLabInfo] = useState(null);

  const [showAddElementModal, setShowAddElementModal] = useState(false);
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);

  useEffect(() => {
    async function fetchElements() {
      const elements = await getLabElements(labId);

      if (elements.status) {
        setElementsList(elements.data);
      } else {
        setElementsList([]);
      }

      return;
    }

    async function fetchEquipments() {
      const equipments = await getLabEquipments(labId);

      if (equipments.status) {
        setEquipmentsList(equipments.data);
      } else {
        setEquipmentsList([]);
      }

      return;
    }

    async function fetchLabInfo() {
      const lab = await getLabById(labId);

      if (lab.status) {
        setLabInfo(lab.lab);
      } else {
        window.location.href = "/home";
      }

      return;
    }

    fetchLabInfo();
    fetchElements();
    fetchEquipments();
  }, [labId]);

  return (
    !!elementsList &&
    !!equipmentsList && (
      <>
        <div className="w-screen h-screen flex flex-col pb-0 overflow-hidden">
          <Header />

          <div
            className=" z-50 w-fit h-fit m-5 p-5 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg shadow-lg cursor-pointer duration-75 fixed"
            onClick={() => (window.location.href = "/home")}
          >
            <h1>Voltar para tela inicial</h1>
          </div>

          <div className="h-full bottom-0 pb-64 flex gap-10 items-center flex-col overflow-y-auto">
            <div className="w-full flex justify-center mt-32 text-center">
              <h1 className="text-2xl">
                Inventário do laboratório{" "}
                <span className="text-iflab_green_light font-bold">
                  {labInfo.labName}
                </span>
              </h1>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold border-b border-iflab_gray_medium">
                Elementos:
              </h2>
              <div className="w-fit grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {elementsList.map(
                  (element, index) =>
                    elementsList.length > 0 && (
                      <ElementCard key={index} elementId={element.elementId} />
                    )
                )}
                <div
                  className="w-[20rem] h-[25rem] bg-iflab_white_light rounded-lg hover:scale-105 shadow-md hover:shadow-lg cursor-pointer duration-75 flex flex-col justify-center items-center group"
                  onClick={() => setShowAddElementModal(true)}
                >
                  <img
                    src={more}
                    alt="Adicionar elemento"
                    className="w-32 h-32"
                  />
                  <h1 className="font-bold text-iflab_gray_light group-hover:text-iflab_gray duration-75">
                    Adicionar elemento
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-14">
              <h2 className="text-xl font-semibold border-b border-iflab_gray_medium">
                Equipamentos:
              </h2>
              <div className="w-fit grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {equipmentsList.map(
                  (equipment, index) =>
                    equipmentsList.length > 0 && (
                      <EquipmentCard
                        key={index}
                        equipmentId={equipment.equipmentId}
                      />
                    )
                )}
                <div
                  className="w-[20rem] h-[25rem] bg-iflab_white_light rounded-lg hover:scale-105 shadow-md hover:shadow-lg cursor-pointer duration-75 flex flex-col justify-center items-center group"
                  onClick={() => setShowAddEquipmentModal(true)}
                >
                  <img
                    src={more}
                    alt="Adicionar equipamento"
                    className="w-32 h-32"
                  />
                  <h1 className="font-bold text-iflab_gray_light group-hover:text-iflab_gray duration-75">
                    Adicionar equipamento
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAddElementModal && (
          <AddElementModal
            labId={labId}
            closeModal={() => setShowAddElementModal(false)}
          />
        )}
        {showAddEquipmentModal && (
          <AddEquipment
            labId={labId}
            closeModal={() => setShowAddEquipmentModal(false)}
          />
        )}
      </>
    )
  );
}

export default Inventory;
