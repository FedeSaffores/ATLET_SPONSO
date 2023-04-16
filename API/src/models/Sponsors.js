const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sponsors",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sponsorName: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        validate: { min: 1, max: 5 },
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
