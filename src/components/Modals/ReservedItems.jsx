// O=============================================================================================O */

// Hooks de state:
import React, { useState, useEffect } from "react";

// Imagens e icones:

// Componentes:
import TButton from "../buttons/TButton";

// API:
import { getSessionElements } from "../../api/elements_requests";
import { getSessionEquipments } from "../../api/equipments_requests";

// Função:
function ReservedItems({ sessionId, closeModal }) {
  const [reservedEquipments, setReservedEquipments] = useState(null);
  const [reservedElements, setReservedElements] = useState(null);

  useEffect(() => {
    async function fetchEquipments() {
      const equipments = await getSessionEquipments(sessionId);

      if (equipments.status) {
        setReservedEquipments(equipments.data);
      } else {
        setReservedEquipments([]);
      }

      return;
    }

    async function fetchElements() {
      const elements = await getSessionElements(sessionId);

      if (elements.status) {
        setReservedElements(elements.data);
      } else {
        setReservedElements([]);
      }

      return;
    }

    fetchEquipments();
    fetchElements();
  }, [sessionId]);

  return (
    !!reservedElements &&
    !!reservedEquipments && (
      <div className="w-full h-full flex flex-col gap-5 pb-5">
        <div className="flex justify-between items-center pt-5 px-5">
          <h1 className="text-lg text-iflab_gray_dark font-bold">
            Itens reservados na sessão {sessionId}
          </h1>
          <TButton text="Voltar" onClick={closeModal} />
        </div>
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full p-2">
            <h1 className="text-lg text-iflab_gray_dark font-bold">
              Equipamentos
            </h1>
            <div className="w-full h-fit max-h-[22rem] p-5 rounded-lg flex flex-wrap gap-2 overflow-y-auto">
              {reservedEquipments.length > 0 ? (
                reservedEquipments.map((equipment) => (
                  <div
                    className="w-full h-fit p-2 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg duration-75 group"
                    key={equipment.equipmentId}
                  >
                    <h1 className="text-sm text-iflab_gray_dark font-bold">
                      {equipment.reservedQuantity}x {equipment.equipmentName}
                    </h1>
                  </div>
                ))
              ) : (
                <h1 className="text-sm text-iflab_gray_dark font-bold">
                  Nenhum equipamento reservado
                </h1>
              )}
            </div>
          </div>
          <div className="w-1/2 h-full p-2">
            <h1 className="text-lg text-iflab_gray_dark font-bold">
              Elementos
            </h1>
            <div className="w-full h-fit max-h-[22rem] p-5 rounded-lg flex flex-wrap gap-2 overflow-y-auto">
              {reservedElements.length > 0 ? (
                reservedElements.map((element) => (
                  <div
                    className="w-full h-fit p-2 bg-iflab_white_light hover:bg-iflab_white_dark rounded-lg duration-75 group"
                    key={element.elementId}
                  >
                    <h1 className="text-sm text-iflab_gray_dark font-bold">
                      {element.reservedQuantity}x {element.elementName}
                    </h1>
                  </div>
                ))
              ) : (
                <h1 className="text-sm text-iflab_gray_dark font-bold">
                  Nenhum elemento reservado
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ReservedItems;
