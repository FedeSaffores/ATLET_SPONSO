const { Sponsors } = require("../db.js");
const { Op } = require("sequelize");

const JsonSponsors = [
  {
    name: "coca123",
    email: "cocacola@gmail.com",
    companyName: "cocacola",
    description: "produccion de gaseosas",
    password: "123213",
    isActive: true,
    score: 2,
    isReview: true,
    promedio: 3,
  },
];

const getAllSponsor = async (companyName) => {
  if ((await Sponsors.count()) === 0) {
    await Sponsors.bulckCreate(JsonSponsors);
  }
  console.log(companyName);
  if (!companyName) {
    return await Sponsors.findAll({});
  } else {
    return await Sponsors.finAll({
      where: {
        companyName: {
          [Op.iLike]: `%${companyName}%`,
        },
      },
    });
  }
};
const getSponsorsByPk = async (id) => {
  if (id) {
    let spon = await Sponsors.findOne({
      where: {
        id,
      },
    });
    if (!spon) {
      throw new Error("Sponsors not found");
    }
    return spon;
  } else {
    throw new Error("Sponsors not found");
  }
};
const deleteSponsor = async (id) => {
  await Sponsors.destroy({
    where: { id },
  });
  return `User id:${id} deleted sucessfully`;
};

async function editSponsors(id, data) {
  try {
    let sponsor = await Sponsors.findByPk(Number(id));
    await Sponsors.update(data);
    await Sponsors.save();
  } catch (error) {
    console.log(error);
    throw new Error(
      "El elemento a editar no existe o los parámetros no son válidos"
    );
  }
}

module.exports = {
  getAllSponsor,
  getSponsorsByPk,
  deleteSponsor,
  editSponsors,
};
