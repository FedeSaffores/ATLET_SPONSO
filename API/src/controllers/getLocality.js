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
  const searchTerm = name.toLowerCase();
  console.log(searchTerm);
  const dataName = await fetchLocalities();
  console.log(dataName);
  const filteredJson = dataName.filter((e) => {
    const lowerCaseFields = [
      e.nombre.toLowerCase() ||
        e.municipio.toLowerCase() ||
        e.departamento.toLowerCase() ||
        e.provincia.toLowerCase(),
    ];

    return lowerCaseFields.some((field) => field.includes(searchTerm));
  });
  return filteredJson;
}

module.exports = {
  fetchLocalities,
  getForName,
};
