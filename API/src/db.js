require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

let sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fedeproyect`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const ModelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    ModelDefiners.push(require(path.join(__dirname, "models", file)));
  });

ModelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const { Fighters, User, Comentario, Sponsors, Likes } = sequelize.models;

//Relación con usuario
User.belongsTo(Fighters, { through: "User_Fighters" });
User.belongsTo(Sponsors, { through: "User_Sponsors" });

//Relacion Peleadores con comentarios
Fighters.belongsToMany(Comentario, { through: "Fighters_Comentarios" });
Comentario.belongsTo(Fighters, { through: "Fighters_Comentarios" });

//Relacion Peleadores con Sponsors
Fighters.belongsToMany(Sponsors, { through: "Fighters_Sponsors" });
Sponsors.belongsToMany(Fighters, { through: "Fighters_Sponsors" });

//Relacion entre Likes y Usuarios
User.belongsToMany(Comentario, { through: Likes });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
