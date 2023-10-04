const { Router } = require("express");

const { getAllComments, getComentarioFighter, deleteComent } = require("../controllers/getAllComments.js");

const router = Router();
router.get("/", async (req, res) => {
  try {
    const eventName = req.query.eventName;
    const allComments = await getAllComments(eventName);
    res.status(200).json(allComments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});
router.get("/:FighterId", async (req, res) => {
  try {
    const fighterId = req.params.FighterId;
    const comments = await getComentarioFighter(fighterId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
