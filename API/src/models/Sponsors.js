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
      companyName: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      completeName: {
        type: DataTypes.TEXT,

        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
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
