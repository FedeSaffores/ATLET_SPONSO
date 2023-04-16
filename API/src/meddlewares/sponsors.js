const { Router } = require("express");

const {
  getAllSponsor,
  getSponsorsByPk,
} = require("../controllers/getAllSponsors");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allSponsors = await getAllSponsor(req.query.name);
    res.status(200).json(allSponsors);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.get("/id", async (req, res) => {
  try {
    const { id } = req.params;
    const sponsor = await getSponsorsByPk(id);

    res.status(200).json(sponsor);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
