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
  const [newUser, setNewUser] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_type: 0,
    user_campusId: 0,
    user_validationCode: "",
  });

  const [inputData, setInputData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_password_confirmation: "",
    user_type: 0,
    user_campusId: 0,
    user_validationCode: "",
  });

  const [checkData, setCheckData] = useState({
    status: {
      user_name: false,
      user_email: false,
      user_password: false,
      user_type: false,
      user_campusId: false,
      user_validationCode: false,
    },

    message: {
      user_name: "Sem erros.",
      user_email: "Sem erros.",
      user_password: "Sem erros.",
      user_type: "Sem erros.",
      user_campusId: "Sem erros.",
      user_validationCode: "Sem erros.",
    },
  });

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [showTerms, setShowTerms] = useState(false);

  const [step, setStep] = useState(0);

  /*---------------------------------------------------------------*/

  // Função para validação de email:
  function handleMailType(e) {
    setInputData({ ...inputData, user_email: e.target.value });

    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(e.target.value) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(e.target.value)
    ) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_email: false },
        message: {
          ...checkData.message,
          user_email: "Email deve ser da instituição (IFSP).",
        },
      });

      return;
    }

    setCheckData({
      ...checkData,
      status: { ...checkData.status, user_email: true },
      message: { ...checkData.message, user_email: "Sem erros." },
    });

    return;
  }

  // Função para validação de nome de usuário:
  function handleNameType(e) {
    setInputData({ ...inputData, user_name: e.target.value });

    if (e.target.value.length < 3) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_name: false },
        message: {
          ...checkData.message,
          user_name: "Nome de usuário muito curto.",
        },
      });

      return;
    }

    if (e.target.value.length > 128) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_name: false },
        message: {
          ...checkData.message,
          user_name: "Nome de usuário muito longo.",
        },
      });

      return;
    }

    setCheckData({
      ...checkData,
      status: { ...checkData.status, user_name: true },
      message: { ...checkData.message, user_name: "Sem erros." },
    });

    return;
  }

  // Função para validação de senha:
  function handlePasswordType(e) {
    setInputData({ ...inputData, user_password: e.target.value });

    if (e.target.value.length < 8) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_password: false },
        message: {
          ...checkData.message,
          user_password: "Senha deve ter no mínimo 8 caracteres.",
        },
      });

      return;
    }

    if (!/[a-z]/.test(e.target.value)) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_password: false },
        message: {
          ...checkData.message,
          user_password: "Senha deve conter pelo menos uma letra minúscula.",
        },
      });

      return;
    }

    if (!/[A-Z]/.test(e.target.value)) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_password: false },
        message: {
          ...checkData.message,
          user_password: "Senha deve conter pelo menos uma letra maiúscula.",
        },
      });

      return;
    }

    if (!/[0-9]/.test(e.target.value)) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_password: false },
        message: {
          ...checkData.message,
          user_password: "Senha deve conter pelo menos um número.",
        },
      });

      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.target.value)) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_password: false },
        message: {
          ...checkData.message,
          user_password: "Senha deve conter pelo menos um caractere especial.",
        },
      });

      return;
    }

    setCheckData({
      ...checkData,
      status: { ...checkData.status, user_password: true },
      message: { ...checkData.message, user_password: "Sem erros." },
    });

    return;
  }

  // Função para validação da confirmação de senha:
  function handlePasswordConfirmationType(e) {
    setInputData({ ...inputData, user_password_confirmation: e.target.value });

    if (e.target.value !== inputData.user_password) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_password: false },
        message: {
          ...checkData.message,
          user_password: "Senhas não coincidem.",
        },
      });

      return;
    }

    setCheckData({
      ...checkData,
      status: { ...checkData.status, user_password: true },
      message: { ...checkData.message, user_password: "Sem erros." },
    });

    return;
  }

  // Função para validação do tipo de usuário:
  function handleTypeType(e) {
    setInputData({ ...inputData, user_type: e.target.value });

    if (e.target.value !== 1 && e.target.value !== 2 && e.target.value !== 3) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_type: false },
        message: {
          ...checkData.message,
          user_type: "Tipo de usuário inválido.",
        },
      });

      return;
    }

    setCheckData({
      ...checkData,
      status: { ...checkData.status, user_type: true },
      message: { ...checkData.message, user_type: "Sem erros." },
    });

    return;
  }

  // Função para validação do código de usuário:
  function handleCodeType(e) {
    setInputData({ ...inputData, user_validationCode: e.target.value });

    if (e.target.value.length < 6) {
      setCheckData({
        ...checkData,
        status: { ...checkData.status, user_validationCode: false },
        message: {
          ...checkData.message,
          user_validationCode: "Código de validação inválido.",
        },
      });

      return;
    }

    setCheckData({
      ...checkData,
      status: { ...checkData.status, user_validationCode: true },
      message: { ...checkData.message, user_validationCode: "Sem erros." },
    });

    return;
  }

  
  /*---------------------------------------------------------------*/

  return <div></div>;
}

export default Register;
