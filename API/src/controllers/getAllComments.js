const { Comentario, Fighters } = require("../db");
const { Op } = require("sequelize");

const eventJson = [
  {
    eventName: "",
    date: new Date(),
    texto: "",
  },
];

const getAllComments = async (eventName) => {
  if ((await Comentario.count()) === 0) {
    await Comentario.bulkCreate(eventJson);
  }
  if (!eventName) {
    return await Comentario.findAll({
      //include
      include: [
        {
          model: Fighters,
          attributes: ["completeName", "image"],
        },
      ],
    });
  } else {
    return await Comentario.findAll({
      where: {
        eventName: {
          [Op.iLike]: `%${eventName}%`,
        },
      },
      include: [
        {
          model: Fighters,
          attributes: ["completeName", "image"],
        },
      ],
      //include
    });
  }
};


const getComentarioFighter = async (FighterId)=>{
  console.log(FighterId)
   try {
        const comments = await Comentario.findAll({
          where: {
            FighterId: FighterId,
          },
        });
        return comments;
    } catch (error) {
      console.error('Error al buscar comentarios:', error);
      throw error;
    } 
  }
  const deleteComent = async (req, res) => {  
    console.log(req)
    const {commentId} = req.params;
    try {
      const comentario = await Comentario.findOne({
        where: {
          id: commentId,
        },
      });
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado ' });
      }
      await comentario.destroy();
      res.status(200).json({ message: 'Comentario eliminado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
  }

module.exports = {
  getAllComments,
  deleteComent,
  getComentarioFighter ,


};
