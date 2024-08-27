import logo from "../../assets/images/logo.png";
import user from "../../assets/icons/UI/user.png";
import user_settings from "../../assets/icons/UI/user-settings.png";
import logout from "../../assets/icons/UI/logout.png";

import { useState } from "react";

function Header({ username, usertype, profilepic }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-iflab_white w-full fixed flex items-center justify-between shadow-sm">
      <div className="mx-5 my-2">
        <img src={logo} alt="logo" className="h-14" />
      </div>

      <div className="flex mx-5 my-2 group cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
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
        <button className="bg-iflab_white p-3 hover:bg-iflab_white_dark border-b-iflab_gray_light border-b rounded-t-md flex items-center gap-2">
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
  );
}

export default Header;
