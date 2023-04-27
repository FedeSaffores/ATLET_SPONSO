const { Router } = require("express");

const { newComentario } = require("../controllers/createNewComment");

const router = Router();
router.get("/", async (req, res) => {
  try {
    const allComent = await newComentario(req.query);
    res.status(200).json(allComent);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
