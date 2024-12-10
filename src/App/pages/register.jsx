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

  const [steps, setSteps] = useState({
    InformMail: false,
    ConfirmMail: false,
    InformUserData: false,
    InformCampusData: false,
  });

  const [userData, setUserData] = useState({
    validationCode: "",
    user_email: "",
    user_name: "",
    user_password: "",
    user_type: 0,
    user_campusId: 0,
  });

  const [error, setError] = useState({
    validationCode: "",
    user_email: "",
    user_name: "",
    user_password: "",
    user_password_confirm: "",
    user_type: "",
    user_campusId: "",
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

    setError({ ...error, user_email: "_" });
    setcheckData({ ...checkData, user_email: true });
    return;
  }

  function handleValidationCodeType(e) {
    setUserData({ ...userData, validationCode: e.target.value });

    if (e.target.value.length !== 5) {
      setError({ ...error, validationCode: "Código de validação inválido!" });
      setcheckData({ ...checkData, validationCode: false });
      return;
    }

    setError({ ...error, validationCode: "_" });
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

    setError({ ...error, user_name: "_" });
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

    setError({ ...error, user_password: "_" });
    setcheckData({ ...checkData, user_password: true });
    return;
  }

  function handlePasswordConfirmType(e) {
    if (e.target.value !== userData.user_password) {
      setcheckData({ ...checkData, user_password_confirm: false });
      setError({ ...error, user_password_confirm: "Senhas não coincidem!" });
      return;
    }

    setError({ ...error, user_password_confirm: "_" });
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

    setError({ ...error, user_type: "_" });
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

    setError({ ...error, user_campusId: "_" });
    setcheckData({ ...checkData, user_campusId: true });
    return;
  }

  /*---------------------------------------------------------------*/

  return (
    <div className="h-screen w-screen bg-iflab_white_dark flex justify-center items-center">
      <form className="px-10 pt-5 pb-10 min-w-[28rem] bg-iflab_white rounded-md shadow-md">
        {/* Formulário progride conforme os steps avançam */}
        {!steps.InformMail && (
          <div>
            <div className="flex justify-center">
              <h1 className="text-2xl">registrar um novo usuário</h1>
            </div>

            <div>
              <TextInput
                icon={email}
                placeholder="Email"
                type="email"
                onChange={(e) => handleMailType(e)}
                state={checkData.user_email}
                errorMessage={error.user_email}
              />
              {checkData.user_email ? "true" : "false"}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
