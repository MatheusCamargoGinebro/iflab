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

    return data;
  } catch (err) {
    return false;
  }
}

// Função para login:
async function loginUser(email, password) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_email: email,
      user_password: password,
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

async function logoutUser() {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch("http://localhost:3333/user/logout", options);
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

async function getAllCampus() {
  try {
    const response = await fetch("http://localhost:3333/campus/list");
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function validateMailCode(userData) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/user/validatemailcode",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function editName(user_name) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_name }),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/user/edit/name",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function editEmail(user_email, validationCode) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_email, validationCode }),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/user/edit/email",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function editPassword(user_password) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_password }),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/user/edit/password",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

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
    const response = await fetch(
      "http://localhost:3333/user/edit/picture",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function editType(user_type) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_type }),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/user/edit/type",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function getLabs() {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch("http://localhost:3333/lab/list/all", options);
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function getLabById(labId) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_id: labId }),
  };

  try {
    const response = await fetch("http://localhost:3333/lab/list", options);
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function getSessionsByLabId(labId) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_labId: labId }),
  };

  try {
    const response = await fetch("http://localhost:3333/session/list", options);
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function registerLab(newLab) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(newLab),
  };

  try {
    const response = await fetch("http://localhost:3333/lab/register", options);
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function editLabName(lab_name, lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_name, lab_id }),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/lab/edit/name",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

async function editLabCapacity(lab_capacity, lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_capacity, lab_id }),
  };

  try {
    const response = await fetch(
      "http://localhost:3333/lab/edit/capacity",
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

// exportando as funções:
export {
  checktoken,
  loginUser,
  logoutUser,
  sendMailCode,
  registerUser,
  getAllCampus,
  validateMailCode,
  editName,
  editEmail,
  editPassword,
  editPicture,
  editType,
  getLabs,
  getLabById,
  getSessionsByLabId,
  registerLab,
  editLabName,
  editLabCapacity,
};
