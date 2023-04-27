const { DataTypes } = require("sequelize");
(module.exports = (sequelize) => {
  sequelize.define("Comentario", {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [2, 500],
          msg: "The messege can only have 500 caracteres",
        },
      },
    },
  });
}),
  {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
  };
