import logo from "../../assets/images/logo.png";
import user from "../../assets/icons/UI/user.png";

function Header({ username, usertype, profilepic }) {
  return (
    <header className="bg-iflab_white w-full fixed px-10 flex items-center justify-between p-2 shadow-sm">
      <div>
        <img src={logo} alt="logo" className="h-14" />
      </div>
      <div className="flex">
        <img
          src={profilepic ? profilepic : user}
          alt="Usuário"
          className="w-12 h-12 border border-iflab_gray_light rounded-full p-1"
        />
        <div className="flex flex-col justify-center ml-1 text-[13px]">
          <p className=" text-iflab_gray">
            {username ? username : "Usuário de testes"}
          </p>
          <p className=" text-iflab_gray_light">
            {usertype ? usertype : "Administrador"}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
