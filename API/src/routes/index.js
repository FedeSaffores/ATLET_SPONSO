const { Router } = require("express");
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const multer = require("multer");

const { newFighters } = require("../controllers/createNewFighters.js");
const { newSponsors } = require("../controllers/createNewSponsors.js");
const { newComment } = require("../controllers/createNewComment.js");

const userService = require("../meddlewares/users");
const fighterControllers = require("../meddlewares/fighthers");
const sponsorsControllers = require("../meddlewares/sponsors");
const userControllers = require("../controllers/autentController.js");
const autentController = require("../meddlewares/autent.js");
const eventController = require("../meddlewares/comment.js");

const uuid = require("uuid");
const moment = require("moment");
const path = require("path");
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
    const extencion = path.extname(file.originalname);
    const utc = moment().utc().format("YYYYMMDD-HHmmss");
    const newid = uuid.v4();
    cb(null, `${utc}-${newid}${extencion}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/user",
  /*    passport.authenticate("jwt", { session: false }),  */
  userControllers.register
);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userService
);
//router.post("/login", userControllers.login);

router.post(
  "/newFighter",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  newFighters
);
router.use(
  "/fighters",
  passport.authenticate("jwt", { session: false }),
  fighterControllers
);

router.use("/sponsor", sponsorsControllers);
router.post("/newSponsor", newSponsors);

router.use("/allcoments", eventController);
router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  newComment
);
router.use("/:idComments", eventController);

router.use("/", autentController);

router.use("/:idFighter", fighterControllers);

module.exports = router;
