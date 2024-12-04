// Funções responsáveis pela autenticação do usuário
function login(email, password) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_email: email, user_password: password }),
    mode: "cors",
  };

  fetch("http://localhost:3333/user/login", options)
    .then((response) => {
      console.log("resposta:\n", response);
    })
    .catch((err) => {
      console.error("erro:\n",err);
    });
}

// Função para pegar os dados do usuário:
function getUserData(token) {
  const options = {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  };

  fetch("http://localhost:3333/user/data", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// exportando as funções:
export { login, getUserData };
