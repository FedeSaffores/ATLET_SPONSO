//const { Sequelize } = require("sequelize");
const { Fighters } = require("../db.js");
const { Op } = require("sequelize");

const JsonFighters = [
  {
    name: "Federico",
    lastname: "Saffores",
    email: "fede@gmail.com",
    instergram: "",
    description: "Jiu jitsu Fighter",
    score: 2,
    price: 150,
    quality: "profesional",
    stock: 1,
    image: "",
    promedio: 3,
    isReview: true,
  },
];

const getAllFighters = async (name) => {
  if ((await Fighters.count()) === 0) {
    await Fighters.bulkCreate(JsonFighters);
  }
  if (!name) {
    return await Fighters.findAll({});
  } else {
    return await Fighters.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getFightersByPk = async (idFighter) => {
  console.log(idFighter);
  if (idFighter) {
    let fight = await Fighters.findOne({
      where: {
        id,
      },
    });
    if (!fight) {
      throw new Error("Fighter not found");
    }
    return fight;
  } else {
    throw new Error("Fighter not found");
  }
};

const getFighterByEmail = async (email) => {
  if (email) {
    let fighter = await Fighters.findOne({
      where: {
        email,
      },
    });
    if (!fighter) {
      throw new Error("User not found");
    }
    return fighter;
  } else {
    throw new Error("User not found");
  }
};

const deleteFighter = async (id) => {
  await Fighters.destroy({
    where: { id },
  });
  return `User id:${id} deleted sucessfully`;
};

async function editFighter(id, data) {
  try {
    let user = await Fighters.findByPk(Number(id));
    await user.update(data);
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error(
      "El elemento a editar no existe o los parámetros no son válidos"
    );
  }
}

module.exports = {
  getAllFighters,
  getFightersByPk,
  getFighterByEmail,
  deleteFighter,
  editFighter,
};
