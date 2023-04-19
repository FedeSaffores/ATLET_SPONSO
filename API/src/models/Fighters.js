const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Fighters",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      instagram: {
        type: DataTypes.TEXT,
      },
      tel: {
        type: DataTypes.BIGINT,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        validate: { min: 1, max: 5 },
      },
      price: {
        type: DataTypes.FLOAT,
      },
      quality: {
        type: DataTypes.ENUM(["amateur", "profesional"]),
        defaultValue: "amateur",
        validate: {
          isIn: {
            args: [["amateur", "profesional"]],
            msg: "You must decide if amateur or profesional only",
          },
        },
        defaultValue: "amateur",
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING,
      },
      isReview: {
        type: DataTypes.BOOLEAN,
      },
      promedio: {
        type: DataTypes.STRING,
        defaultValue: 0,
        validate: { min: 0, max: 5 },
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
