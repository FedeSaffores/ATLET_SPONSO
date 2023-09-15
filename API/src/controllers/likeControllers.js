const { Likes, User, Comentario } = require("../db");

// Funcion creadora de Likes
const createLike = async (req, res) => {
  const { userId, comentarioId } = req.body;
  try {
    const usuario = await User.findByPk(userId);
    const comentario = await Comentario.findByPk(comentarioId);

    if (!usuario || !comentario) {
      return res
        .status(404)
        .json({ error: "Usuario o comentario no encontrado" });
    }
    const nuevoLike = await Likes.create({
      UserId: userId,
      ComentarioId: comentarioId,
    });
    await usuario.addComentario(comentario, { through: nuevoLike });
    res.status(201).json({ mensaje: "Like creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al crear el like" });
  }
};

//Funcion para borrar Likes

const deleteLike = async (req, res) => {
  const { userId, comentarioId } = req.params;
  try {
    const usuario = await User.findByPk(userId);
    const comentario = await Comentario.findByPk(comentarioId);

    if (!usuario || !comentario) {
      return res
        .status(404)
        .json({ error: "Usuario o comentario no encontrado" });
    }

    const like = await Likes.findOne({
      where: {
        UserId: userId,
        ComentarioId: comentarioId,
      },
    });

    if (!like) {
      return res.status(404).json({ error: "Like no encontrado" });
    }

    await like.destroy();

    res.status(200).json({ mensaje: "Like eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al eliminar el like" });
  }
};

//Function trae todos los likes por usuario
const getAllLikesByUserId = async (req, res) => {
  const { userId } = req.params; // Suponiendo que el userId se pasa como un parámetro en la URL
  if (!userId) {
    return res
      .status(400)
      .json({ error: "El ID del usuario no está definido" });
  }
  try {
    const usuario = await User.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const likes = await Likes.findAll({
      where: {
        UserId: userId,
      },
    });

    res.status(200).json({ likes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los likes del usuario" });
  }
};

//Funcion que trae todos los likes por evento.

const getLikesForComment = async (req, res) => {
  const { comentarioId } = req.params; // Obtiene el comentarioId de los parámetros de la solicitud
  try {
    const likesCount = await Likes.count({
      where: {
        ComentarioId: comentarioId,
      },
    });
    res.status(200).json({ likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener la cantidad de likes para el comentario",
    });
  }
};

module.exports = {
  createLike,
  deleteLike,
  getAllLikesByUserId,
  getLikesForComment,
};
