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

export { getLabEquipments };

// O==========================================================================O
