const { Router } = require("express");
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const multer = require("multer");

//const { Comentario, Fighters } = require("../db");
const { newFighters } = require("../controllers/createNewFighters.js");
const { newSponsors } = require("../controllers/createNewSponsors.js");
//const { getFightersByPk } = require("../controllers/getAllFighters.js");
//const {}
const userService = require("../meddlewares/users");
const fighterControllers = require("../meddlewares/fighthers");
const sponsorsControllers = require("../meddlewares/sponsors");
const userControllers = require("../controllers/autentController.js");
//const fighterControllers = require("../controllers/getAllFighters.js");
//const meddlewaresnewFighter = require("../meddlewares/createFighters");

/* router.get("/", (req, res) => {
  console.log("entro aca");
  res.send("carro");
}); */
const router = Router();
// Configuración de multer para guardar la imagen en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Files/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(
  "/fighters",
  /*  passport.authenticate("jwt", { session: false }), */
  fighterControllers
  //)
);

router.use("/:idFighter", fighterControllers);
router.post(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userControllers.register
);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userService
);
router.post("/login", userControllers.login);
router.use("/sponsor", sponsorsControllers);
router.post("/newFighter", upload.single("image"), newFighters);
router.post("/newSponsor", newSponsors);

module.exports = router;
