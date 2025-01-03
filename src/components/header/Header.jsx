/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useState } from "react";

// Importando componentes:
import PButton from "../buttons/PButton";
import SButton from "../buttons/SButton";
import TButton from "../buttons/TButton";
import TextInput from "../inputs/TextInput";
import ErrorModal from "../../components/Modals/ErrorModal";

// Importando ícones:
import default_ProfilePic from "../../assets/icons/UI/user.png";
import logoutIcon from "../../assets/icons/UI/logout.png";
import settingsIcon from "../../assets/icons/UI/user-settings.png";
import userIcon from "../../assets/icons/UI/user.png";
import emailIcon from "../../assets/icons/UI/email.png";
import potionIcon from "../../assets/icons/UI/potion.png";
import closeIcon from "../../assets/icons/UI/close.png";
import uploadIcon from "../../assets/icons/UI/upload.png";
import profesorIcon from "../../assets/icons/UI/teacher.png";
import studentIcon from "../../assets/icons/UI/student.png";
import otherIcon from "../../assets/icons/UI/other.png";

// Importando requisições da API:
import {
  checktoken,
  logout,
  editName,
  editEmail,
  editPassword,
  editPicture,
  editType,
  createMailCode,
  validateMailCode,
} from "../../api/user_requests";

// O=============================================================================================O */

// Carregar informações do usuário:
const user = await checktoken();

// O=============================================================================================O */

// Função do componente Header:
function Header() {
  // +---------------------------------------------------------------------------------+

  // States:

  // Dados do usuário (estático, sincronizado com a API):
  const [userStaticData, setUserStaticData] = useState(user.data);

  // Dados do usuário (dinâmico, alterável pelo usuário, deve ser salvo na API):
  const [userDynamicData, setUserDynamicData] = useState({
    userId: userStaticData.userId,
    userName: userStaticData.userName,
    userEmail: userStaticData.userEmail,
    userImage: userStaticData.userImage
      ? userStaticData.userImage
      : default_ProfilePic,
    userType: userStaticData.userType,
    campusAdminLevel: userStaticData.campusAdminLevel,
    campusId: userStaticData.campusId,
    password: "",
    passwordConfirm: "",
    validationCode: "",
  });

  // States de controle de erros nos inputs:
  const [checkData, setCheckData] = useState({
    email: false,
    name: false,
    password: false,
    passwordConfirm: false,
    validationCode: false,
    profilePic: false,
    userType: false,
    sendedMailCode: false,
  });

  // Mensagens de erro nos inputs:
  const [inputErrorText, setInputErrorText] = useState({
    email: "Sem erros",
    name: "Sem erros",
    password: "Sem erros",
    passwordConfirm: "As senhas devem ser iguais",
    validationCode: "Sem erros",
    profilePic: "Sem erros",
    userType: "Sem erros",
  });

  // States de exibição de menus:

  // Modal de erro:
  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  // Menu de opções (editar informações do usuário ou fazer logout):
  const [optionsMenu, setOptionsMenu] = useState(false);

  // Menu de edição de informações do usuário:
  const [editMenu, setEditMenu] = useState({
    status: false,
    page: 1,
  });

  // Função para avançar de página no menu de edição de informações:
  function nextPage() {
    if (editMenu.page < 5) {
      setEditMenu({ ...editMenu, page: editMenu.page + 1 });
    }
  }

  // Função para retroceder de página no menu de edição de informações:
  function previousPage() {
    if (editMenu.page > 1) {
      setEditMenu({ ...editMenu, page: editMenu.page - 1 });
    }
  }

  // +---------------------------------------------------------------------------------+

  // Funções de verificação de inputs:

  // Função para verificar nome:
  function handleNameType(e) {
    const name = e.target.value;
    setUserDynamicData({ ...userDynamicData, userName: name });

    if (name === userStaticData.userName) {
      setCheckData({ ...checkData, name: false });
      setInputErrorText({
        ...inputErrorText,
        name: "O nome deve ser diferente do atual!",
      });

      return;
    }

    if (name.length < 3) {
      setCheckData({ ...checkData, name: false });
      setInputErrorText({
        ...inputErrorText,
        name: "O nome deve ter no mínimo 3 caracteres!",
      });

      return;
    }

    if (name.length > 128) {
      setCheckData({ ...checkData, name: false });
      setInputErrorText({
        ...inputErrorText,
        name: "O nome deve ter no máximo 128 caracteres!",
      });

      return;
    }

    setCheckData({ ...checkData, name: true });
    setInputErrorText({ ...inputErrorText, name: "Sem erros!" });
  }

  // Função para verificar email:
  function handleEmailType(e) {
    const email = e.target.value;
    setUserDynamicData({ ...userDynamicData, userEmail: email });

    if (email === userStaticData.userEmail) {
      setCheckData({ ...checkData, email: false });
      setInputErrorText({
        ...inputErrorText,
        email: "O email deve ser diferente do atual!",
      });

      return;
    }

    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(email) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(email)
    ) {
      setCheckData({ ...checkData, email: false });
      setInputErrorText({
        ...inputErrorText,
        email: "O email deve ser institucional!",
      });

      return;
    }

    setCheckData({ ...checkData, email: true });
    setInputErrorText({ ...inputErrorText, email: "Sem erros!" });
  }

  // Função para verificar código de validação:
  function handleValidationCodeType(e) {
    const code = e.target.value;
    setUserDynamicData({ ...userDynamicData, validationCode: code });

    if (code.length !== 5) {
      setCheckData({ ...checkData, validationCode: false });
      setInputErrorText({
        ...inputErrorText,
        validationCode: "O código deve ter 5 caracteres!",
      });

      return;
    }

    setCheckData({ ...checkData, validationCode: true });
    setInputErrorText({ ...inputErrorText, validationCode: "Sem erros!" });
  }

  // Função para verificar senha:
  function handlePasswordType(e) {
    const password = e.target.value;
    setUserDynamicData({ ...userDynamicData, password: password });

    if (password.length < 8) {
      setCheckData({ ...checkData, password: false });
      setInputErrorText({
        ...inputErrorText,
        password: "A senha deve ter no mínimo 8 caracteres!",
      });

      return;
    }

    if (!/[a-z]/.test(password)) {
      setCheckData({ ...checkData, password: false });
      setInputErrorText({
        ...inputErrorText,
        password: "A senha deve conter letras minúsculas!",
      });

      return;
    }

    if (!/[A-Z]/.test(password)) {
      setCheckData({ ...checkData, password: false });
      setInputErrorText({
        ...inputErrorText,
        password: "A senha deve conter letras maiúsculas!",
      });

      return;
    }

    if (!/[0-9]/.test(password)) {
      setCheckData({ ...checkData, password: false });
      setInputErrorText({
        ...inputErrorText,
        password: "A senha deve conter números!",
      });

      return;
    }

    if (!/(?=.*[!@#\$%\^&\*])/.test(password)) {
      setCheckData({ ...checkData, password: false });
      setInputErrorText({
        ...inputErrorText,
        password: "A senha deve conter caracteres especiais!",
      });

      return;
    }

    if (password !== userDynamicData.passwordConfirm) {
      setCheckData({ ...checkData, passwordConfirm: false });
      setInputErrorText({
        ...inputErrorText,
        passwordConfirm: "As senhas devem ser iguais!",
      });
    }

    setCheckData({ ...checkData, password: true });
    setInputErrorText({ ...inputErrorText, password: "Sem erros!" });

    return;
  }

  // Função para verificar confirmação de senha:
  function handlePasswordConfirmType(e) {
    const password = e.target.value;
    setUserDynamicData({ ...userDynamicData, passwordConfirm: password });

    if (password !== userDynamicData.password) {
      setCheckData({ ...checkData, passwordConfirm: false });
      setInputErrorText({
        ...inputErrorText,
        passwordConfirm: "As senhas devem ser iguais!",
      });

      return;
    }

    setCheckData({ ...checkData, passwordConfirm: true });
    setInputErrorText({ ...inputErrorText, passwordConfirm: "Sem erros!" });

    return;
  }

  // Função para verificar imagem de perfil:
  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserDynamicData({
        ...userDynamicData,
        userImage: reader.result.toString(),
      });
    };

    setCheckData({ ...checkData, profilePic: true });
    setInputErrorText({ ...inputErrorText, profilePic: "Sem erros!" });

    reader.readAsDataURL(file);

    return;
  }

  // Função para verificar tipo de usuário:
  function handleUserTypeChange(e) {
    const type = parseInt(e.target.value);
    setUserDynamicData({ ...userDynamicData, userType: type });

    if (type === userStaticData.userType) {
      setCheckData({ ...checkData, userType: false });
      setInputErrorText({
        ...inputErrorText,
        userType: "O tipo de usuário deve ser diferente do atual!",
      });
    }

    if (type < 1 || type > 3) {
      setCheckData({ ...checkData, userType: false });
      setInputErrorText({
        ...inputErrorText,
        userType: "Tipo de usuário inválido!",
      });

      return;
    }

    setCheckData({ ...checkData, userType: true });
    setInputErrorText({ ...inputErrorText, userType: "Sem erros!" });

    return;
  }

  // +---------------------------------------------------------------------------------+

  // Funções de contato com a API:

  // Função para editar o nome do usuário:
  async function editUserName() {
    const response = await editName(userDynamicData.userName);

    if (response.status === true) {
      await loadUserData();
    } else {
      setRequestError({ status: true, message: response.message });
    }

    setCheckData({ ...checkData, name: false });
    setInputErrorText({ ...inputErrorText, name: "Sem erros!" });

    return;
  }

  async function sendValidationCode() {
    const response = await createMailCode(userDynamicData.userEmail);

    if (response.status === false) {
      setRequestError({ status: true, message: response.message });

      setCheckData({ ...checkData, email: false });
      setInputErrorText({ ...inputErrorText, email: response.message });
      return;
    } else {
      setCheckData({ ...checkData, email: true });
      setInputErrorText({ ...inputErrorText, email: "Sem erros!" });
      setCheckData({ ...checkData, sendedMailCode: true });
    }

    return;
  }

  // Função para editar o email do usuário:
  async function editUserEmail() {
    const response = await validateMailCode(
      userDynamicData.userEmail,
      userDynamicData.validationCode
    );

    if (response.status === false) {
      setRequestError({ status: true, message: response.message });
      return;
    }

    const editMailResponse = await editEmail(
      userDynamicData.userEmail,
      userDynamicData.validationCode
    );

    if (editMailResponse.status === false) {
      setRequestError({ status: true, message: editMailResponse.message });
      checkData({ ...checkData, validationCode: false });
      setInputErrorText({
        ...inputErrorText,
        validationCode: editMailResponse.message,
      });

      return;
    }

    setCheckData({ ...checkData, email: false });
    setCheckData({ ...checkData, validationCode: false });
    setCheckData({ ...checkData, sendedMailCode: false });
    setInputErrorText({ ...inputErrorText, email: "Sem erros!" });
    await loadUserData();

    return;
  }

  // Função para editar a senha do usuário:
  async function editUserPassword() {
    const response = await editPassword(userDynamicData.password);

    if (response.status === true) {
      await loadUserData();
    } else {
      setRequestError({ status: true, message: response.message });
    }

    setCheckData({ ...checkData, password: false });
    setInputErrorText({ ...inputErrorText, password: "Sem erros!" });

    return;
  }

  // Função para editar a imagem de perfil do usuário:
  async function editUserPicture() {
    const response = await editPicture(userDynamicData.userImage);

    if (response.status === true) {
      await loadUserData();
    } else {
      setRequestError({ status: true, message: response.message });
    }

    setCheckData({ ...checkData, profilePic: false });
    setInputErrorText({ ...inputErrorText, profilePic: "Sem erros!" });

    return;
  }

  // Função para editar o tipo de usuário:
  async function editUserType() {
    const response = await editType(userDynamicData.userType);

    if (response.status === true) {
      await loadUserData();
    } else {
      setRequestError({ status: true, message: response.message });
    }

    setCheckData({ ...checkData, userType: false });
    setInputErrorText({ ...inputErrorText, userType: "Sem erros!" });

    return;
  }

  // Função para fazer logout:
  async function handleLogout() {
    await logout();

    window.location.href = "/login";

    return;
  }

  // Função para carregar os dados do usuário:
  async function loadUserData() {
    const userData = await checktoken();

    if (userData.status === false) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    setUserStaticData(userData.data);
    setUserDynamicData({
      userId: userData.data.userId,
      userName: userData.data.userName,
      userEmail: userData.data.userEmail,
      userImage: userData.data.userImage
        ? userData.data.userImage
        : default_ProfilePic,
      userType: userData.data.userType,
      campusAdminLevel: userData.data.campusAdminLevel,
      campusId: userData.data.campusId,
      password: "",
      passwordConfirm: "",
      validationCode: "",
    });

    return;
  }

  // +---------------------------------------------------------------------------------+

  // Renderização do componente:
  return (
    <>
      {/* Menu de opções do usuário (Header) */}
      <header
        className="z-50 cursor-pointer bg-iflab_white_light hover:bg-iflab_white_dark fixed top-0 right-0 shadow-md hover:shadow-lg m-5 py-2 pl-3 pr-5 rounded-full duration-100 group"
        onMouseEnter={() => setOptionsMenu(true)}
        onMouseLeave={() => setOptionsMenu(false)}
      >
        <div className="flex">
          <div className="flex w-10 h-10 items-center rounded-full overflow-hidden">
            <img
              src={
                userStaticData.userImage
                  ? userStaticData.userImage
                  : default_ProfilePic
              }
              alt={`user ${userStaticData.userName}`}
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col justify-center mx-2 text-sm">
            <span className="text-iflab_dark">
              Olá, {userStaticData.userName.split(" ")[0]}!
            </span>
            <span className="text-iflab_gray hover:text-iflab_gray_dark">
              {userStaticData.campusAdminLevel === 1
                ? userStaticData.userType === 1
                  ? "Aluno do campus"
                  : userStaticData.userType === 2
                  ? "Professor do campus"
                  : "Funcionário do campus"
                : userStaticData.campusAdminLevel === 2
                ? "Admin de laboratórios"
                : "Admin do campus"}
            </span>
          </div>
        </div>
        {optionsMenu && (
          <div className="absolute w-full left-0 top-14 bg-iflab_white_light shadow-md rounded-lg p-2">
            <ul>
              <li
                className="hover:bg-iflab_white_dark hover:text-iflab_dark rounded-lg p-1 flex gap-2 text-center"
                onClick={() => setEditMenu({ status: true, page: 1 })}
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
                onClick={() => handleLogout()}
              >
                <img src={logoutIcon} alt="logout" className="h-5 w-5" />
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Menu de edição de informações do usuário (Modal) */}
      {editMenu.status && (
        <div className="w-screen h-screen flex fixed top-0 left-0 z-50 justify-center items-center bg-iflab_gray_dark bg-opacity-30 backdrop-blur-sm">
          <div className="bg-iflab_white shadow-lg sm:rounded-lg sm:w-[40rem] sm:h-[35rem] flex flex-col gap-5 xs:w-full xs:h-full xs:rounded-none">
            <div className="bg-iflab_gray_dark sm:rounded-t-lg flex justify-between items-center p-3 xs:rounded-none">
              <h1 className="text-lg text-iflab_white">
                Editar informações do usuário
              </h1>
              <img
                src={closeIcon}
                alt="close"
                className="w-5 h-5 filter hover:brightness-75 duration-75 cursor-pointer"
                onClick={() => setEditMenu({ status: false, page: 1 })}
              />
            </div>
            <form
              className="flex flex-col gap-5 px-5 h-full m-5 p-5 border-2 border-iflab_white_dark rounded-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              {editMenu.page === 1 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar nome de usuário
                  </h2>
                  <TextInput
                    name={"name-input"}
                    label={"Novo nome de usuário"}
                    predata={userDynamicData.userName}
                    errorMessage={inputErrorText.name}
                    onChange={(e) => handleNameType(e)}
                    icon={userIcon}
                    type={"text"}
                    state={
                      checkData.name ||
                      userDynamicData.userName === userStaticData.userName
                    }
                  />

                  <div className="flex justify-end gap-5 px-5">
                    <TButton
                      text={"Desfazer"}
                      onClick={() => {
                        setUserDynamicData({
                          ...userDynamicData,
                          userName: userStaticData.userName,
                        });
                        setCheckData({ ...checkData, name: false });
                      }}
                      disabled={
                        userDynamicData.userName === userStaticData.userName
                      }
                    />
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserName()}
                      disabled={!checkData.name}
                    />
                  </div>
                </>
              )}

              {editMenu.page === 2 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar email de usuário
                  </h2>
                  <div className="flex justify-between items-center gap-5">
                    <div className="w-[75%]">
                      <TextInput
                        name={"email-input"}
                        label={"Novo email de usuário"}
                        predata={userDynamicData.userEmail}
                        errorMessage={inputErrorText.email}
                        onChange={(e) => handleEmailType(e)}
                        icon={emailIcon}
                        type={"email"}
                        state={
                          checkData.email ||
                          userDynamicData.userEmail === userStaticData.userEmail
                        }
                      />
                    </div>
                    <div className="w-32 h-[25%] flex items-center justify-center">
                      <SButton
                        text={"Validar"}
                        onClick={() => sendValidationCode()}
                        disabled={
                          !checkData.email ||
                          userDynamicData.userEmail === userStaticData.userEmail
                        }
                      />
                    </div>
                  </div>
                  {checkData.sendedMailCode && (
                    <>
                      <h3>
                        Um código de validação foi enviado para o email
                        informado
                      </h3>

                      <div className="flex items-center justify-between gap-5">
                        <div className="w-[75%]">
                          <TextInput
                            name={"validation-code-input"}
                            label={"Informe o código de validação"}
                            predata={userDynamicData.validationCode}
                            errorMessage={inputErrorText.validationCode}
                            onChange={(e) => handleValidationCodeType(e)}
                            icon={potionIcon}
                            type={"text"}
                            state={checkData.validationCode}
                          />
                        </div>
                        <div className="w-32 h-[25%] flex items-center justify-center">
                          <TButton
                            text={"Salvar"}
                            onClick={() => editUserEmail()}
                            disabled={!checkData.validationCode}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {editMenu.page === 3 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar senha de usuário
                  </h2>

                  <TextInput
                    name={"password-input"}
                    label={"Nova senha de usuário"}
                    predata={userDynamicData.password}
                    errorMessage={inputErrorText.password}
                    onChange={(e) => handlePasswordType(e)}
                    icon={userIcon}
                    type={"password"}
                    state={
                      checkData.password || userDynamicData.password.length <= 0
                    }
                  />

                  <TextInput
                    name={"password-confirm-input"}
                    label={"Confirme a nova senha"}
                    predata={userDynamicData.passwordConfirm}
                    errorMessage={inputErrorText.passwordConfirm}
                    onChange={(e) => handlePasswordConfirmType(e)}
                    icon={userIcon}
                    type={"password"}
                    state={checkData.passwordConfirm}
                  />

                  <div className="flex justify-end gap-5 px-5">
                    <TButton
                      text={"Desfazer"}
                      onClick={() => {
                        setUserDynamicData({
                          ...userDynamicData,
                          password: "",
                          passwordConfirm: "",
                        });
                        setCheckData({ ...checkData, password: false });
                        setCheckData({ ...checkData, passwordConfirm: false });
                      }}
                      disabled={userDynamicData.password.length <= 0}
                    />
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserPassword()}
                      disabled={
                        !checkData.password || !checkData.passwordConfirm
                      }
                    />
                  </div>
                </>
              )}

              {editMenu.page === 4 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar imagem de perfil
                  </h2>

                  <div className="flex justify-between items-center w-full h-full">
                    <input
                      type="file"
                      accept="image/*"
                      id="profile-pic"
                      className="hidden"
                      onChange={(e) => handleImageChange(e)}
                    />
                    <label
                      htmlFor="profile-pic"
                      className="flex items-center gap-2 w-full h-full cursor-pointer border rounded-lg border-iflab_white_dark p-5 hover:bg-iflab_white_light duration-100"
                    >
                      <img
                        src={userDynamicData.userImage}
                        alt="Imagem de perfil"
                        className="w-40 h-40 rounded-full border-2 border-iflab_white_dark"
                      />
                      <div className="flex flex-col gap-2 pl-5">
                        <h3 className="text-iflab_dark text-lg flex gap-2">
                          <img
                            src={uploadIcon}
                            alt="Upload"
                            className="w-5 h-5"
                          />
                        </h3>
                        <p className="text-iflab_gray">
                          Clique para alterar a imagem de perfil
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="flex justify-end gap-5 px-5">
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserPicture()}
                      disabled={!checkData.profilePic}
                    />
                  </div>
                </>
              )}

              {editMenu.page === 5 && (
                <>
                  <h2 className="text-lg text-iflab_dark">
                    Editar tipo de usuário
                  </h2>
                  <div className="flex justify-evenly items-center gap-5 h-full">
                    <div
                      className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
                        userDynamicData.userType === 1
                          ? " bg-iflab_white_light"
                          : "bg-iflab_white"
                      }`}
                      onClick={(e) => {
                        setCheckData({ ...checkData, userType: true });
                        setUserDynamicData({ ...userDynamicData, userType: 1 });
                      }}
                    >
                      <img
                        src={studentIcon}
                        alt="Aluno"
                        className="h-20 p-2 "
                      />

                      <h1>Aluno</h1>
                    </div>

                    <div
                      className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
                        userDynamicData.userType === 2
                          ? " bg-iflab_white_light"
                          : "bg-iflab_white"
                      }`}
                      onClick={(e) => {
                        setCheckData({ ...checkData, userType: true });
                        setUserDynamicData({ ...userDynamicData, userType: 2 });
                      }}
                    >
                      <img
                        src={profesorIcon}
                        alt="Professor"
                        className="h-20 p-2"
                      />
                      <h1>Professor</h1>
                    </div>

                    <div
                      className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
                        userDynamicData.userType === 3
                          ? " bg-iflab_white_light"
                          : "bg-iflab_white"
                      }`}
                      onClick={(e) => {
                        setCheckData({ ...checkData, userType: true });
                        setUserDynamicData({ ...userDynamicData, userType: 3 });
                      }}
                    >
                      <img src={otherIcon} alt="Outro" className="h-20 p-2" />
                      <h1>Outro</h1>
                    </div>
                  </div>

                  <div className="flex justify-end items-end w-full">
                    <TButton
                      text={"Salvar"}
                      onClick={() => editUserType()}
                      disabled={!checkData.userType || userDynamicData.userType === userStaticData.userType || userDynamicData.userType < 1 || userDynamicData.userType > 3}
                    />
                  </div>
                </>
              )}
            </form>
            <div>
              <div className="flex justify-between items-center p-5">
                <PButton
                  text={"Voltar"}
                  onClick={() => previousPage()}
                  disabled={editMenu.page === 1}
                />

                <div className="p-5">
                  <div className="flex justify-center items-center gap-2">
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        editMenu.page === 1
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        editMenu.page === 2
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        editMenu.page === 3
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        editMenu.page === 4
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded-full duration-75 ${
                        editMenu.page === 5
                          ? "bg-iflab_green_light w-4"
                          : "bg-iflab_gray w-2"
                      }`}
                    ></div>
                  </div>
                </div>
                <PButton
                  text={"Avançar"}
                  onClick={() => nextPage()}
                  disabled={editMenu.page === 5}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Error (Error Modal) */}
      {requestError.status && (
        <ErrorModal
          message={requestError.message}
          onClose={() => setRequestError({ status: false, message: "" })}
        />
      )}
    </>
  );
}

export default Header;

/* O=============================================================================================O */

//               {menuStatus.editinfosPage === 5 && (
//                 <>
//                   <h2 className="text-lg text-iflab_dark">
//                     Editar tipo de usuário
//                   </h2>
//                   <div className="flex justify-evenly items-center gap-5 h-full">
//                     <div
//                       className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
//                         newUserInfo.userType === 1
//                           ? " bg-iflab_white_light"
//                           : "bg-iflab_white"
//                       }`}
//                       onClick={(e) => {
//                         setNewUserInfo({ ...newUserInfo, userType: 1 });
//                         setCheckData({ ...CheckData, userType: true });
//                       }}
//                     >
//                       <img
//                         src={type_student}
//                         alt="Aluno"
//                         className="h-20 p-2 "
//                       />
//                       <h1>Aluno</h1>
//                     </div>

//                     <div
//                       className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
//                         newUserInfo.userType === 2
//                           ? " bg-iflab_white_light"
//                           : "bg-iflab_white"
//                       }`}
//                       onClick={(e) => {
//                         setNewUserInfo({ ...newUserInfo, userType: 2 });
//                         setCheckData({ ...CheckData, userType: true });
//                       }}
//                     >
//                       <img
//                         src={type_professor}
//                         alt="Professor"
//                         className="h-20 p-2"
//                       />
//                       <h1>Professor</h1>
//                     </div>

//                     <div
//                       className={`rounded-lg flex flex-col items-center p-2 shadow-md hover:shadow-2xl cursor-pointer hover:scale-105 duration-75 border hover:bg-iflab_white_dark border-iflab_white_dark ${
//                         newUserInfo.userType === 3
//                           ? " bg-iflab_white_light"
//                           : "bg-iflab_white"
//                       }`}
//                       onClick={(e) => {
//                         setNewUserInfo({ ...newUserInfo, userType: 3 });
//                         setCheckData({ ...CheckData, userType: true });
//                       }}
//                     >
//                       <img src={type_other} alt="Outro" className="h-20 p-2" />
//                       <h1>Outro</h1>
//                     </div>
//                   </div>
//                   <div className="flex justify-end items-end w-full">
//                     <TButton
//                       text={"Salvar"}
//                       onClick={() => editUserType()}
//                       disabled={!CheckData.userType}
//                     />
//                   </div>
//                 </>
//               )}
