// O==========================================================================O

// API ADDRESS:
const API_ADDRESS = "http://localhost:3333";

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

export { getLabElements, getSessionElements, addElement, removeElement };

// O==========================================================================O
