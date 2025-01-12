// O==========================================================================O

// API ADDRESS:
const API_ADDRESS = "http://localhost:3333";

// O==========================================================================O

// Função para obter os elementos pela ID:
async function getElementById(element_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/element/list/specific`,
      options
    );

    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para obter os elementos de um laboratório:
async function getLabElements(lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_labId: lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/element/list`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para obter os elementos de uma sessão:
async function getSessionElements(session_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_id }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/lab/session/element/list`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para adicionar um elemento a uma sessão:
async function addElement(session_id, session_element) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_id, session_element }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/lab/session/element/add`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para remover um elemento de uma sessão:
async function removeElement(session_id, session_element) {
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_id, session_element }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/lab/session/element/remove`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar o nome de um elemento:

async function editName(element_id, element_name) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_name }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/element/edit/name`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar a quantidade de um elemento:
async function editQuantity(element_id, element_quantity) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_quantity }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/element/edit/quantity`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar a descrição de um elemento:
async function editDescription(element_id, element_description) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_description }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/element/edit/description`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function editMolarMass(element_id, element_molarMass) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_molarMass }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/element/edit/molarMass`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function editCASNumber(element_id, element_casNumber) {
  /* 
  const options = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/10.2.0',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzE1NzUzNSwiZXhwIjoxNzMzMjQzOTM1fQ.Wb-Cvp_VgLXC81j_KqRNAduzsy-nbJnm_AcOC73FnW0'
  },
  body: '{"element_id":1,"element_casNumber":"7732-18-6"}'
};

fetch('http://localhost:3333/element/edit/cas', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err)); */

  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_casNumber }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/element/edit/cas`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function editECNumber(element_id, element_ecNumber) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_ecNumber }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/element/edit/ec`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function editPhysicalState(element_id, element_physicalState) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_physicalState }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/element/edit/physicalState`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

async function editImage(element_id, element_image) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_image }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/element/edit/image`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar o nível de supervisão de um elemento:
async function EditValidity(element_id, element_validity) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_validity }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/element/edit/validity`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar o nível de supervisão de um elemento:
async function EditSupervisorLevel(element_id, element_supervisorLevel) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id, element_supervisorLevel }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/element/edit/supervisor`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para registrar um elemento:
async function RegisterElement(
  element_name,
  element_quantity,
  element_description,
  element_molarMass,
  element_casNumber,
  element_ecNumber,
  element_physicalState,
  element_image,
  element_validity,
  element_supervisorLevel,
  element_labId
) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      element_name,
      element_quantity,
      element_description,
      element_molarMass,
      element_casNumber,
      element_ecNumber,
      element_physicalState,
      element_image,
      element_validity,
      element_supervisorLevel,
      element_labId,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/element/register`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function DeleteElement(element_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ element_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/element/remove`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

export {
  getElementById,
  getLabElements,
  getSessionElements,
  addElement,
  removeElement,
  editName,
  editQuantity,
  editDescription,
  editMolarMass,
  editCASNumber,
  editECNumber,
  editPhysicalState,
  editImage,
  EditValidity,
  EditSupervisorLevel,
  RegisterElement,
  DeleteElement,
};

// O==========================================================================O
