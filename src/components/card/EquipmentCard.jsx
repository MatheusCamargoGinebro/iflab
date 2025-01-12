/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useState, useEffect } from "react";

// Importando imagens e ícones:
import equipmentIcon from "../../assets/icons/UI/equipment.png";
import alert2 from "../../assets/icons/UI/alert2.png";
import check from "../../assets/icons/UI/check.png";

// Importando componentes:
import EquipmentModal from "../Modals/EquipmentModal";

// API:
import { getEquipmentById } from "../../api/equipments_requests";

/* O=============================================================================================O */

function EquipmentCard({ equipmentId, userLevel }) {
  const [equipment, setEquipment] = useState(null);

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    async function fetchEquipment() {
      const response = await getEquipmentById(equipmentId);

      if (response.status) {
        setEquipment(response.data);
      } else {
        setEquipment(null);
      }

      return;
    }

    fetchEquipment();
  }, [equipmentId]);

  return (
    !!equipment && (
      <>
        <div
          className="w-[20rem] h-[25rem] bg-iflab_white_light rounded-lg hover:scale-105 shadow-md hover:shadow-lg cursor-pointer duration-75"
          onClick={() => setShowMoreInfo(true)}
        >
          <div
            className={`rounded-t-lg w-full h-2/5 border-b border-iflab_gray_medium ${
              !!equipment.image ? "" : "flex justify-center items-center"
            }`}
          >
            <img
              src={equipment.image || equipmentIcon}
              alt={equipment.equipmentName}
              className={
                !!equipment.image
                  ? "w-full h-full object-cover rounded-t-lg"
                  : ""
              }
            />
          </div>
          <div className="w-full h-3/5">
            {equipment.supervisorLevel === 1 ? (
              <div className="text-sm flex items-center justify-center gap-2 p-1 border-b border-iflab_gray_medium">
                <img src={alert2} alt="Alert" className="w-5 h-5" />
                <h1>
                  Sob supervisão da{" "}
                  <span className="font-bold">polícia federal</span>
                </h1>
              </div>
            ) : equipment.supervisorLevel === 2 ? (
              <div className="text-sm flex items-center justify-center gap-2 p-1 border-b border-iflab_gray_medium">
                <img src={alert2} alt="Alert" className="w-5 h-5" />
                <h1>
                  Sob supervisão do <span className="font-bold"> exército</span>
                </h1>
              </div>
            ) : (
              <div className="text-sm flex items-center justify-center gap-2 p-1 border-b border-iflab_gray_medium">
                <img src={check} alt="Alert" className="w-5 h-5" />
                <h1>
                  Sob supervisão do <span className="font-bold">IFLab</span>
                </h1>
              </div>
            )}
            <div className="p-5 w-full h-full gap-2 flex flex-col">
              <h1 className="text-iflab_gray">
                Nome:{" "}
                <span className="font-bold text-iflab_gray_dark">
                  {equipment.equipmentName}
                </span>
              </h1>
              <h1 className="text-iflab_gray">
                Quantidade disponível:{" "}
                <span className="font-bold text-iflab_gray_dark">
                  {equipment.availableQuantity}/{equipment.totalQuantity}
                </span>
              </h1>

              <h1 className="text-iflab_gray">
                Qualidade:{" "}
                <span className="font-bold text-iflab_gray_dark">
                  {equipment.quality}/5
                </span>
              </h1>
            </div>
          </div>
        </div>

        {showMoreInfo && (
          <EquipmentModal
            equipment={equipment}
            closeModal={() => setShowMoreInfo(false)}
            reload={() => window.location.reload()}
            userLevel={userLevel}
          />
        )}
      </>
    )
  );
}

export default EquipmentCard;

/* O=============================================================================================O */
