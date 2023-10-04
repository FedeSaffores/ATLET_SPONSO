const { Comentario } = require("../db");

const newComment = async (req, res) => {
  const { eventName, date, texto } = req.body;
  try {
    const findEvent = await Comentario.findOne({
      where: {
        eventName: eventName,
      },
    });
    if (!findEvent) {
      const AddEvent = await Comentario.create({
        eventName,
        date,
        texto,
        FighterId: req.user.FighterId,
      });
      res.json("THE COMMENT WAS SUCCESFULLY CREATED");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ info: "THE COMMENT WASN'T CREATED", error });
  }
};


module.exports = {
  newComment,
};
