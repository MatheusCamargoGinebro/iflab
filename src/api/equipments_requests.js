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

// Função para obter um equipamento pelo ID:
async function getEquipmentById(equipment_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/equipment/list/specific`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar o nome de um equipamento:
async function editName(equipment_id, equipment_name) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id, equipment_name }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/equipment/edit/name`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar a descrição de um equipamento:
async function editDescription(equipment_id, equipment_description) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id, equipment_description }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/equipment/edit/description`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar a quantidade de um equipamento:
async function editQuantity(equipment_id, equipment_totalQuantity) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id, equipment_totalQuantity }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/equipment/edit/quantity`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

// Função para editar a qualidade de um equipamento:
async function editQuality(equipment_id, equipment_quality) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id, equipment_quality }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/equipment/edit/quality`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function editImage(equipment_id, equipment_image) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id, equipment_image }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/equipment/edit/image`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function editSupervisorLevel(equipment_id, equipment_supervisorLevel) {
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id, equipment_supervisorLevel }),
  };

  try {
    const response = await fetch(
      `${API_ADDRESS}/equipment/edit/supervisor`,
      options
    );
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function registerEquipment(
  equipment_name,
  equipment_description,
  equipment_totalQuantity,
  equipment_quality,
  equipment_image,
  equipment_supervisorLevel,
  equipment_labId
) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      equipment_name,
      equipment_description,
      equipment_totalQuantity,
      equipment_quality,
      equipment_image,
      equipment_supervisorLevel,
      equipment_labId,
    }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/equipment/register`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

async function RemoveEquipment(equipment_id) {
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ equipment_id }),
  };

  try {
    const response = await fetch(`${API_ADDRESS}/equipment/remove`, options);
    const data = await response.json();

    return data;
  } catch (err) {
    return { status: false, message: err };
  }
}

// O==========================================================================O

export {
  getLabEquipments,
  getSessionEquipments,
  addEquipment,
  getEquipmentById,
  editName,
  editDescription,
  editQuantity,
  editQuality,
  editImage,
  editSupervisorLevel,
  registerEquipment,
  RemoveEquipment,
};

// O==========================================================================O
