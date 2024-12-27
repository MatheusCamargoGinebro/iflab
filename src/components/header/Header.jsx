import { useState } from "react";

import defaultProfilePic from "../../assets/icons/UI/user.png";
import logoutIcon from "../../assets/icons/UI/logout.png";
import settingsIcon from "../../assets/icons/UI/user-settings.png";
import userIcon from "../../assets/icons/UI/user.png";
import emailIcon from "../../assets/icons/UI/email.png";
import potionIcon from "../../assets/icons/UI/potion.png";
import closeIcon from "../../assets/icons/UI/close.png";
import uploadIcon from "../../assets/icons/UI/upload.png";
import type_professor from "../../assets/icons/UI/teacher.png";
import type_student from "../../assets/icons/UI/student.png";
import type_other from "../../assets/icons/UI/other.png";

import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";
import TextInput from "../inputs/TextInput";

import {
  checktoken,
  editName,
  editEmail,
  sendMailCode,
  editPassword,
  editPicture,
  editType,
  logoutUser,
} from "../../api/requests";

//--------------------------------------------//
// Informações do usuário:
var user = await checktoken();

function Header() {
  // States:

  // Estado de exibição dos menus:
  const [menuStatus, setMenuStatus] = useState({
    options: false,
    editinfos: false,
    editinfosPage: 1,
  });

  // Estado das novas informações do usuário (pendentes a serem salvas):
  const [newUserInfo, setNewUserInfo] = useState({
    Email: user.data.userEmail,
    Name: user.data.userName,
    Image: user.data.userImage ? user.data.userImage : defaultProfilePic,
    userType: user.data.userType,
    Password: "",
    PasswordConfirm: "",
    validationCode: "",
  });

  // Estados de erros nos inputs:
  const [CheckData, setCheckData] = useState({
    Email: false,
    Name: false,
    profilePic: false,
    userType: false,
    Password: false,
    PasswordConfirm: false,
    sendedValidationCode: false,
    validationCode: false,
  });

  // Estados de mensagens de erro nos inputs:
  const [inputErrorText, setInputErrorText] = useState({
    profilePic: "Sem erros",
    Email: "Sem erros",
    Name: "Sem erros",
    userType: "Sem erros",
    Password: "Sem erros",
    PasswordConfirm: "As senhas devem ser iguais",
    sendedValidationCode: "Sem erros",
    validationCode: "Sem erros",
  });

  //--------------------------------------------//

  // Funções de manipulação de states:

  // Avanço de passos no menu de edição de informações:
  function nextStep() {
    if (menuStatus.editinfosPage === 5) {
      setMenuStatus({ ...menuStatus, editinfosPage: 1 });
    } else {
      setMenuStatus({
        ...menuStatus,
        editinfosPage: menuStatus.editinfosPage + 1,
      });
    }
  }

  // Retrocesso de passos no menu de edição de informações:
  function stepback() {
    if (menuStatus.editinfosPage === 1) {
      setMenuStatus({ ...menuStatus, editinfosPage: 5 });
    } else {
      setMenuStatus({
        ...menuStatus,
        editinfosPage: menuStatus.editinfosPage - 1,
      });
    }

    return;
  }

  // Função para alterar a imagem de perfil:
  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewUserInfo({ ...newUserInfo, Image: reader.result });
    };

    setCheckData({ ...CheckData, profilePic: true });
    setInputErrorText({ ...inputErrorText, profilePic: "Sem erros" });

    reader.readAsDataURL(file);

    return;
  }

  function handleValidationCodeType(e) {
    const code = e.target.value;
    setNewUserInfo({ ...newUserInfo, validationCode: code });

    if (code.length !== 5) {
      setCheckData({ ...CheckData, validationCode: false });
      setInputErrorText({
        ...inputErrorText,
        validationCode: "O código deve ter 5 caracteres",
      });

      return;
    }

    setCheckData({ ...CheckData, validationCode: true });
    setInputErrorText({ ...inputErrorText, validationCode: "Sem erros" });
  }

  // Função para alterar o email:
  function handleMailType(e) {
    const email = e.target.value;
    setNewUserInfo({ ...newUserInfo, Email: email });

    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(email) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(email)
    ) {
      setCheckData({ ...CheckData, Email: false });
      setInputErrorText({
        ...inputErrorText,
        Email: "O email deve ser institucional",
      });

      return;
    }

    setCheckData({ ...CheckData, Email: true });
    setInputErrorText({ ...inputErrorText, Email: "Sem erros" });
  }

  // Função para alterar o nome:
  function handleNameType(e) {
    const name = e.target.value;
    setNewUserInfo({ ...newUserInfo, Name: name });

    if (name.length < 3) {
      setCheckData({ ...CheckData, Name: false });
      setInputErrorText({
        ...inputErrorText,
        Name: "O nome deve ter no mínimo 3 caracteres",
      });

      return;
    }

    if (name.length > 128) {
      setCheckData({ ...CheckData, Name: false });
      setInputErrorText({
        ...inputErrorText,
        Name: "O nome deve ter no máximo 128 caracteres",
      });

      return;
    }

    setCheckData({ ...CheckData, Name: true });
    setInputErrorText({ ...inputErrorText, Name: "Sem erros" });

    return;
  }

  // Função para alterar a senha:
  function handlePasswordType(e) {
    const password = e.target.value;
    setNewUserInfo({ ...newUserInfo, Password: password });

    if (password.length < 8) {
      setCheckData({ ...CheckData, Password: false });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve ter no mínimo 8 caracteres",
      });

      return;
    }

    if (!/[a-z]/.test(password)) {
      setCheckData({ ...CheckData, Password: false });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter letras minúsculas",
      });

      return;
    }

    if (!/[A-Z]/.test(password)) {
      setCheckData({ ...CheckData, Password: false });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter letras maiúsculas",
      });

      return;
    }

    if (!/[0-9]/.test(password)) {
      setCheckData({ ...CheckData, Password: false });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter números",
      });

      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setCheckData({ ...CheckData, Password: false });
      setInputErrorText({
        ...inputErrorText,
        Password: "A senha deve conter caracteres especiais",
      });

      return;
    }

    if (password !== newUserInfo.PasswordConfirm) {
      setCheckData({ ...CheckData, PasswordConfirm: false });
      setInputErrorText({
        ...inputErrorText,
        PasswordConfirm: "As senhas devem ser iguais",
      });
    } else {
      setCheckData({ ...CheckData, PasswordConfirm: true });
      setInputErrorText({ ...inputErrorText, PasswordConfirm: "Sem erros" });
    }

    setCheckData({ ...CheckData, Password: true });
    setInputErrorText({ ...inputErrorText, Password: "Sem erros" });

    return;
  }

  // Função para confirmar a senha:
  function handlePasswordConfirmType(e) {
    const password = e.target.value;
    setNewUserInfo({ ...newUserInfo, PasswordConfirm: password });

    if (password !== newUserInfo.Password) {
      setCheckData({ ...CheckData, PasswordConfirm: false });
      setInputErrorText({
        ...inputErrorText,
        PasswordConfirm: "As senhas devem ser iguais",
      });

      return;
    }

    setCheckData({ ...CheckData, PasswordConfirm: true });
    setInputErrorText({ ...inputErrorText, PasswordConfirm: "Sem erros" });

    return;
  }

  //--------------------------------------------//

  // Função assíncrona de comunicação com a API:

  // Função para salvar as novas informações do usuário:
  async function editUserName() {
    const response = await editName(newUserInfo.Name);

    if (response.status === true) {
      user = await checktoken();
      setNewUserInfo({ ...newUserInfo, Name: user.data.userName });

      setCheckData({ ...CheckData, Name: true });
    } else {
      setInputErrorText({
        ...inputErrorText,
        Name: response.message,
      });

      setCheckData({ ...CheckData, Name: false });
    }

    return;
  }

  async function sendValidationCode() {
    const response = await sendMailCode(newUserInfo.Email);

    if (response.status === true) {
      setCheckData({ ...CheckData, sendedValidationCode: true });
      setInputErrorText({
        ...inputErrorText,
        sendedValidationCode: "Código de validação enviado",
      });
    } else {
      setCheckData({ ...CheckData, sendedValidationCode: false });
      setInputErrorText({
        ...inputErrorText,
        sendedValidationCode: response.message,
      });
    }

    return;
  }

  async function editUserEmail() {
    const response = await editEmail(
      newUserInfo.Email,
      newUserInfo.validationCode
    );

    if (response.status === true) {
      user = await checktoken();
      setNewUserInfo({ ...newUserInfo, Email: user.data.userEmail });
      setCheckData({ ...CheckData, Email: true });

      setInputErrorText({ ...inputErrorText, Email: "Email alterado" });
      setCheckData({ ...CheckData, Email: true });
      setCheckData({ ...CheckData, sendedValidationCode: false });
    } else {
      setInputErrorText({
        ...inputErrorText,
        sendedValidationCode: response.message,
      });
      setCheckData({ ...CheckData, sendedValidationCode: false });
      setInputErrorText({
        ...inputErrorText,
        validationCode: response.message,
      });
      setCheckData({ ...CheckData, validationCode: false });
    }

    return;
  }

  async function editUserPassword() {
    const response = await editPassword(newUserInfo.Password);

    if (response.status === true) {
      user = await checktoken();
      setNewUserInfo({ ...newUserInfo, Password: "", PasswordConfirm: "" });

      setCheckData({ ...CheckData, Password: false });
      setCheckData({ ...CheckData, PasswordConfirm: false });
    } else {
      setInputErrorText({
        ...inputErrorText,
        Password: response.message,
      });

      setCheckData({ ...CheckData, Password: false });
    }

    return;
  }

  async function editUserPicture() {
    const response = await editPicture(newUserInfo.Image);

    if (response.status === true) {
      user = await checktoken();
      setNewUserInfo({ ...newUserInfo, Image: user.data.userImage });
      setCheckData({ ...CheckData, profilePic: false });
    } else {
      setInputErrorText({
        ...inputErrorText,
        profilePic: response.message,
      });

      setCheckData({ ...CheckData, profilePic: false });
    }

    return;
  }

  async function editUserType() {
    const response = await editType(newUserInfo.userType);

    if (response.status === true) {
      user = await checktoken();
      setCheckData({ ...CheckData, userType: false });
      setNewUserInfo({ ...newUserInfo, userType: user.data.userType });
    } else {
      setInputErrorText({
        ...inputErrorText,
        userType: response.message,
      });

      setCheckData({ ...CheckData, userType: false });
    }

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
    }

    return;
  }

  //--------------------------------------------//

  return (
    <>
      {/* Menu de opções do usuário (Header) */}
      <header
        className="z-50 cursor-pointer bg-iflab_white_light hover:bg-iflab_white_dark fixed top-0 right-0 shadow-md hover:shadow-lg m-5 py-2 pl-3 pr-5 rounded-full duration-100 group"
        onMouseEnter={() => setMenuStatus({ ...menuStatus, options: true })}
        onMouseLeave={() => setMenuStatus({ ...menuStatus, options: false })}
      >
        <div className="flex">
          <div className="flex w-10 h-10 items-center rounded-full overflow-hidden">
            <img
              src={
                !user.data.userImage ? defaultProfilePic : user.data.userImage
              }
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
        </div>
        {menuStatus.options && (
          <div className="absolute w-full left-0 top-14 bg-iflab_white_light shadow-md rounded-lg p-2">
            <ul>
              <li
                className="hover:bg-iflab_white_dark hover:text-iflab_dark rounded-lg p-1 flex gap-2 text-center"
                onClick={() =>
                  setMenuStatus({ ...menuStatus, editinfos: true })
                }
              >
                <img
                  src={settingsIcon}
                  alt="configurações"
                  className="h-5 w-5"
                />
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
        )}
      </header>

      {/* Menu de edição de informações do usuário */}
      {menuStatus.editinfos && (
        <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
          <div className="bg-iflab_white shadow-lg rounded-lg w-[40rem] h-[35rem] flex flex-col gap-5">
            <div className="bg-iflab_gray_dark rounded-t-lg flex justify-between items-center p-3">
              <h1 className="text-lg text-iflab_white">
                Editar informações do usuário
              </h1>
              <img
                src={closeIcon}
                alt="Fechar"
                className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
                onClick={() =>
                  setMenuStatus({ ...menuStatus, editinfos: false })
                }
              />
            </div>
            <form
              className="flex flex-col gap-5 px-5 h-full m-5 p-5 border-2 border-iflab_white_dark rounded-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              {menuStatus.editinfosPage === 1 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar nome de usuário
                  </h2>
                  <TextInput
                    name={"name-input"}
                    label={"Novo nome de usuário"}
                    predata={newUserInfo.Name}
                    errorMessage={inputErrorText.Name}
                    onChange={(e) => handleNameType(e)}
                    icon={userIcon}
                    type={"text"}
                    state={
                      newUserInfo.Name === user.data.userName
                        ? true
                        : newUserInfo.Name.length <= 0
                        ? true
                        : CheckData.Name
                    }
                  />
                  <div className="flex justify-end gap-5 px-5">
                    <TButton
                      text={"Limpar"}
                      onClick={() => {
                        setNewUserInfo({ ...newUserInfo, Name: "" });
                        setCheckData({ ...CheckData, Name: false });
                      }}
                    />
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserName()}
                      disabled={
                        !CheckData.Name ||
                        newUserInfo.Name === user.data.userName
                      }
                    />
                  </div>
                </>
              )}

              {menuStatus.editinfosPage === 2 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar email de usuário
                  </h2>
                  <div className="flex justify-between items-center gap-5">
                    <div className="w-[75%]">
                      <TextInput
                        name={"email-input"}
                        label={"Novo email de usuário"}
                        predata={newUserInfo.Email}
                        errorMessage={inputErrorText.Email}
                        onChange={(e) => handleMailType(e)}
                        icon={emailIcon}
                        type={"email"}
                        state={
                          newUserInfo.Email === user.data.userEmail
                            ? true
                            : newUserInfo.Email.length <= 0
                            ? true
                            : CheckData.Email
                        }
                      />
                    </div>

                    <div className="w-32 h-[25%] flex items-center justify-center">
                      <SButton
                        text={"Validar"}
                        onClick={() => sendValidationCode()}
                        disabled={
                          !CheckData.Email ||
                          newUserInfo.Email === user.data.userEmail
                        }
                      />
                    </div>
                  </div>
                  {CheckData.sendedValidationCode && (
                    <>
                      <h3>
                        Um código de validação foi enviado para o email
                        informado
                      </h3>
                      <div className="flex items-center justify-between gap-5">
                        <div className="w-[75%]">
                          <TextInput
                            name={"validation-code-input"}
                            label={"Código de validação"}
                            predata={newUserInfo.validationCode}
                            errorMessage={inputErrorText.validationCode}
                            onChange={(e) => handleValidationCodeType(e)}
                            icon={potionIcon}
                            type={"text"}
                            state={CheckData.validationCode}
                          />
                        </div>
                        <div className="w-32 h-[25%] flex items-center justify-center ">
                          <TButton
                            text={"Salvar"}
                            onClick={() => editUserEmail()}
                            disabled={!CheckData.validationCode}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {menuStatus.editinfosPage === 3 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar senha de usuário
                  </h2>
                  <TextInput
                    name={"password-input"}
                    label={"Nova senha de usuário"}
                    predata={newUserInfo.Password}
                    errorMessage={inputErrorText.Password}
                    onChange={(e) => handlePasswordType(e)}
                    icon={userIcon}
                    type={"password"}
                    state={
                      newUserInfo.Password.length === 0
                        ? true
                        : CheckData.Password
                    }
                  />
                  <TextInput
                    name={"password-confirm-input"}
                    label={"Confirme a nova senha"}
                    predata={newUserInfo.PasswordConfirm}
                    errorMessage={inputErrorText.PasswordConfirm}
                    onChange={(e) => handlePasswordConfirmType(e)}
                    icon={userIcon}
                    type={"password"}
                    state={
                      newUserInfo.PasswordConfirm.length === 0
                        ? true
                        : newUserInfo.PasswordConfirm === newUserInfo.Password
                        ? true
                        : CheckData.PasswordConfirm
                    }
                  />
                  <div className="flex justify-end gap-5 px-5">
                    <TButton
                      text={"Limpar"}
                      onClick={() => {
                        setNewUserInfo({
                          ...newUserInfo,
                          Password: "",
                          PasswordConfirm: "",
                        });
                        setCheckData({ ...CheckData, Password: false });
                        setCheckData({ ...CheckData, PasswordConfirm: false });
                      }}
                    />
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserPassword()}
                      disabled={
                        !CheckData.Password || !CheckData.PasswordConfirm
                      }
                    />
                  </div>
                </>
              )}

              {menuStatus.editinfosPage === 4 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar imagem de perfil
                  </h2>
                  <div className="flex justify-between items-center w-full h-full">
                    <input
                      type="file"
                      name="profile-pic"
                      id="profile-pic"
                      className="hidden"
                      onChange={(e) => handleImageChange(e)}
                    />
                    <label
                      htmlFor="profile-pic"
                      className="flex items-center gap-2 w-full h-full cursor-pointer border rounded-lg border-iflab_white_dark p-5 hover:bg-iflab_white_light duration-100"
                    >
                      <img
                        src={newUserInfo.Image}
                        alt="Foto de perfil"
                        className="w-40 h-40 rounded-full border-2 border-iflab_white_dark"
                      />
                      <div className="flex flex-col gap-2 pl-5">
                        <h3 className="text-iflab_dark text-lg flex gap-2">
                          <img
                            src={uploadIcon}
                            alt="Upload"
                            className="w-5 h-5"
                          />
                          Escolher uma nova foto de perfil
                        </h3>
                        {CheckData.profilePic && (
                          <p className="text-iflab_gray">
                            {inputErrorText.profilePic}
                          </p>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="flex justify-end gap-5 px-5">
                    <TButton
                      text={"Limpar"}
                      onClick={() => {
                        setNewUserInfo({
                          ...newUserInfo,
                          Image: user.data.userImage,
                        });
                        setCheckData({ ...CheckData, profilePic: false });
                      }}
                    />
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserPicture()}
                      disabled={!CheckData.profilePic}
                    />
                  </div>
                </>
              )}

              {menuStatus.editinfosPage === 5 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar tipo de usuário
                  </h2>
                  <div className="flex justify-evenly items-center gap-5 h-full">
                    <div
                      className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
                        newUserInfo.userType === 1
                          ? " bg-iflab_white_light"
                          : "bg-iflab_white"
                      }`}
                      onClick={(e) => {
                        setNewUserInfo({ ...newUserInfo, userType: 1 });
                        setCheckData({ ...CheckData, userType: true });
                      }}
                    >
                      <img
                        src={type_student}
                        alt="Aluno"
                        className="h-20 p-2 "
                      />
                      <h1>Aluno</h1>
                    </div>

                    <div
                      className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
                        newUserInfo.userType === 2
                          ? " bg-iflab_white_light"
                          : "bg-iflab_white"
                      }`}
                      onClick={(e) => {
                        setNewUserInfo({ ...newUserInfo, userType: 2 });
                        setCheckData({ ...CheckData, userType: true });
                      }}
                    >
                      <img
                        src={type_professor}
                        alt="Professor"
                        className="h-20 p-2"
                      />
                      <h1>Professor</h1>
                    </div>

                    <div
                      className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
                        newUserInfo.userType === 3
                          ? " bg-iflab_white_light"
                          : "bg-iflab_white"
                      }`}
                      onClick={(e) => {
                        setNewUserInfo({ ...newUserInfo, userType: 3 });
                        setCheckData({ ...CheckData, userType: true });
                      }}
                    >
                      <img src={type_other} alt="Outro" className="h-20 p-2" />
                      <h1>Outro</h1>
                    </div>
                  </div>
                  <div className="flex justify-end items-end w-full">
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserType()}
                      disabled={!CheckData.userType}
                    />
                  </div>
                </>
              )}
            </form>
            <div>
              <div className="flex justify-between items-center p-5">
                <PButton
                  text={"Voltar"}
                  onClick={() => stepback()}
                  disabled={menuStatus.editinfosPage === 1}
                />
                <div className="p-5">
                  <div className="flex justify-center items-center gap-2">
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        menuStatus.editinfosPage === 1
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        menuStatus.editinfosPage === 2
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        menuStatus.editinfosPage === 3
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        menuStatus.editinfosPage === 4
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        menuStatus.editinfosPage === 5
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                  </div>
                </div>
                <PButton
                  text={"Avançar"}
                  onClick={() => nextStep()}
                  disabled={menuStatus.editinfosPage === 5}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
