const { Router } = require("express");

const { getAllComments } = require("../controllers/getAllComments.js");

const router = Router();
router.get("/", async (req, res) => {
  try {
    const allComent = await getAllComments(req.query.eventName);
    res.status(200).json(allComent);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
router.get("/:idComments", async (req, res) => {
  try {
    const allComent = await getEventByPK(idComments);
    res.status(200).json(allComent);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
