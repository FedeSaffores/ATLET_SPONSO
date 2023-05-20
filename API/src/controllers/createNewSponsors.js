const { Sponsors } = require("../db");

const sequelize = require("sequelize");

const newSponsors = async (req, res) => {
  const files = req.files;
  console.log(files);
  const {
    completeName,
    email,
    companyName,
    score,
    isActive,
    description,
    image,
    promedio,
    isReview,
  } = req.body;
  console.log(req.body);
  try {
    if (!email) {
      return res.json({ info: "Email required" });
    }
    const existe = await Sponsors.findOne({ where: { email: email } });
    //console.log(existe);
    if (existe) return res.json({ info: "The Sponsor already exists" });
    const sponsor = await Sponsors.create({
      completeName,
      email,
      companyName,
      score,
      isActive,
      description,
      image,
      promedio,
      isReview,
    });
    //console.log(sponsor);
    res.json({ info: "THE SPONSOR WAS SUCCESSFULLY CREATED" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ info: "SPONSOR WASN'T CREATED", error });
  }
};
module.exports = {
  newSponsors,
};
