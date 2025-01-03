/* O=============================================================================================O */

// Importando ferramentas do React:
import React, { useEffect, useState } from "react";

// Importando componentes:
import PButton from "../../components/buttons/PButton";
import TButton from "../../components/buttons/TButton";
import TextInput from "../../components/inputs/TextInput";
import ErrorModal from "../../components/Modals/ErrorModal";

// Importando ícones:
import emailIcon from "../../assets/icons/UI/email.png";
import userIcon from "../../assets/icons/UI/user.png";
import potionIcon from "../../assets/icons/UI/potion.png";
import professorIcon from "../../assets/icons/UI/teacher.png";
import studentIcon from "../../assets/icons/UI/student.png";
import adminIcon from "../../assets/icons/UI/other.png";

// Importando requisições da API:

// Do usuário:
import {
  createMailCode,
  validateMailCode,
  register,
  login,
} from "../../api/user_requests";

// Do campus:
import { getAllCampus } from "../../api/campus_requests";

// O=============================================================================================O

// Função da página de registro:
function Register() {
  // +---------------------------------------------------------------------------------+

  // States:

  // State de controle de etapas:
  const [step, setStep] = useState(0);

  // Funções de controle de etapas:

  // Voltar para a etapa anterior:
  function stepBack() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  // Avançar para a próxima etapa:
  function stepNext() {
    if (step < 5) {
      setStep(step + 1);
    }
  }

  // State de controle de erros (para ErrorModal):
  const [requestError, setRequestError] = useState({
    status: false,
    message: "",
  });

  // State de controle de leitura dos termos:
  const [readTerms, setReadTerms] = useState(false);

  // State de controle de dados do novo usuário:
  const [newUserData, setNewUserData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_password_confirmation: "",
    user_type: 0,
    user_campusId: 0,
    validationCode: "",
  });

  // State de controle de verificação de dados:
  const [checkData, setCheckData] = useState({
    user_email: false,
    validationCode: false,
    user_name: false,
    user_password: false,
    user_password_confirmation: false,
    user_campusId: false,
    user_type: false,
  });

  // State de controle de erros:
  const [error, setError] = useState({
    user_email: "Email inválido!",
    validationCode: "Código inválido!",
    user_name: "Nome inválido!",
    user_password: "Senha inválida!",
    user_password_confirmation: "Senhas não coincidem!",
    user_campusId: "Campus inválido!",
    user_type: "Tipo de usuário inválido!",
  });

  // State de controle de dados do campus:
  const [campusData, setCampusData] = useState([]);

  // +---------------------------------------------------------------------------------+

  // Funções para lidar com os inputs:

  // Função para lidar com o email:
  function handleMailType(e) {
    const email = e.target.value;
    setNewUserData({ ...newUserData, user_email: email });

    if (
      !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(email) &&
      !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(email)
    ) {
      setError({ ...error, user_email: "Email deve ser institucional!" });
      setCheckData({ ...checkData, user_email: false });

      return;
    }

    setError({ ...error, user_email: "Sem erros" });
    setCheckData({ ...checkData, user_email: true });

    return;
  }

  // Função para lidar com o código de validação:
  function handleValidationCodeType(e) {
    const code = e.target.value;
    setNewUserData({ ...newUserData, validationCode: code });

    if (!/^[0-9]+$/.test(code)) {
      setError({
        ...error,
        validationCode: "Código deve conter apenas números!",
      });
      setCheckData({ ...checkData, validationCode: false });

      return;
    }

    if (code.length !== 5) {
      setError({ ...error, validationCode: "Código deve ter 5 carácteres!" });
      setCheckData({ ...checkData, validationCode: false });

      return;
    }

    setError({ ...error, validationCode: "Sem erros" });
    setCheckData({ ...checkData, validationCode: true });

    return;
  }

  // Função para lidar com o nome do usuário:
  function handleUserNameType(e) {
    const name = e.target.value;
    setNewUserData({ ...newUserData, user_name: name });

    if (name.length < 3) {
      setError({ ...error, user_name: "Nome muito pequeno!" });
      setCheckData({ ...checkData, user_name: false });

      return;
    }

    if (name.length > 128) {
      setError({ ...error, user_name: "Nome muito grande!" });
      setCheckData({ ...checkData, user_name: false });

      return;
    }

    setError({ ...error, user_name: "Sem erros" });
    setCheckData({ ...checkData, user_name: true });

    return;
  }

  // Função para lidar com a senha do usuário:
  function handleUserPasswordType(e) {
    const password = e.target.value;
    setNewUserData({ ...newUserData, user_password: password });

    if (password.length < 8) {
      setError({ ...error, user_password: "Senha deve ter 8 caracteres!" });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/(?=.*[a-z])/.test(password)) {
      setError({
        ...error,
        user_password: "Senha deve conter uma letra minúscula!",
      });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      setError({
        ...error,
        user_password: "Senha deve conter uma letra maiúscula!",
      });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/(?=.*[0-9])/.test(password)) {
      setError({ ...error, user_password: "Senha deve conter um número!" });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (!/(?=.*[!@#\$%\^&\*])/.test(password)) {
      setError({
        ...error,
        user_password: "Senha deve conter um caracter especial!",
      });
      setCheckData({ ...checkData, user_password: false });

      return;
    }

    if (newUserData.user_password_confirmation !== password) {
      setError({
        ...error,
        user_password_confirmation: "Senhas não coincidem!",
      });
      setCheckData({ ...checkData, user_password_confirmation: false });
    }

    setError({ ...error, user_password: "Sem erros" });
    setCheckData({ ...checkData, user_password: true });

    return;
  }

  // Função para lidar com a confirmação de senha:
  function handlePasswordConfirmationType(e) {
    const password = e.target.value;
    setNewUserData({ ...newUserData, user_password_confirmation: password });

    if (password !== newUserData.user_password) {
      setError({
        ...error,
        user_password_confirmation: "Senhas não coincidem!",
      });
      setCheckData({ ...checkData, user_password_confirmation: false });

      return;
    }

    setError({ ...error, user_password_confirmation: "Sem erros" });
    setCheckData({ ...checkData, user_password_confirmation: true });

    return;
  }

  // Função para lidar com a mudança de campus:
  function handleCampusChange(e) {
    const campusId = parseInt(e.target.value);
    setNewUserData({ ...newUserData, user_campusId: campusId });

    if (campusId === 0) {
      setError({ ...error, user_campusId: "Campus inválido!" });
      setCheckData({ ...checkData, user_campusId: false });

      return;
    }

    setError({ ...error, user_campusId: "Sem erros" });
    setCheckData({ ...checkData, user_campusId: true });

    return;
  }

  // +---------------------------------------------------------------------------------+

  // Funções de contato com a API:

  // Função para enviar o email de validação:
  async function handleSendMail(email) {
    const result = await createMailCode(email);

    if (result.status === false) {
      setRequestError({
        status: true,
        message: result.message,
      });

      return;
    }

    stepNext();
  }

  // Função para validar o código de validação:
  async function handleValidationCode(email, code) {
    const result = await validateMailCode(email, code);

    if (result.status === false) {
      setRequestError({
        status: true,
        message: result.message,
      });

      return;
    }

    stepNext();
  }

  // Função para registrar o usuário:
  async function handleRegisterUser(userData) {
    const result = await register(
      userData.user_name,
      userData.user_email,
      userData.user_password,
      userData.user_type,
      userData.user_campusId,
      userData.validationCode
    );

    if (result.status === false) {
      setRequestError({
        status: true,
        message: result.message,
      });

      return;
    }

    const loginResult = await login(
      userData.user_email,
      userData.user_password
    );

    if (loginResult.status === false) {
      setRequestError({
        status: true,
        message: "Não foi possível logar: " + loginResult.message,
      });

      return;
    }

    localStorage.setItem("token", loginResult.token);
    window.location.href = "/home";
  }

  // Função para ler todos os campus:
  async function readAllCampus() {
    const result = await getAllCampus();

    if (result.status === false) {
      setRequestError({
        status: true,
        message: result.message,
      });

      return;
    }

    setCampusData(result.campusData);
  }

  useEffect(() => {
    readAllCampus();
  }, []);

  // +---------------------------------------------------------------------------------+

  return (
    <>
      {/* Formulário de registro: */}
      <div className="h-screen w-screen bg-iflab_white_dark flex justify-center items-center">
        <form
          className="px-10 pt-5 pb-10 min-w-[28rem] bg-iflab_white rounded-md shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex justify-center">
            <h1 className="text-2xl">
              Registrar-se no{" "}
              <span className="font-bold text-iflab_green_light">IFLab</span>
            </h1>
          </div>

          {/* Etapa 0: Email */}
          {step === 0 && (
            <>
              <div className="flex flex-col gap-5 pt-10 pb-10">
                <TextInput
                  predata={newUserData.user_email}
                  icon={emailIcon}
                  type="email"
                  name={"email-input"}
                  label="Email"
                  state={checkData.user_email}
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
            </>
          )}

          {/* Etapa 1: Código de Validação */}
          {step === 1 && (
            <>
              <div className="flex flex-col gap-5 pb-10 py-10">
                <TextInput
                  predata={newUserData.validationCode}
                  icon={potionIcon}
                  type="text"
                  name={"validation-code-input"}
                  label="Código de Validação"
                  state={checkData.validationCode}
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
            </>
          )}

          {/* Etapa 2: Nome e Senha */}
          {step === 2 && (
            <>
              <div className="flex flex-col gap-5 pb-10 py-10">
                <TextInput
                  predata={newUserData.user_name}
                  icon={userIcon}
                  type="text"
                  name={"name-input"}
                  label="Nome"
                  state={checkData.user_name}
                  errorMessage={error.user_name}
                  onChange={(e) => handleUserNameType(e)}
                />

                <TextInput
                  predata={newUserData.user_password}
                  type="password"
                  name={"password-input"}
                  label="Senha"
                  state={checkData.user_password}
                  errorMessage={error.user_password}
                  onChange={(e) => handleUserPasswordType(e)}
                />

                <TextInput
                  predata={newUserData.user_password_confirmation}
                  type="password"
                  name={"password-confirmation-input"}
                  label="Confirmação de Senha"
                  state={checkData.user_password_confirmation}
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
            </>
          )}

          {/* Etapa 3: Tipo de Usuário */}
          {step === 3 && (
            <>
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
                      <img
                        src={studentIcon}
                        alt="Aluno"
                        className="h-20 w-20"
                      />
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
                      src={professorIcon}
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
                    <img src={adminIcon} alt="Outro" className="h-20 w-20" />

                    <h1>Outro</h1>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <TButton text="Voltar" onClick={() => stepBack()} />
                <PButton
                  text="Próximo"
                  onClick={() => stepNext()}
                  disabled={!checkData.user_type}
                />
              </div>
            </>
          )}

          {/* Etapa 4: Campus */}
          {step === 4 && (
            <>
              <div className="flex flex-col gap-5 pb-10 py-10">
                <div className="flex flex-col gap-2">
                  <h1>Selecione o campus:</h1>
                </div>
                <div className="flex justify-evenly items-center">
                  <select
                    className="w-full p-2 rounded-lg border-2 border-iflab_white_dark cursor-help hover:bg-iflab_white_light hover:border-iflab_white_dark"
                    onChange={(e) => handleCampusChange(e)}
                  >
                    <option key={0} value={0} className="bg-iflab_white_light">
                      Selecione um campus...
                    </option>
                    {campusData.map((campus) => (
                      <option
                        key={campus.ID_campus}
                        value={campus.ID_campus}
                        className="bg-iflab_white_light"
                      >
                        {campus.Nome + " - " + campus.Estado}
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
            </>
          )}

          {/* Etapa 5: Termos de Uso */}
          {step === 5 && (
            <div className="max-w-[32rem] max-h-[32rem]">
              <div className="flex flex-col gap-5 pb-10 py-10">
                <h1>Termo de Utilização:</h1>
                <div className="flex flex-col text-justify bg-iflab_white_dark p-5 overflow-y-auto h-[20rem] rounded-md">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum quisquam culpa et voluptatibus quos sed perspiciatis
                    cupiditate temporibus necessitatibus distinctio.
                    Voluptatibus ipsa nobis asperiores itaque repellat inventore
                    consectetur illum qui. Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Eligendi soluta beatae
                    deserunt doloremque nemo, dolores tenetur culpa quia veniam
                    sint incidunt neque nam laborum quam, pariatur ducimus
                    maiores magnam perferendis? Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Dicta, accusantium eius.
                    Similique tempora impedit quos veniam vero rerum sapiente
                    velit libero nam animi, numquam omnis, doloremque unde iure
                    ut fugit? Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Ipsam placeat repellat vero ipsum? Rem est ducimus
                    maiores repellat iste expedita mollitia aut ea et. Itaque,
                    nisi sunt? Nobis, numquam excepturi. Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Omnis at ullam quo
                    laboriosam hic velit sunt illo quisquam corporis
                    exercitationem, provident odio quas, dignissimos odit,
                    perferendis libero tempora quis labore. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Aut expedita, tempore
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
                    elit. Impedit magni totam cumque modi sit dicta debitis sunt
                    a exercitationem recusandae culpa, neque sed maxime quisquam
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
        </form>
      </div>

      {/* Modal de contagem de etapas: */}
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

      {/* Modal de erro: */}
      {requestError.status && (
        <ErrorModal
          message={requestError.message}
          onClose={() => setRequestError({ status: false, message: "" })}
        />
      )}
    </>
  );
}

// Exportando a função:
export default Register;

/* O=============================================================================================O */
