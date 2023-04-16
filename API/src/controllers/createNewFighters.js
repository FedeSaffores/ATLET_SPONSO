const { Fighters } = require("../db");

const sequelize = require("sequelize");

const newFighters = async (req, res) => {
  /*  const files = req.files;
  console.log(files); */
  const {
    name,
    lastname,
    email,
    password,
    description,
    score,
    price,
    quality,
    stock,
    image,
    promedio,
    isReview,
    instergram,
  } = JSON.parse(req.body.data);
  /*   console.log(req.body);
  console.log(req.files); */
  console.log(JSON.parse(req.body.data));
  try {
    if (!email) {
      return res.json({ info: "Email required" });
    }
    const existe = await Fighters.findOne({ where: { email: email } });
    //console.log(existe);
    if (existe) return res.json({ info: "The Fighter already exists" });
    const fighter = await Fighters.create({
      name,
      lastname,
      email,
      password,
      description,
      score,
      price,
      quality,
      stock,
      image,
      promedio,
      isReview,
    });
    console.log(fighter);
    res.json({ info: "THE FIGHTER WAS SUCCESSFULLY CREATED" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ info: "FIGHTER WASN'T CREATED", error });
  }
};
module.exports = {
  newFighters,
};
