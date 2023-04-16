const { Router } = require("express");

const { newFighters } = require("../controllers/createNewFighters");

/* const router = Router();

router.post("/", async (req, res) => {
  try {
    const createFighter = await newFighters(req.body);
    res.status(200).json(createFighter);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

module.exports = router; */
