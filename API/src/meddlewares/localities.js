const { Router } = require("express");
const router = Router();
const { fetchLocalities, getForName } = require("../controllers/getLocality");

router.get("/", async (req, res) => {
  try {
    const localities = await fetchLocalities();
    res.status(200).send(localities);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/name", async (req, res) => {
  try {
    const name = req.query.name;
    const filteredLocalities = await getForName(name);
    res.status(200).send(filteredLocalities);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
