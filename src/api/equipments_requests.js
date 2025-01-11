// O==========================================================================O

// API ADDRESS:
const API_ADDRESS = "http://localhost:3333";

// O==========================================================================O

// Função para obter os equipamentos de um laboratório:
async function getLabEquipments(lab_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_labId: lab_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/equipment/list`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para obter os equipamentos de uma sessão:
async function getSessionEquipments(session_id) {
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
      `${API_ADDRESS}/lab/session/equipment/list`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function addEquipment(session_id, session_equipment) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ session_id, session_equipment }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/lab/session/equipment/add`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

export { getLabEquipments, getSessionEquipments, addEquipment };

// O==========================================================================O
