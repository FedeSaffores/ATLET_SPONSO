const { Comentario } = require("../db");
const { Op } = require("sequelize");

const eventJson = [
  {
    eventName: "",
    date: "",
    texto: "",
  },
];

const getAllComments = async (eventName) => {
  if ((await Comentario.count()) === 0) {
    await Comentario.bulkCreate(eventJson);
  }
  if (!eventName) {
    return await Comentario.findAll({});
  } else {
    return await Comentario.findAll({
      where: {
        eventName: {
          [Op.iLike]: `%${eventName}%`,
        },
      },
    });
  }
};

const getEventByPK = async (id) => {
  if (id) {
    let event = await Comentario.findOne({
      where: {
        id,
      },
    });
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  } else {
    throw new Error("Event not found");
  }
};

const deleteEvent = async (id) => {
  await Comentario.destroy({
    where: { id },
  });
  return `User id:${id} deleted sucessfully`;
};

module.exports = {
  getAllComments,
  getEventByPK,
  deleteEvent,
};
