// O==========================================================================O

// Função para pegar todos os campus:
async function getAllCampus() {
  try {
    const response = await fetch("http://localhost:3333/campus/list");
    const data = await response.json();

    return data;
  } catch (err) {
    return false;
  }
}

// O==========================================================================O

export { getAllCampus };

// O==========================================================================O
