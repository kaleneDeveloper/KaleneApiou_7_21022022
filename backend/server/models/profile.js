"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class profile extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "CASCADE",
            });
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
                    "http://localhost:3000/images/uploads/profiles/blank-profile.png",
            },
            age: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        },
        {
            sequelize,
            modelName: "Profile",
            tableName: "profiles",
        }
    );
    return profile;
};
