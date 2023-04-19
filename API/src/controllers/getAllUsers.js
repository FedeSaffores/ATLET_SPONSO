const { User } = require("../db");
const { Op } = require("sequelize");

const userJson = [
  {
    name: "Federico",
    lastname: "Saffores",
    email: "federico@gmail.com",
    password: "12345678",
    address: "AlberdiN!123",
    tel: 12345678,
    isAdmin: true,
    isActive: true,
  },
];

const getAllUsers = async (name) => {
  if ((await User.count()) === 0) {
    await User.bulkCreate(userJson);
  }
  if (!name) {
    return await User.findAll({});
  } else {
    return await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getUserByPK = async (id) => {
  if (id) {
    let user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } else {
    throw new Error("User not found");
  }
};

const getUserByEmail = async (email) => {
  if (email) {
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } else {
    throw new Error("User not found");
  }
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
  return `User id:${id} deleted sucessfully`;
};

async function editUser(id, data) {
  try {
    let user = await User.findByPk(Number(id));
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
  getAllUsers,
  getUserByPK,
  getUserByEmail,
  deleteUser,
  editUser,
  //getUserByUsername
};
