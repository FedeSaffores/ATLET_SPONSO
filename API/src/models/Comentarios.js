const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Comentarios",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        reseña: {
          type: DataTypes.ENUM("MALO", "BUENO", "MUY BUENO", "EXELENTE"),
        },
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
