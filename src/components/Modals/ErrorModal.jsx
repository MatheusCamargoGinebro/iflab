import React from "react";

import PButton from "../buttons/PButton";

function ErrorModal({ message, onClose }) {
  return (
    <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-iflab_white rounded-md w-[30rem] shadow-xl p-5">
        <div className="flex justify-center mb-5">
          <h1 className="text-2xl">Houve um erro...</h1>
        </div>
        <div>
          <p className="text-justify flex justify-center items-center p-5 min-h-[5rem] bg-iflab_white_dark rounded-sm w-full h-full">
            {message}
          </p>
        </div>
        <div className="flex justify-center pt-5 bottom-0 left-0 w-full">
          <PButton text="Tentar novamente" onClick={() => onClose()} />
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
