// O=============================================================================================O */

// Hooks de estados:
import React, { useState } from "react";

// Imagens:
import elementDefault from "../../assets/icons/UI/element.png";
import { parse } from "postcss";

// O=============================================================================================O */

// Renderização:
function SmallElementCard({ element, typed_quantity, onType }) {
  const [checkData, setCheckData] = useState(
    parseFloat(typed_quantity) > parseFloat(element.totalQuantity)
      ? false
      : true
  );

  return (
    <div className="bg-iflab_white_light rounded-lg shadow-md p-2 w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img
          src={elementDefault}
          alt="Elemento"
          className="h-20 border border-iflab_gray_medium p-1 rounded-lg"
        />
        <div className="h-full w-full flex">
          <ul className="w-full">
            <li className="">{element.elementName}</li>
            <li className="text-iflab_gray text-sm">
              CAS: {element.CASNumber}
            </li>
            <li className="text-iflab_gray text-sm">EC: {element.ECNumber}</li>
            <li
              className={`text-iflab_gray text-sm ${
                element.expirationDate < Date.now() / 1000
                  ? "text-iflab_red"
                  : "text-iflab_green_light"
              }`}
            >
              Validade:{" "}
              {new Date(element.expirationDate * 1000).toLocaleDateString()}
            </li>
          </ul>
          <div className="h-full">
            <label>
              Quantidade{" "}
              <span className="font-bold">
                {element.physicalState === 1
                  ? "(g)"
                  : element.physicalState === 2
                  ? "(mL)"
                  : ""}
              </span>
              :
            </label>
            <div className="flex justify-center items-center gap-2 outline-none">
              <input
                type="number"
                value={typed_quantity}
                onChange={(e) => {
                  if (
                    parseFloat(e.target.value) >= parseFloat(element.Quantity)
                  ) {
                    setCheckData(false);
                    e.target.value = parseFloat(element.Quantity);
                  }

                  if (parseFloat(e.target.value) < 0) {
                    setCheckData(false);
                    e.target.value = "";
                  }

                  if (parseFloat(e.target.value) >= 0) {
                    setCheckData(true);
                  }

                  onType(parseFloat(e.target.value));
                }}
                className={`w-20 text-center border py-1 px-2 ${
                  checkData
                    ? "border-iflab_green_light"
                    : typed_quantity
                    ? "border-iflab_red"
                    : "border-iflab_gray_medium"
                }`}
              />
              <h1 className="bg-iflab_white px-2 py-1 text-iflab_gray_light w-24">
                {element.Quantity}/
                {element.physicalState === 1
                  ? "g"
                  : element.physicalState === 2
                  ? "mL"
                  : "Un"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallElementCard;

// O=============================================================================================O */
