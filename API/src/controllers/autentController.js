const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { promisify } = require("util");
const { User } = require("../db");

exports.register = async (req, res) => {
  const { completeName, email, password, address, tel, isAdmin } = req.body;
  console.log(completeName, email, password);
  if (!completeName || !email || !password || !email) {
    return res.status(404).send("You must complete all the files");
  }
  try {
    const dbSearch = await User.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (!dbSearch.length) {
      const newHash = await bcryptjs.hash(req.body.password, 8);
      const token = jwt.sign({ email: req.body.email }, "userKey");
      const user = await User.create({
        completeName: req.body.completeName,
        password: newHash,
        email: req.body.email,
        confirmationCode: token,
        address: req.body.address,
        tel: req.body.tel,
        isActive: req.body.isActive,
        isAdmin: req.body.isAdmin,
      });
      //sendEmail(user.name, user.email, user.confirmationCode);
      return res.status(200).json(user);
    } else {
      return res.status(302).json(dbSearch);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.verifyUser = (req, res, next) => {
  let decode;
  try {
    decode = jwt.verify(req.params.confirmationCode, "userKey");
  } catch (error) {
    return res.status(404).send(error);
  }

  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      user.isActive = true;
      user.save((err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
      });
      return res.status(200).send("confirm");
    })
    .catch((e) => console.log("error", e));
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      return res.status(404).send("Debe completar todos los campos");
    }
    const findUser = await User.findOne({
      where: { email },
    });
    if (
      User === null ||
      !(await bcryptjs.compare(password, findUser.password))
    ) {
      console.log("Invalide password and email");
      return res.status(404).send("Invalide password and email");
    }
    if (!findUser.isActive) {
      console.log("The user is not active");
      return res.status(401).send("Comunicate whit Tecnic soport");
    }
    const id = findUser.id;
    const token = jwt.sign({ id: id }, "userKey");

    return res.json({
      msg: "User log",
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.protectedRoute = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      user: {
        id: req.user.id,
        user: req.user.completeName,
      },
    });
  } catch (error) {
    res.send(error);
  }
};
