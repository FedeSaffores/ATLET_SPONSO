const { Router } = require("express");

const {
  getAllSponsor,
  getSponsorsByPk,
  deleteSponsor,
} = require("../controllers/getAllSponsors");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allSponsors = await getAllSponsor(req.query.companyName);
    res.status(200).json(allSponsors);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
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
router.delete("/:idSponsors", async (req, res) => {
  try {
    const { idSponsors } = req.params;
    await deleteSponsor(idSponsors);
    res.status(200).json({ msg: `Sponsor deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
