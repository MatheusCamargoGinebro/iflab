/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useState, useEffect } from "react";

// Importando imagens e ícones:
import potion from "../../assets/icons/UI/potion.png";
import alert2 from "../../assets/icons/UI/alert2.png";
import check from "../../assets/icons/UI/check.png";

// Importando componente:
import ElementModal from "../Modals/ElementModal";

// API:
import { getElementById } from "../../api/elements_requests";

/* O=============================================================================================O */

function ElementCard({ elementId, userLevel }) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const [element, setElement] = useState(null);

  async function fetchElement() {
    const element = await getElementById(elementId);

    if (element.status) {
      setElement(element.element);
    } else {
      setElement(null);
    }

    return;
  }

  useEffect(() => {
    fetchElement();
  }, [elementId]);

  return (
    !!element && (
      <>
        <div
          className="w-[20rem] h-[25rem] bg-iflab_white_light rounded-lg hover:scale-105 shadow-md hover:shadow-lg cursor-pointer duration-75"
          onClick={() => setShowMoreInfo(true)}
        >
          <div
            className={`rounded-t-lg w-full h-2/5 border-b border-iflab_gray_medium ${
              !!element.image ? "" : "flex justify-center items-center"
            }`}
          >
            <img
              src={element.image || potion}
              alt="Potion"
              className={
                !!element.image ? "w-full h-full object-cover rounded-t-lg" : ""
              }
            />
          </div>
          <div className="w-full h-3/5">
            {element.supervisorLevel === 1 ? (
              <div className="text-sm flex items-center justify-center gap-2 p-1 border-b border-iflab_gray_medium">
                <img src={alert2} alt="Alert" className="w-5 h-5" />
                <h1>
                  Material sob supervisão da{" "}
                  <span className="font-bold">polícia federal</span>
                </h1>
              </div>
            ) : element.supervisorLevel === 2 ? (
              <div className="text-sm flex items-center justify-center gap-2 p-1 border-b border-iflab_gray_medium">
                <img src={alert2} alt="Alert" className="w-5 h-5" />
                <h1>
                Material sob supervisão do{" "}
                  <span className="font-bold"> exército</span>
                </h1>
              </div>
            ) : (
              <div className="text-sm flex items-center justify-center gap-2 p-1 border-b border-iflab_gray_medium">
                <img src={check} alt="Alert" className="w-5 h-5" />
                <h1>
                Material sob supervisão do{" "}
                  <span className="font-bold">IFLab</span>
                </h1>
              </div>
            )}
            <div className="p-5 w-full h-full gap-2 flex flex-col">
              <h1 className="text-iflab_gray">
                Nome:{" "}
                <span className="font-bold text-iflab_gray_dark">
                  {element.elementName}
                </span>
              </h1>
              <h1 className="text-iflab_gray">
                Estado físico:{" "}
                <span className="font-bold text-iflab_gray_dark">
                  {element.physicalState === 1
                    ? "Sólido"
                    : element.physicalState === 2
                    ? "Líquido"
                    : "Gasoso"}
                </span>
              </h1>
              <h1 className="text-iflab_gray">
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
              <h1 className="text-iflab_gray">
                Número CAS:{" "}
                <span className="font-bold text-iflab_gray_dark">
                  {element.CASNumber}
                </span>
              </h1>
              <h1 className="text-iflab_gray">
                Número EC:{" "}
                <span className="font-bold text-iflab_gray_dark">
                  {element.ECNumber}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {showMoreInfo && (
          <ElementModal
            element={element}
            closeModal={() => setShowMoreInfo(false)}
            reload={() => window.location.reload()}
            userLevel={userLevel}
          />
        )}
      </>
    )
  );
}

export default ElementCard;
