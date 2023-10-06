//const { Sequelize } = require("sequelize");
const { Fighters, Comentario } = require("../db.js");
const { Op } = require("sequelize");

const JsonFighters = [
  {
    completeName: "Federico Saffores",
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

const getAllFighters = async (completeName) => {
  if ((await Fighters.count()) === 0) {
    await Fighters.bulkCreate(JsonFighters);
  }
  if (!completeName) {
    return await Fighters.findAll({});
  } else {
    return await Fighters.findAll({
      where: {
        completeName: {
          [Op.iLike]: `%${completeName}%`,
        },
      },
    });
  }
};

const getFightersByPk = async (id) => {
  if (id) {
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

const deleteFighter = async (req, res) => {
  const {id} = req.params;
  try {
    const Fighter = await Fighters.findOne({
      where: {
        id: id,
      },
    });
    if (!Fighter) {
      return res.status(404).json({ error: 'Fighter not found ' });
    }
    const comments = await Comentario.findAll({
      where: {
        FighterId: id,
      },
    });
    await Promise.all(comments.map(async (comment) => {
      await comment.destroy();
    }));
    await Fighter.destroy();
    res.status(200).json({ message: 'Fighter delete succesfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error to delete' });
  }
}

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
