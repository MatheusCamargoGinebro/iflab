/* O=============================================================================================O */

// importando hooks do React:
import { useState } from "react";

// importando componentes de inputs e botões:
import TextInput from "../../components/inputs/textInput";
import PButton from "../../components/buttons/PButton";
import TButton from "../../components/buttons/TButton";

// importando imagens e ícones:
import email from "../../assets/icons/UI/email.png";
import user from "../../assets/icons/UI/user.png";
import potion from "../../assets/icons/UI/potion.png";
import type_professor from "../../assets/icons/UI/teacher.png";
import type_student from "../../assets/icons/UI/student.png";

// Importando requisições da API:
import { sendMailCode, registerUser, loginUser } from "../../api/requests";

/* O=============================================================================================O */

function Register() {
  /*---------------------------------------------------------------*/

  const [checkData, setcheckData] = useState({
    validationCode: false,
    user_email: false,
    user_name: false,
    user_password: false,
    user_password_confirm: false,
    user_type: false,
    user_campusId: false,
  });

  const [userData, setUserData] = useState({
    validationCode: "",
    user_email: "",
    user_name: "",
    user_password: "",
    user_type: 0,
    user_campusId: 0,
  });

  const [dataToSend, setDataToSend] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_type: 0,
    user_campusId: 0,
    validationCode: "",
  });

  const [steps, setSteps] = useState({
    InformMail: false,
    ConfirmMail: false,
    InformUserData: false,
    InformCampusData: false,
  });

  const [error, setError] = useState({
    validationCode: "Alright",
    user_email: "Alright",
    user_name: "Alright",
    user_password: "Alright",
    user_password_confirm: "Alright",
    user_type: "Alright",
    user_campusId: "Alright",
  });

  const [errorWindow, setErrorWindow] = useState({
    status: false,
    message: "",
  });

  /*---------------------------------------------------------------*/

  function handleMailType(e) {
    setUserData({ ...userData, user_email: e.target.value });

    console.log(userData.user_email);

    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(e.target.value) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(e.target.value)
    ) {
      setError({ ...error, user_email: "Email deve pertencer ao IFSP!" });
      setcheckData({ ...checkData, user_email: false });
      return;
    }

    setError({ ...error, user_email: "Alright" });
    setcheckData({ ...checkData, user_email: true });
    return;
  }

  function handleValidationCodeType(e) {
    setUserData({ ...userData, validationCode: e.target.value });

    if (e.target.value.length !== 6) {
      setError({ ...error, validationCode: "Código de validação inválido!" });
      setcheckData({ ...checkData, validationCode: false });
      return;
    }

    setError({ ...error, validationCode: "Alright" });
    setcheckData({ ...checkData, validationCode: true });
    return;
  }

  function handleNameType(e) {
    setUserData({ ...userData, user_name: e.target.value });

    if (e.target.value.length < 3) {
      setError({ ...error, user_name: "Nome deve ter mais de 3 caracteres!" });
      setcheckData({ ...checkData, user_name: false });
      return;
    }

    if (e.target.value.length > 128) {
      setError({
        ...error,
        user_name: "Nome deve ter menos de 128 caracteres!",
      });
      setcheckData({ ...checkData, user_name: false });
      return;
    }

    setError({ ...error, user_name: "Alright" });
    setcheckData({ ...checkData, user_name: true });
    return;
  }

  function handlePasswordType(e) {
    setUserData({ ...userData, user_password: e.target.value });

    if (e.target.value.length < 8) {
      setError({
        ...error,
        user_password: "Senha deve ter mais de 8 caracteres!",
      });
      setcheckData({ ...checkData, user_password: false });
      return;
    }

    if (!/[0-9]/.test(e.target.value)) {
      setcheckData({ ...checkData, user_password: false });
      setError({ ...error, user_password: "Senha deve conter números!" });
      return;
    }

    if (!/[a-z]/.test(e.target.value)) {
      setcheckData({ ...checkData, user_password: false });
      setError({
        ...error,
        user_password: "Senha deve conter letras minúsculas!",
      });
      return;
    }

    if (!/[A-Z]/.test(e.target.value)) {
      setcheckData({ ...checkData, user_password: false });
      setError({
        ...error,
        user_password: "Senha deve conter letras maiúsculas!",
      });
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.target.value)) {
      setcheckData({ ...checkData, user_password: false });
      setError({
        ...error,
        user_password: "Senha deve conter caracteres especiais!",
      });
      return;
    }

    setError({ ...error, user_password: "Alright" });
    setcheckData({ ...checkData, user_password: true });
    return;
  }

  function handlePasswordConfirmType(e) {
    if (e.target.value !== userData.user_password) {
      setcheckData({ ...checkData, user_password_confirm: false });
      setError({ ...error, user_password_confirm: "Senhas não coincidem!" });
      return;
    }

    setError({ ...error, user_password_confirm: "Alright" });
    setcheckData({ ...checkData, user_password_confirm: true });
    return;
  }

  function handleTypeType(e) {
    setUserData({ ...userData, user_type: e.target.value });

    if (
      e.target.value < 1 ||
      e.target.value > 3 ||
      typeof e.target.value !== "number"
    ) {
      setcheckData({ ...checkData, user_type: false });
      setError({ ...error, user_type: "Tipo de usuário inválido!" });
      return;
    }

    setError({ ...error, user_type: "Alright" });
    setcheckData({ ...checkData, user_type: true });
    return;
  }

  function handleCampusType(e) {
    setUserData({ ...userData, user_campusId: e.target.value });

    if (typeof e.target.value !== "number") {
      setcheckData({ ...checkData, user_campusId: false });
      setError({ ...error, user_campusId: "Campus inválido!" });
      return;
    }

    setError({ ...error, user_campusId: "Alright" });
    setcheckData({ ...checkData, user_campusId: true });
    return;
  }

  /*---------------------------------------------------------------*/

  async function handleSendMail() {
    if (!checkData.user_email) {
      setErrorWindow({
        status: true,
        message: "Email fornecido é inválido!",
      });
      return;
    }

    const result = await sendMailCode(userData.user_email);

    if (result.status === false) {
      setErrorWindow({
        status: true,
        message: result.message,
      });
      return;
    }

    setSteps({ ...steps, InformMail: true });

    setDataToSend({
      ...dataToSend,
      user_email: userData.user_email,
    });

    return;
  }

  async function handleRegister() {
    if (
      !checkData.user_name ||
      !checkData.user_password ||
      !checkData.user_password_confirm ||
      !checkData.user_type ||
      !checkData.user_campusId ||
      !checkData.validationCode
    ) {
      setErrorWindow({
        status: true,
        message: "Houve um erro ao preencher os campos!",
      });
      return;
    }

    const result = await registerUser(dataToSend);

    if (result.status === false) {
      setErrorWindow({
        status: true,
        message: result.message,
      });
      return;
    }

    const loginResult = await loginUser({
      user_email: dataToSend.user_email,
      user_password: dataToSend.user_password,
    });

    if (loginResult.status === false) {
      setErrorWindow({
        status: true,
        message: loginResult.message,
      });
      return;
    }

    window.location.href = "/home";

    return;
  }

  /*---------------------------------------------------------------*/

  return (
    <div className="h-screen w-screen bg-iflab_white_dark flex justify-center items-center">
      <form className="px-10 pt-5 pb-10 min-w-[28rem] bg-iflab_white rounded-md shadow-md">
        {!steps.InformMail && (
          <div>
            <div className="flex justify-center pb-10">
              <h1 className="text-2xl">Registrar um novo usuário</h1>
            </div>

            <div>
              <TextInput
                icon={email}
                placeholder="Email"
                type="email"
                onChange={(e) => handleMailType(e)}
                state={checkData.user_email || userData.user_email.length === 0}
                errorMessage={error.user_email}
              />
            </div>
            <div className="flex justify-between pt-5">
              <div className="flex items-end">
                <h1>
                  Já possui uma conta?{" "}
                  <TButton
                    text="Logar"
                    onClick={() => (window.location.href = "/login")}
                  />
                </h1>
              </div>
              <PButton
                text="Continuar"
                disabled={!checkData.user_email}
                onClick={() => handleSendMail()}
              />
            </div>
          </div>
        )}

        {steps.InformMail && !steps.ConfirmMail && (
          <div>
            <div className="flex justify-center pb-5">
              <h1 className="text-2xl">Registrar um novo usuário</h1>
            </div>

            <div className="flex justify-center text-center rounded-md bg-iflab_white_dark p-2 mb-10">
              <h1>
                Um código foi enviado para <br />
                <span className="text-iflab_green font-bold">
                  {userData.user_email}
                </span>
              </h1>
            </div>

            <div>
              <TextInput
                icon={potion}
                placeholder="Código de validação"
                type="text"
                onChange={(e) => handleValidationCodeType(e)}
                state={
                  checkData.validationCode ||
                  userData.validationCode.length === 0
                }
                errorMessage={error.validationCode}
              />
            </div>
            <div className="flex justify-between pt-5">
              <div className="flex items-end">
                <h1>
                  Já possui uma conta?{" "}
                  <TButton
                    text="Logar"
                    onClick={() => (window.location.href = "/login")}
                  />
                </h1>
              </div>
              <PButton
                text="Continuar"
                disabled={!checkData.validationCode}
                onClick={() => {
                  if (checkData.validationCode) {
                    setSteps({ ...steps, ConfirmMail: true });

                    setDataToSend({
                      ...dataToSend,
                      validationCode: userData.validationCode,
                    });
                  }
                }}
              />
            </div>
          </div>
        )}

        {steps.ConfirmMail && steps.InformMail && !steps.InformUserData && (
          <div>
            <div className="flex justify-center pb-5">
              <h1 className="text-2xl">Registrar um novo usuário</h1>
            </div>
            <div>
              <div>
                <TextInput
                  icon={user}
                  placeholder="Digite seu nome de usuário..."
                  type="text"
                  onChange={(e) => handleNameType(e)}
                  state={checkData.user_name || userData.user_name.length === 0}
                  errorMessage={error.user_name}
                />
              </div>
              <div>
                <TextInput
                  placeholder="Digite sua senha..."
                  type="password"
                  onChange={(e) => handlePasswordType(e)}
                  state={
                    checkData.user_password ||
                    userData.user_password.length === 0
                  }
                  errorMessage={error.user_password}
                />
              </div>
              <div>
                <TextInput
                  placeholder="Confirme sua senha..."
                  type="password"
                  onChange={(e) => handlePasswordConfirmType(e)}
                  state={
                    checkData.user_password_confirm ||
                    userData.user_password.length === 0
                  }
                  errorMessage={error.user_password_confirm}
                />
              </div>
            </div>
            <div className="flex justify-between pt-5">
              <div className="flex items-end">
                <h1>
                  Já possui uma conta?{" "}
                  <TButton
                    text="Logar"
                    onClick={() => (window.location.href = "/login")}
                  />
                </h1>
              </div>
              <PButton
                text="Continuar"
                disabled={
                  !checkData.user_name ||
                  !checkData.user_password ||
                  !checkData.user_password_confirm
                }
                onClick={() => {
                  if (
                    checkData.user_name &&
                    checkData.user_password &&
                    checkData.user_password_confirm
                  ) {
                    setSteps({ ...steps, InformUserData: true });

                    setDataToSend({
                      ...dataToSend,
                      user_name: userData.user_name,
                      user_password: userData.user_password,
                    });
                  }
                }}
              />
            </div>
          </div>
        )}
      </form>

      {errorWindow.status ? (
        <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen fixed flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-iflab_white rounded-md w-[30rem] shadow-xl p-5">
            <div className="flex justify-center mb-5">
              <h1 className="text-2xl">Houve um erro...</h1>
            </div>
            <div>
              <p className="text-justify flex justify-center items-center p-5 min-h-[5rem] bg-iflab_white_dark rounded-sm w-full h-full">
                {errorWindow.message}
              </p>
            </div>
            <div className="flex justify-center pt-5 bottom-0 left-0 w-full">
              <PButton
                text="Tentar novamente"
                onClick={() =>
                  setErrorWindow({ ...errorWindow, status: false })
                }
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Register;
