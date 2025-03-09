// O=============================================================================================O */

// Hooks de estados:
import React, { useState } from "react";

// Imagens:
import equipmentDefault from "../../assets/icons/UI/equipment.png";

// O=============================================================================================O */

// Renderização:
function SmallEquipmentCard({
  name = "Equipamento",
  image = null,
  quantity = 0,
  totalQuantity = 0,
  increase,
  decrease,
}) {
  return (
    <div className="bg-iflab_white_light rounded-lg shadow-md p-2 w-56 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img
          src={image || equipmentDefault}
          alt="Equipamento"
          className="w-14 h-14 border border-iflab_gray_medium p-1 rounded-lg"
        />
        <div>
          <p className="">{name}</p>
          <p className="text-iflab_gray">
            {totalQuantity} {totalQuantity === 1 ? "disponível" : "disponíveis"}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center w-fit ml-auto mr-0 border-iflab_gray_medium">
        <h1
          className={`rounded-full bg-iflab_white_dark w-5 h-5 flex justify-center items-center ${
            quantity === 0
              ? "text-iflab_gray cursor-default bg-iflab_white_light"
              : "text-iflab_gray hover:bg-iflab_gray_medium cursor-pointer"
          }`}
          onClick={() => decrease()}
        >
          -
        </h1>
        <h1 className="bg-iflab_white w-[4.5rem] flex justify-center px-2">
          {quantity + " / " + totalQuantity}
        </h1>
        <h1
          className={`rounded-full bg-iflab_white_dark w-5 h-5 flex justify-center items-center ${
            quantity === totalQuantity
              ? "text-iflab_gray bg-iflab_white_light cursor-default"
              : "text-iflab_gray hover:bg-iflab_gray_medium cursor-pointer"
          }`}
          onClick={() => increase()}
        >
          +
        </h1>
      </div>
    </div>
  );
}

export default SmallEquipmentCard;

// O=============================================================================================O */
