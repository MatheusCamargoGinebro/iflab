// O==========================================================================O

// API ADDRESS:
const API_ADDRESS = "http://localhost:3333";

// O==========================================================================O

// Função para verificar token:
async function checktoken() {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/data`, options);
    const data = await response.json();

    // Se o token for válido, armazena os dados do usuário no localStorage:
    if (data.status) {
      localStorage.setItem("user", JSON.stringify(data.data));
    }

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para login:
async function login(user_email, user_password) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_email,
      user_password,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/login`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para logout:
async function logout() {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/logout`, options);
    const data = await response.json();

    localStorage.removeItem("token");

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para validar email:
async function createMailCode(user_email) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_email,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/sendmailcode`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para validar código de email:
async function validateMailCode(user_email, validationCode) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_email,
      validationCode,
    }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/user/validatemailcode`,
      options
    );

    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function register(
  user_name,
  user_email,
  user_password,
  user_type,
  user_campusId,
  validationCode
) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_name,
      user_email,
      user_password,
      user_type,
      user_campusId,
      validationCode,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/register`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar nome:
async function editName(user_name) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      user_name,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/edit/name`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar email:
async function editEmail(user_email, validationCode) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      user_email,
      validationCode,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/edit/email`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar senha:
async function editPassword(user_password) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      user_password,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/edit/password`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar foto:
async function editPicture(user_profpic) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_profpic }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/edit/picture`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar tipo:
async function editType(user_type) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      user_type,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/user/edit/type`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Exportando funções de requisição para o servidor:
export {
  checktoken,
  login,
  logout,
  createMailCode,
  validateMailCode,
  register,
  editName,
  editEmail,
  editPassword,
  editPicture,
  editType,
};

// O==========================================================================O
