const { DataTypes } = require("sequelize");
(module.exports = (sequelize) => {
  sequelize.define("Comentarios", {
    texto: {
      type: DataTypes.TEXT,
    },
  });
}),
  {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  };
