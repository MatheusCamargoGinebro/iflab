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
import type_other from "../../assets/icons/UI/other.png";

// Importando requisições da API:
import {
  sendMailCode,
  validateMailCode,
  registerUser,
  getAllCampus,
  loginUser,
} from "../../api/requests";

/* O=============================================================================================O */

function Register() {
  /*---------------------------------------------------------------*/

  // Função de contato com a API:
  async function handleSendMail(email) {
    const result = await sendMailCode(email);

    if (result.status === true) {
      setStep(1);
    } else {
      setRequestError({
        status: true,
        message: result.message,
      });
    }
  }

  async function handleValidationCode(email, code) {
    const result = await validateMailCode({
      user_email: email,
      validationCode: code,
    });

    if (result.status === true) {
      setStep(2);
    } else {
      setRequestError({
        status: true,
        message: result.message,
      });
    }
  }

  const [campusData, setCampusData] = useState([]);

  async function readAllCampus() {
    const result = await getAllCampus();

    if (result.status === true) {
      const campusData = result.campusData;

      setCampusData(campusData);
    }

    return;
  }

  async function handleRegisterUser(userData) {
    userData.user_campusId = parseInt(userData.user_campusId);
    userData.user_type = parseInt(userData.user_type);

    const result = await registerUser(userData);

    if (result.status === true) {
      const loginResult = await loginUser(
        userData.user_email,
        userData.user_password
      );

      if (loginResult.status === false) {
        setRequestError({
          status: true,
          message: loginResult.message,
        });
        return;
      }

      localStorage.setItem("token", loginResult.token);
      window.location.href = "/home";
    } else {
      setRequestError({
        status: true,
        message: result.message,
      });
    }

    return;
  }

  /*---------------------------------------------------------------*/
  const [step, setStep] = useState(0);

  function stepBack() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function stepNext() {
    if (step < 5) {
      setStep(step + 1);
    }
  }

  /*---------------------------------------------------------------*/

  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  /*---------------------------------------------------------------*/

  const [readTerms, setReadTerms] = useState(false);

  /*---------------------------------------------------------------*/

  const [newUserData, setNewUserData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_password_confirmation: "",
    user_profpic: "",
    user_type: 0,
    user_campusId: 0,
    validationCode: "",
  });

  const [checkData, setCheckData] = useState({
    user_name: false,
    user_email: false,
    user_password: false,
    user_password_confirmation: false,
    user_profpic: false,
    user_type: false,
    user_campusId: false,
    validationCode: false,
  });

  const [error, setError] = useState({
    user_name: "Nome inválido.",
    user_email: "Email inválido.",
    user_password: "Senha inválida.",
    user_password_confirmation: "Senhas não coincidem.",
    user_profpic: "Imagem inválida.",
    user_type: "Tipo de usuário inválido.",
    user_campusId: "Campus inválido.",
    validationCode: "Código inválido.",
  });

  /*---------------------------------------------------------------*/
  function handleMailType(e) {
    const email = e.target.value;
    setNewUserData({ ...newUserData, user_email: email });

    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(email) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(email)
    ) {
      setError({ ...error, user_email: "Email inválido" });
      setCheckData({ ...checkData, user_email: false });
    } else {
      setError({ ...error, user_email: "Sem erros" });
      setCheckData({ ...checkData, user_email: true });
    }

    return;
  }

  function handleValidationCodeType(e) {
    const code = e.target.value;
    setNewUserData({ ...newUserData, validationCode: code });

    // deve ser composto apenas por números:
    if (!/^[0-9]+$/.test(code)) {
      setError({
        ...error,
        validationCode: "Código deve conter apenas números.",
      });
      setCheckData({ ...checkData, validationCode: false });

      return;
    }

    // deve ter 5 caracteres:
    if (code.length !== 5) {
      setError({ ...error, validationCode: "Código deve ter 5 carácteres." });
      setCheckData({ ...checkData, validationCode: false });

      return;
    }

    // se passar nas duas verificações, o código é válido:
    setError({ ...error, validationCode: "Sem erros" });
    setCheckData({ ...checkData, validationCode: true });

    return;
  }

  function handleUserNameType(e) {
    const name = e.target.value;

    setNewUserData({ ...newUserData, user_name: name });

    if (name.length < 3) {
      setError({ ...error, user_name: "Nome muito pequeno." });
      setCheckData({ ...checkData, user_name: false });

      return;
    }

    if (name.length > 128) {
      setError({ ...error, user_name: "Nome muito grande." });
      setCheckData({ ...checkData, user_name: false });

      return;
    }

    setError({ ...error, user_name: "Sem erros" });
    setCheckData({ ...checkData, user_name: true });

    return;
  }

  function handleUserPasswordType(e) {
    const password = e.target.value;

    setNewUserData({ ...newUserData, user_password: password });

    if (password.length < 8) {
      setError({ ...error, user_password: "Senha deve conter 8 caracteres." });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/[a-z]/.test(password)) {
      setError({
        ...error,
        user_password: "Senha deve conter uma letra minúscula.",
      });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError({
        ...error,
        user_password: "Senha deve conter uma letra maiúscula.",
      });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/[0-9]/.test(password)) {
      setError({ ...error, user_password: "Senha deve conter um número." });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      setError({
        ...error,
        user_password: "Senha deve conter um caractere especial.",
      });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    setError({ ...error, user_password: "Sem erros" });
    setCheckData({ ...checkData, user_password: true });

    return;
  }

  function handlePasswordConfirmationType(e) {
    const password = e.target.value;

    setNewUserData({ ...newUserData, user_password_confirmation: password });

    if (password !== newUserData.user_password) {
      setError({
        ...error,
        user_password_confirmation: "Senhas não coincidem.",
      });
      setCheckData({ ...checkData, user_password_confirmation: false });
    } else {
      setError({ ...error, user_password_confirmation: "Sem erros" });
      setCheckData({ ...checkData, user_password_confirmation: true });
    }

    return;
  }

  function handleCampusChange(e) {
    const campusId = e.target.value;

    setNewUserData({ ...newUserData, user_campusId: campusId });

    if (campusId === 0) {
      setError({ ...error, user_campusId: "Campus inválido." });
      setCheckData({ ...checkData, user_campusId: false });
    } else {
      setError({ ...error, user_campusId: "Sem erros" });
      setCheckData({ ...checkData, user_campusId: true });
    }

    return;
  }

  /*---------------------------------------------------------------*/

  return (
    <div className="h-screen w-screen bg-iflab_white_dark flex justify-center items-center">
      <form
        className="px-10 pt-5 pb-10 min-w-[28rem] bg-iflab_white rounded-md shadow-md"
        onSubmit={(e) => {
          e.preventDefault();

          if (step === 0 && checkData.user_email) {
            handleSendMail(newUserData.user_email);
          }

          if (step === 1 && checkData.validationCode) {
            handleValidationCode(
              newUserData.user_email,
              newUserData.validationCode
            );
          }

          if (
            step === 2 &&
            checkData.user_name &&
            checkData.user_password &&
            checkData.user_password_confirmation
          ) {
            stepNext();
          }

          if (step === 3 && checkData.user_type) {
            stepNext();
          }

          if (step === 4 && checkData.user_campusId) {
            stepNext();
          }

          if (step === 5 && readTerms) {
            handleRegisterUser(newUserData);
          }
        }}
      >
        <div className="flex justify-center">
          <h1 className="text-2xl">
            Registrar-se no{" "}
            <span className="font-bold text-iflab_green_light">IFLab</span>
          </h1>
        </div>

        {/* Passo 0: Informar Email */}
        {step === 0 && (
          <div>
            <div className="flex flex-col gap-5 pt-10 pb-10">
              <TextInput
                predata={newUserData.user_email}
                icon={email}
                type="email"
                name={"email-input"}
                label="Email"
                state={
                  newUserData.user_email.length === 0
                    ? true
                    : checkData.user_email
                }
                errorMessage={error.user_email}
                onChange={(e) => handleMailType(e)}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <h1>Já tem uma conta?</h1>
                <TButton
                  text="Logar"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  disabled={false}
                />
              </div>
              <PButton
                text="Próximo"
                disabled={!checkData.user_email}
                onClick={() => handleSendMail(newUserData.user_email)}
              />
            </div>
          </div>
        )}

        {/* Passo 1: Informar Código recebido por email*/}
        {step === 1 && (
          <div>
            <div className="flex flex-col gap-5 pb-10 py-10">
              <TextInput
                predata={newUserData.validationCode}
                icon={potion}
                type="text"
                name={"validation-code-input"}
                label="Código de Validação"
                state={
                  newUserData.validationCode.length === 0
                    ? true
                    : checkData.validationCode
                }
                errorMessage={error.validationCode}
                onChange={(e) => handleValidationCodeType(e)}
              />
            </div>

            <div className="flex justify-between items-center">
              <TButton text="Voltar" onClick={() => stepBack()} />
              <PButton
                text="Próximo"
                onClick={() =>
                  handleValidationCode(
                    newUserData.user_email,
                    newUserData.validationCode
                  )
                }
                disabled={!checkData.validationCode}
              />
            </div>
          </div>
        )}

        {/* Passo 2: Informar Dados Pessoais (nome e senha (confirmação de senha) */}
        {step === 2 && (
          <div>
            <div className="flex flex-col gap-5 pb-10 py-10">
              <TextInput
                predata={newUserData.user_name}
                icon={user}
                type="text"
                name={"name-input"}
                label="Nome"
                state={
                  newUserData.user_name.length === 0
                    ? true
                    : checkData.user_name
                }
                errorMessage={error.user_name}
                onChange={(e) => handleUserNameType(e)}
              />

              <TextInput
                predata={newUserData.user_password}
                type="password"
                name={"password-input"}
                label="Senha"
                state={
                  newUserData.user_password.length === 0
                    ? true
                    : checkData.user_password
                }
                errorMessage={error.user_password}
                onChange={(e) => handleUserPasswordType(e)}
              />

              <TextInput
                predata={newUserData.user_password_confirmation}
                type="password"
                name={"password-confirmation-input"}
                label="Confirmação de Senha"
                state={
                  newUserData.user_password_confirmation.length === 0
                    ? true
                    : checkData.user_password_confirmation
                }
                errorMessage={error.user_password_confirmation}
                onChange={(e) => handlePasswordConfirmationType(e)}
              />
            </div>

            <div className="flex justify-between items-center">
              <TButton text="Voltar" onClick={() => stepBack()} />
              <PButton
                text="Próximo"
                onClick={() => stepNext()}
                disabled={
                  !checkData.user_name ||
                  !checkData.user_password ||
                  !checkData.user_password_confirmation
                }
              />
            </div>
          </div>
        )}

        {/* Passo 3: Informar Tipo de Usuário (Professor, aluno ou outro) */}
        {step === 3 && (
          <div>
            <div className="flex flex-col gap-5 pb-10 py-10">
              <div className="flex flex-col gap-2">
                <h1>Selecione o tipo de usuário:</h1>
              </div>
              <div className="flex justify-evenly items-center">
                <div
                  className={`w-fit flex flex-col justify-center items-center p-2 cursor-pointer duration-75 hover:bg-iflab_white_dark hover:border-iflab_white_dark ${
                    newUserData.user_type === 1
                      ? "border-2 border-iflab_white_dark rounded-lg bg-iflab_white_light"
                      : "border-2 border-iflab_white rounded-lg bg-iflab_white"
                  }`}
                  onClick={() => {
                    setNewUserData({ ...newUserData, user_type: 1 });
                    setCheckData({ ...checkData, user_type: true });
                  }}
                >
                  <div className="flex justify-between items-center">
                    <img src={type_student} alt="Aluno" className="h-20 w-20" />
                  </div>

                  <h1>Aluno</h1>
                </div>

                <div
                  className={`w-fit flex flex-col justify-center items-center p-2 cursor-pointer duration-75 hover:bg-iflab_white_dark hover:border-iflab_white_dark ${
                    newUserData.user_type === 2
                      ? "border-2 border-iflab_white_dark rounded-lg bg-iflab_white_light"
                      : "border-2 border-iflab_white rounded-lg bg-iflab_white"
                  }`}
                  onClick={() => {
                    setNewUserData({ ...newUserData, user_type: 2 });
                    setCheckData({ ...checkData, user_type: true });
                  }}
                >
                  <img
                    src={type_professor}
                    alt="Professor"
                    className="h-20 w-20"
                  />

                  <h1>Professor</h1>
                </div>
                <div
                  className={`w-fit flex flex-col justify-center items-center p-2 cursor-pointer duration-75 hover:bg-iflab_white_dark hover:border-iflab_white_dark ${
                    newUserData.user_type === 3
                      ? "border-2 border-iflab_white_dark rounded-lg bg-iflab_white_light"
                      : "border-2 border-iflab_white rounded-lg bg-iflab_white"
                  }`}
                  onClick={() => {
                    setNewUserData({ ...newUserData, user_type: 3 });
                    setCheckData({ ...checkData, user_type: true });
                  }}
                >
                  <img src={type_other} alt="Outro" className="h-20 w-20" />

                  <h1>Outro</h1>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TButton text="Voltar" onClick={() => stepBack()} />
              <PButton
                text="Próximo"
                onClick={() => stepNext()}
                disabled={!newUserData.user_type}
              />
            </div>
          </div>
        )}

        {/* Passo 4: Informar Campus */}
        {step === 4 && (
          <div>
            <div className="flex flex-col gap-5 pb-10 py-10">
              <div>
                <h1>Selecione o campus:</h1>
              </div>
              <div>
                <select
                  className="w-full p-2 rounded-md cursor-pointer bg-iflab_white border-2 border-iflab_white_dark"
                  onChange={(e) => handleCampusChange(e)}
                  onClick={() => readAllCampus()}
                >
                  {campusData.map((campus) => (
                    <option key={campus.ID_campus} value={campus.ID_campus}>
                      {campus.Nome} - {campus.Estado}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TButton text="Voltar" onClick={() => stepBack()} />
              <PButton
                text="Próximo"
                onClick={() => stepNext()}
                disabled={!checkData.user_campusId}
              />
            </div>
          </div>
        )}

        {/* passo 5: leitura do termo de utilização*/}
        {step === 5 && (
          <div className="max-w-[32rem] max-h-[32rem]">
            <div className="flex flex-col gap-5 pb-10 py-10">
              <h1>Termo de Utilização:</h1>
              <div className="flex flex-col text-justify bg-iflab_white_dark p-5 overflow-y-auto h-[20rem] rounded-md">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum quisquam culpa et voluptatibus quos sed perspiciatis
                  cupiditate temporibus necessitatibus distinctio. Voluptatibus
                  ipsa nobis asperiores itaque repellat inventore consectetur
                  illum qui. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Eligendi soluta beatae deserunt doloremque nemo, dolores
                  tenetur culpa quia veniam sint incidunt neque nam laborum
                  quam, pariatur ducimus maiores magnam perferendis? Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
                  accusantium eius. Similique tempora impedit quos veniam vero
                  rerum sapiente velit libero nam animi, numquam omnis,
                  doloremque unde iure ut fugit? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ipsam placeat repellat vero
                  ipsum? Rem est ducimus maiores repellat iste expedita mollitia
                  aut ea et. Itaque, nisi sunt? Nobis, numquam excepturi. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Omnis at
                  ullam quo laboriosam hic velit sunt illo quisquam corporis
                  exercitationem, provident odio quas, dignissimos odit,
                  perferendis libero tempora quis labore. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Aut expedita, tempore
                  nesciunt, ab, magni possimus totam corrupti magnam illo unde
                  suscipit accusantium et tempora distinctio facilis! Corrupti
                  magni voluptatibus aliquam. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Non quia veniam dolor ab esse
                  architecto blanditiis reiciendis impedit eligendi. Est enim
                  iste, iusto repudiandae perferendis tempore facilis minima
                  ipsam totam. Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Corporis eius eligendi dicta! Rerum sint
                  quaerat, rem esse cum libero soluta blanditiis repellendus
                  similique impedit autem. Ea voluptatibus perspiciatis aut
                  veniam! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Impedit magni totam cumque modi sit dicta debitis sunt a
                  exercitationem recusandae culpa, neque sed maxime quisquam
                  labore provident omnis necessitatibus similique! Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Tempore
                  accusamus, debitis, maiores eos architecto itaque incidunt
                  iste vel fugiat consequuntur soluta accusantium quidem
                  similique optio. Nesciunt iure sit nisi ducimus.
                </p>
              </div>

              <div
                className="flex items-center gap-2 cursor-pointer text-iflab_gray hover:text-iflab_gray_dark"
                onClick={() => setReadTerms(!readTerms)}
              >
                <input
                  type="checkbox"
                  className="cursor-pointer accent-iflab_green_light"
                  checked={readTerms}
                  onChange={() => setReadTerms(!readTerms)}
                />

                <h1>Li e concordo com os termos de utilização.</h1>
              </div>
            </div>
            <div className="flex justify-end gap-10 items-center">
              <TButton text="Voltar" onClick={() => stepBack()} />
              <PButton
                text="Registrar"
                onClick={() => handleRegisterUser(newUserData)}
                disabled={!readTerms}
              />
            </div>
          </div>
        )}

        {/* Marcador de passos (uma linha que aumenta conforme o usuário progride): */}
        <div className="fixed flex justify-start items-center top-0 left-0 w-full h-1 bg-iflab_white">
          <div
            className={`bg-iflab_green_light h-2 duration-300 rounded-r-full ${
              step === 0
                ? "w-0"
                : step === 1
                ? "w-1/5"
                : step === 2
                ? "w-2/5"
                : step === 3
                ? "w-3/5"
                : step === 4
                ? "w-4/5"
                : "w-full"
            }`}
          />
        </div>
      </form>
      {requestError.status && (
        <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen fixed flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-iflab_white rounded-md w-[30rem] shadow-xl p-5">
            <div className="flex justify-center mb-5">
              <h1 className="text-2xl">Houve um erro...</h1>
            </div>
            <div>
              <p className="text-justify flex justify-center items-center p-5 min-h-[5rem] bg-iflab_white_dark rounded-sm w-full h-full">
                {requestError.message}
              </p>
            </div>
            <div className="flex justify-center pt-5 bottom-0 left-0 w-full">
              <PButton
                text="Tentar novamente"
                onClick={() =>
                  setRequestError({ ...requestError, status: false })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
