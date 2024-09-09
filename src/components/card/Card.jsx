import { useState } from "react";

import alert from "../../assets/icons/UI/alert.png";
import check from "../../assets/icons/UI/check.png";
import close from "../../assets/icons/UI/close.png";

import potion from "../../assets/icons/UI/potion.png";
import access_management from "../../assets/icons/UI/access-management.png";
import inventory_relatory from "../../assets/icons/UI/inventory-relatory.png";
import access_relatory from "../../assets/icons/UI/access-relatory.png";

import Primary_button from "../buttons/Primary_button";
import Secundary_button from "../buttons/Secundary_button";

function Card({ titulo, usuarioAtual, dataInicio, dataFim, status }) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <>
      <div className="bg-iflab_white_light px-9 py-5 rounded-lg shadow-md hover:shadow-lg duration-100 w-[33rem] h-[16rem]">
        <div className="flex flex-row justify-between items-center gap-36">
          <h1 className="text-lg font-bold">
            Laboratório <span className="text-iflab_green_light">{titulo}</span>
          </h1>
          <h1 className="text-sm text-iflab_gray flex justify-center items-center gap-2">
            <img
              src={status ? check : alert}
              alt="Status do laboratório"
              className="h-[25px]"
            />
            {status ? "Livre para reservar" : "Em uso atualmente"}
          </h1>
        </div>
        <div className="justify-between pt-7 flex flex-col gap-2">
          <h1 className="text-sm font-black text-iflab_gray">
            Usuário atual: {usuarioAtual ? usuarioAtual : "--"}
          </h1>
          <h1 className="text-sm font-black text-iflab_gray">
            Data de início da sessão: {dataInicio ? dataInicio : "--"}
          </h1>
          <h1 className="text-sm font-black text-iflab_gray">
            Data de término da sessão: {dataFim ? dataFim : "--"}
          </h1>
        </div>
        <div className="pt-7 flex justify-end w-full ">
          {status ? (
            <Primary_button
              text="Ver informações"
              onClick={() => {
                setShowOptionsMenu(true);
              }}
            />
          ) : (
            <Secundary_button
              text="Ver informações"
              onClick={() => {
                setShowOptionsMenu(true);
              }}
            />
          )}
        </div>
      </div>
      {showOptionsMenu && (
        <div className="h-full fixed w-full bg-iflab_gray bg-opacity-25 top-0 left-0 flex items-center justify-center">
          <div>
            <div className="bg-iflab_gray_dark rounded-t-lg flex justify-between items-center text-iflab_white_dark font-medium p-3">
              <h1 className="text-2xl">
                Laboratório{" "}
                <span className="text-iflab_green_light font-extrabold">
                  {titulo}
                </span>
              </h1>{" "}
              <button
                onClick={() => {
                  setShowOptionsMenu(false);
                }}
              >
                <img
                  src={close}
                  alt="Fechar"
                  className="h-[20px] hover:animate-pulse"
                />
              </button>
            </div>
            <div className="rounded-b-lg bg-iflab_white">
              {showSchedule ? (
                <div
                  className=""
                  onClick={() => {
                    setShowSchedule(false);
                  }}
                >
                  Calendario
                </div>
              ) : (
                <div className="">
                  <div className="p-5 border-b border-iflab_gray_light">
                    <div className="">
                      <h1 className="font-bold text-iflab_gray_dark text-xl">
                        Dados da sessão atual
                      </h1>
                    </div>
                    <div className="px-5 pt-4">
                      <div className="text-iflab_gray font-bold gap-2 flex flex-col">
                        <h1>
                          Usuário atual: {usuarioAtual ? usuarioAtual : "--"}
                        </h1>
                        <h1>
                          Data de início da sessão:{" "}
                          {dataInicio ? dataInicio : "--"}
                        </h1>
                        <h1>
                          Data de término da sessão: {dataFim ? dataFim : "--"}
                        </h1>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div>
                    <div className="p-5">
                      <h1 className="font-bold text-iflab_gray_dark text-xl">
                        Informações sobre o laboratório
                      </h1>
                    </div>
                    <div className="p-5 flex gap-5">
                      <div
                        onClick={() => {}}
                        className="w-[270px] h-[96px] flex items-center justify-center border border-iflab_gray_light bg-iflab_white_dark py-3 px-7 gap-2 rounded-lg hover:cursor-pointer hover:bg-iflab_white_light duration-75"
                      >
                        <img
                          src={potion}
                          alt="Inventário do laboratório"
                          className="h-[65px]"
                        />{" "}
                        <h1 className="text-center">
                          Inventário do laboratório
                        </h1>
                      </div>

                      <div
                        onClick={() => {}}
                        className="w-[270px] h-[96px] flex items-center justify-center border border-iflab_gray_light bg-iflab_white_dark py-3 px-7 gap-2 rounded-lg hover:cursor-pointer hover:bg-iflab_white_light duration-75"
                      >
                        <img
                          src={access_management}
                          alt="Relatório de acesso"
                          className="h-[65px]"
                        />{" "}
                        <h1 className="text-center">
                          Gerenciar acessos do laboratório
                        </h1>
                      </div>


                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
