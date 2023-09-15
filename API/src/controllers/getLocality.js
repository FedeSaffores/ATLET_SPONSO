const axios = require("axios");
const apiUrl =
  "https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json";

async function fetchLocalities() {
  try {
    const response = (await axios.get(apiUrl)).data;
    const city = response.localidades.map((e) => {
      return {
        nombre: e.nombre,
        municipio: e.municipio.nombre,
        departamento: e.departamento.nombre,
        provincia: e.provincia.nombre,
        pais: "Argentina",
      };
    });
    return city;
  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
    throw error;
  }
}

async function getForName(name) {
  try {
    const searchTerm = name.toLowerCase();
    const dataName = await fetchLocalities();
    const filteredJson = dataName.filter((e) => {
      for (const key in e) {
        if (
          typeof e[key] === "string" &&
          e[key].toLowerCase().includes(searchTerm)
        ) {
          return true;
        }
      }
      return false;
    });
    return filteredJson;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
module.exports = {
  fetchLocalities,
  getForName,
};
