import { useState } from "react";
import { checktoken, logoutUser } from "../../api/requests";

import defaultProfilePic from "../../assets/icons/UI/user.png";
import logoutIcon from "../../assets/icons/UI/logout.png";
import settingsIcon from "../../assets/icons/UI/user-settings.png";
import closeIcon from "../../assets/icons/UI/close.png";

import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";

const user = await checktoken();

function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserSettingsMenu, setShowUserSettingsMenu] = useState(false);

  const [userBuffInfo, setUserBuffInfo] = useState({
    Email: user.data.userEmail,
    Name: user.data.userName,
    Image: user.data.userImage ? user.data.userImage : defaultProfilePic,
    userType: user.data.userType,
    Password: "",
    PasswordConfirm: "",
  });

  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserBuffInfo({ ...userBuffInfo, Image: reader.result });
    };

    reader.readAsDataURL(file);

    return;
  }

  async function logout() {
    const response = await logoutUser();
    if (response.status === true) {
      localStorage.removeItem("token");
      window.location.href = "/login";

      return;
    } else {
      window.location.href = "/login";

      return;
    }
  }

  /*--------------------------------------------*/

  const [inputError, setInputError] = useState({
    Email: true,
    Name: true,
    Password: true,
    PasswordConfirm: true,
  });

  const [inputErrorText, setInputErrorText] = useState({
    Email: "Sem erros",
    Name: "Sem erros",
    Password: "Sem erros",
    PasswordConfirm: "Sem erros",
  });

  function handleMailType(e) {
    const email = e.target.value;
    setUserBuffInfo({ ...userBuffInfo, Email: email });

    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(email) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(email)
    ) {
      setInputError({ ...inputError, Email: true });
      setInputErrorText({
        ...inputErrorText,
        Email: "O email deve ser institucional",
      });

      return;
    }

    setInputError({ ...inputError, Email: false });
    setInputErrorText({ ...inputErrorText, Email: "Sem erros" });

    return;
  }

  function handleNameType(e) {
    const name = e.target.value;
    setUserBuffInfo({ ...userBuffInfo, Name: name });

    if (name.length < 5) {
      setInputError({ ...inputError, Name: true });
      setInputErrorText({
        ...inputErrorText,
        Name: "O nome deve ter no mínimo 5 caracteres",
      });
    }

    if (name.length > 128) {
      setInputError({ ...inputError, Name: true });
      setInputErrorText({
        ...inputErrorText,
        Name: "O nome deve ter no máximo 128 caracteres",
      });
    }

    setInputError({ ...inputError, Name: false });
    setInputErrorText({ ...inputErrorText, Name: "Sem erros" });

    return;
  }

  function handlePasswordType(e) {
    const password = e.target.value;
    setUserBuffInfo({ ...userBuffInfo, Password: password });

    if (password.length < 8) {
      setInputError({ ...inputError, Password: true });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve ter no mínimo 8 caracteres",
      });

      return;
    }

    if (!/[a-z]/.test(password)) {
      setInputError({ ...inputError, Password: true });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter letras minúsculas",
      });

      return;
    }

    if (!/[A-Z]/.test(password)) {
      setInputError({ ...inputError, Password: true });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter letras maiúsculas",
      });

      return;
    }

    if (!/[0-9]/.test(password)) {
      setInputError({ ...inputError, Password: true });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter números",
      });

      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setInputError({ ...inputError, Password: true });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter caracteres especiais",
      });

      return;
    }

    setInputError({ ...inputError, Password: false });
    setInputErrorText({ ...inputErrorText, Password: "Sem erros" });

    return;
  }

  function handlePasswordConfirmType(e) {
    const password = e.target.value;
    setUserBuffInfo({ ...userBuffInfo, PasswordConfirm: password });

    if (password !== userBuffInfo.Password) {
      setInputError({ ...inputError, PasswordConfirm: true });
      setInputErrorText({
        ...inputErrorText,
        PasswordConfirm: "As senhas devem ser iguais",
      });

      return;
    }

    setInputError({ ...inputError, PasswordConfirm: false });
    setInputErrorText({ ...inputErrorText, PasswordConfirm: "Sem erros" });

    return;
  }

  async function handleSave() {}

  return (
    <>
      <header
        className="z-50 cursor-pointer flex bg-iflab_white_light hover:bg-iflab_white_dark w-fit fixed top-0 right-0 shadow-md hover:shadow-lg m-5 py-2 pl-3 pr-5 rounded-full duration-100 group"
        onMouseEnter={() => setShowUserMenu(true)}
        onMouseLeave={() => setShowUserMenu(false)}
      >
        <div className="flex w-10 h-10 items-center rounded-full overflow-hidden">
          <img
            src={!user.data.userImage ? defaultProfilePic : user.data.userImage}
            alt={`user ${user.data.userName}`}
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-center mx-2 text-sm">
          <span className="text-iflab_dark">
            Olá, {user.data.userName.split(" ")[0]}!
          </span>
          <span className="text-iflab_gray hover:text-iflab_gray_dark">
            {user.data.campusAdminLevel === 1
              ? user.data.userType === 1
                ? "Aluno do campus"
                : user.data.userType === 2
                ? "Professor do campus"
                : "Funcionário do campus"
              : user.data.campusAdminLevel === 2
              ? "Admin de laboratórios"
              : "Admin do campus"}
          </span>
        </div>
        <div
          className={`${
            showUserMenu ? "block" : "hidden"
          } absolute w-full left-0 top-14 bg-iflab_white_light shadow-md rounded-lg p-2`}
        >
          <ul>
            <li
              className="hover:bg-iflab_white_dark hover:text-iflab_dark rounded-lg p-1 flex gap-2 text-center"
              onClick={() => setShowUserSettingsMenu(true)}
            >
              <img src={settingsIcon} alt="configurações" className="h-5 w-5" />
              <a>Configurações</a>
            </li>
            <li
              className="hover:bg-iflab_white_dark hover:text-iflab_dark rounded-lg p-1 flex gap-2 text-center"
              onClick={() => logout()}
            >
              <img src={logoutIcon} alt="sair" className="h-5 w-5" />
              <a>Sair</a>
            </li>
          </ul>
        </div>
      </header>

      {showUserSettingsMenu && (
        <div className="z-50 w-screen h-screen flex fixed justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
          <div className="bg-iflab_white rounded-md w-[40rem] shadow-xl">
            <div className="flex justify-between items-center p-2 pl-5 bg-iflab_gray_dark text-iflab_white rounded-t-md">
              <h1 className="">Editar informações do usuário</h1>
              <img
                src={closeIcon}
                alt="Fechar"
                className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
                onClick={() => setShowUserSettingsMenu(false)}
              />
            </div>

            <div className="h-fit flex justify-between items-center w-full rounded-lg gap-5 p-10">
              <div className="flex justify-center items-center w-64">
                <img
                  src={userBuffInfo.Image}
                  alt="user"
                  className="h-40 w-40 rounded-full"
                />
              </div>
              <div className="flex justify-center items-center w-full h-40">
                <input
                  type="file"
                  name="user-image"
                  id="user-image"
                  className="hidden"
                  onChange={(e) => handleImageChange(e)}
                />
                <label
                  htmlFor="user-image"
                  className="w-full h-full border border-iflab_white_dark hover:border-iflab_white_light rounded-md flex justify-center items-center cursor-pointer duration-100 group"
                >
                  <span className="h-fit w-fit bg-iflab_white_dark p-2 px-5 rounded-3xl cursor-pointer hover:bg-iflab_white_dark duration-100 shadow-md group-hover:shadow-lg">
                    Selecionar uma nova foto de perfil
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-5 py-5 px-10"></div>

            <div className="flex gap-5 py-5 px-10 justify-between items-center">
              <TButton text="Cancelar edição" />
              <div className=" flex gap-5">
                <SButton text="Limpar dados" />
                <PButton text="Salvar informações" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
