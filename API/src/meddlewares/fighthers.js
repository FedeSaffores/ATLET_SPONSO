const { Router } = require("express");

const {
  getAllFighters,
  getFightersByPk,
  getFighterByEmail,
} = require("../controllers/getAllFighters.js");

const router = Router();

router.get("/myfighter", async (req, res) => {
  if (req.fighter) {
    return res.status(200).send(req.fighter);
  }
  return res.status(404).send("It isen't log");
});

router.get("/", async (req, res) => {
  try {
    const allFight = await getAllFighters(req.query.name);
    res.status(200).json(allFight);
    console.log(allFight);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/:idFighter", async (req, res) => {
  try {
    const { idFighter } = req.params;
    const fighter = await getFightersByPk(idFighter);

    res.status(200).json(fighter);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/log/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const userId = await getFighterByEmail(email);
    res.status(200).send(userId);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
