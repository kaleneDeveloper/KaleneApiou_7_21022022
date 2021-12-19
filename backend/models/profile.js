"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class profile extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    profile.init(
        {
            userId: { type: DataTypes.INTEGER, allowNull: false },
            userUuid: { type: DataTypes.STRING, allowNull: false },
            username: { type: DataTypes.STRING, allowNull: false },
            lastName: { type: DataTypes.STRING, allowNull: true },
            password: { type: DataTypes.STRING, allowNull: true },
            email: { type: DataTypes.STRING, allowNull: false },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:
                    "http://localhost:3000/images/uploads/profil/4e533874991ea469a1e791fa5c3f9754_1639244825986.jpg",
            },
            age: { type: DataTypes.INTEGER, allowNull: true },
        },
        {
            sequelize,
            modelName: "Profile",
            tableName: "profiles",
        }
    );
    return profile;
};
