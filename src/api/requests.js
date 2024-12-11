// Função para validar token do usuário:
async function checktoken() {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch("http://localhost:3333/user/data", options);
    const data = await response.json();

    return data.status;
  } catch (err) {
    return false;
  }
}

// Função para login:
async function loginUser(userData) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_email: userData.email,
      user_password: userData.password,
    }),
  };

  try {
    const response = await fetch("http://localhost:3333/user/login", options);
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function sendMailCode(email) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_email: email }),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/user/sendmailcode",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function registerUser(userData) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/user/register",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

// exportando as funções:
export { checktoken, loginUser, sendMailCode, registerUser };
