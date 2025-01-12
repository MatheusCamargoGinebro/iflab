// O==========================================================================O

// API ADDRESS:
const API_ADDRESS = "http://localhost:3333";

// O==========================================================================O

// Função para pegar todos os laboratórios que estão relacionados ao usuário:
async function getLabs() {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/list/all`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function getLabsByLevel(lab_adminLevel) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_adminLevel }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/list/level`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para pegar um laboratório específico pelo ID:
async function getLabById(lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/list`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para pegar as sessões de um laboratório específico pelo ID:
async function getLabSessions(session_labId) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_labId }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/session/list`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para iniciar uma sessão de um laboratório:
async function registerSession(
  session_start_at,
  session_end_at,
  session_labId
) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_start_at, session_end_at, session_labId }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/lab/session/register`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para encerrar uma sessão de um laboratório:
async function endSession(session_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/session/end`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para registrar um novo laboratório:
async function registerNewLab(lab_name, lab_capacity) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_name, lab_capacity }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/register`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para deletar um laboratório:
async function deleteLab(lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/remove`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar o nome de um laboratório:
async function editLabName(lab_name, lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      lab_name,
      lab_id,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/edit/name`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar a capacidade de um laboratório:
async function editLabCapacity(lab_capacity, lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      lab_capacity,
      lab_id,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/edit/capacity`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function addUserToLab(user_id, lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_id, lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/adduser`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function removeUserFromLab(user_id, lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_id, lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/removeuser`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function turnLabAdmin(user_id, lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ user_id, lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/addadmin`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O
async function removeLabAdmin(user_id, lab_id) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/10.1.1",
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzE1NzUzNSwiZXhwIjoxNzMzMjQzOTM1fQ.Wb-Cvp_VgLXC81j_KqRNAduzsy-nbJnm_AcOC73FnW0",
    },
    body: '{"user_id":3,"lab_id":1}',
  };

  fetch("http://localhost:3333/lab/removeadmin", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// O==========================================================================O

// Função para listar relação entre usuário e laboratório:
async function getLabUserRelation(lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/lab/user/relation`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// exportando as funções:
export {
  getLabs,
  getLabsByLevel,
  getLabById,
  getLabSessions,
  registerSession,
  endSession,
  registerNewLab,
  deleteLab,
  editLabName,
  editLabCapacity,
  addUserToLab,
  removeUserFromLab,
  turnLabAdmin,
  removeLabAdmin,
  getLabUserRelation,
};

// O==========================================================================O
