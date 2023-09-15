const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Likes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    likeDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    ComentarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Comentarios",
        key: "id",
      },
    },
  });
};
