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
      completeName: {
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
        allowNull: false,
      },
      tel: {
        type: DataTypes.BIGINT,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.ENUM([
          "KICK BOXER",
          "BOXER",
          "JIU JITSU FIGHTER",
          "MMA FIGHTER",
          "ATHLETICS",
          "JUDO",
          "OTHERS",
        ]),
        defaultValue: "JIU JITSU FIGHTE",
        validate: {
          isIn: {
            args: [
              [
                "KICK BOXER",
                "BOXER",
                "JIU JITSU FIGHTER",
                "MMA FIGHTER",
                "ATHLETICS",
                "JUDO",
                "OTHERS",
              ],
            ],
            msg: "You must decide for one SPORT",
          },
        },
        defaultValue: "JIU JITSU FIGHTER",

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
        type: DataTypes.ENUM(["Beginner", "Amateur", "Professional"]),
        defaultValue: "Beginner",
        validate: {
          isIn: {
            args: [["Beginner", "Amateur", "Professional"]],
            msg: "You must decide if amateur or profesional only",
          },
        },
        defaultValue: "Beginner",
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
