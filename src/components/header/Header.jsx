import logo from "../../assets/images/logo.png";
import user from "../../assets/icons/UI/user.png";
import user_settings from "../../assets/icons/UI/user-settings.png";
import logout from "../../assets/icons/UI/logout.png";
import closeIcon from "../../assets/icons/UI/close.png";

import Primary_button from "../buttons/Primary_button";
import Tertiary_button from "../buttons/Tertiary_button";

import { useState } from "react";

function Header({ username, usertype, profilepic }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserSettingsMenu, setShowUserSettingsMenu] = useState(false);

  return (
    <>
      <header className="bg-iflab_white w-full fixed flex items-center justify-between shadow-sm">
        <div className="mx-5 my-2">
          <img src={logo} alt="logo" className="h-14" />
        </div>

        <div
          className="flex mx-5 my-2 group cursor-pointer"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <img
            src={profilepic ? profilepic : user}
            alt="Usuário"
            className="w-12 h-12 border border-iflab_gray_light group-hover:border-iflab_gray rounded-full p-1"
          />
          <div className="flex flex-col justify-center ml-1 text-[13px]">
            <p className=" text-iflab_gray group-hover:text-iflab_gray_dark">
              {username ? username : "Usuário de testes"}
            </p>
            <p className=" text-iflab_gray_light group-hover:text-iflab_gray">
              {usertype ? usertype : "Administrador"}
            </p>
          </div>
        </div>

        {showUserMenu && (
          <div className="fixed right-2 top-20">
            <button
              className="bg-iflab_white p-3 hover:bg-iflab_white_dark border-b-iflab_gray_light border-b rounded-t-md flex items-center gap-2"
              onClick={() => setShowUserSettingsMenu(!showUserSettingsMenu)}
            >
              <img
                src={user_settings}
                alt="Configuração do usuário"
                className="h-[32px]"
              />
              Configurações do usuário
            </button>
            <button className="bg-iflab_white p-3 hover:bg-iflab_white_dark rounded-b-md flex items-center gap-2 w-full">
              <img src={logout} alt="Fazer logout" className="h-[32px]" />
              Fazer logout
            </button>
          </div>
        )}
      </header>

      {showUserSettingsMenu && (
        <div className="z-50 bg-iflab_gray bg-opacity-50 h-full w-full fixed flex justify-center items-center">
          <div className="w-[40%]">
            <div className="bg-iflab_gray w-full rounded-t-lg p-2 px-3 flex justify-between items-center">
              <h1 className="text-iflab_white text-2xl">Editar usuário</h1>
              <img src={closeIcon} alt="Fechar menu" className="h-[24px] cursor-pointer hover:animate-pulse" onClick={() => {
                setShowUserSettingsMenu(false)
                setShowUserMenu(false)
              }}/>
            </div>
            <form className="bg-iflab_white rounded-b-lg p-10 pb-14 px-14">
                <h1 className="text-xl text-center font-semibold">Insira seus novos dados</h1>
                <div className="pt-10 flex">
                  <button className="cursor-pointer flex flex-col justify-center items-center">
                    <div className="border rounded-full border-iflab_gray h-[150px] w-[150px] overflow-hidden mb-[5px]">
                      <img src={user} alt="Alterar foto de usuário" className="h-full"/>
                    </div>
                    <h1 className="text-iflab_gray">Alterar foto</h1>
                  </button>
                  <div className="ml-14 w-full flex flex-col gap-5">
                    <div>
                      <label htmlFor="username" className="text-iflab_gray">Nome de usuário</label>
                      <input type="text" id="username" className="w-full border border-iflab_gray p-2 rounded-md" placeholder="Digite um novo nome de usuário..."/>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-iflab_gray">Email</label>
                      <input type="email" id="email" className="w-full border border-iflab_gray p-2 rounded-md" placeholder="Digite um novo email..."/>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                    <div className="mt-10">
                      <label htmlFor="username" className="text-iflab_gray ml-2">Alterar senha</label>
                      <div className=" flex flex-col gap-5 mt-2">
                      <input type="password" id="password" className="w-full border border-iflab_gray p-2 rounded-md" placeholder="Digite uma nova senha..."/>
                      <input type="password" id="password" className="w-full border border-iflab_gray p-2 rounded-md mt-2" placeholder="Confirme a nova senha..."/>
                      </div>
                    </div>
                </div>
                <div className="mt-10 flex justify-end gap-10">
                  <Tertiary_button text="Limpar dados" />
                  <Primary_button text="Salvar informações" />
                </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
