import logo from "../../assets/images/logo.png";
import user from "../../assets/icons/UI/user.png";
import user_settings from "../../assets/icons/UI/user-settings.png";
import logout from "../../assets/icons/UI/logout.png";
import closeIcon from "../../assets/icons/UI/close.png";

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
          <div className="w-[45%]">
            <div className="bg-iflab_gray w-full p-2 px-3 flex justify-between items-center">
              <h1 className="text-iflab_white text-2xl">Editar usuário</h1>
              <img src={closeIcon} alt="Fechar menu" className="h-[24px]"/>
            </div>
            <div className="bg-iflab_white "> teste </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
