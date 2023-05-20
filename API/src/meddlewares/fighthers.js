const { Router } = require("express");

const {
  getAllFighters,
  getFightersByPk,
  getFighterByEmail,
  deleteFighter,
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
    const allFight = await getAllFighters(req.query.completeName);

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
router.delete("/:idFighter", async (req, res) => {
  console.log("aaaaaa");
  try {
    const { idFighter } = req.params;
    await deleteFighter(idFighter);
    res.status(200).json({ msg: `Fighter deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const data = req.body;
  const { id: id } = req.params;
  try {
    await editUser(id, data);
    res.send("La reserva se edito exitosamente");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
