"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Post, {
                foreignKey: "userId",
            });
            this.hasMany(models.Comment, {
                foreignKey: "userId",
            });
            this.hasMany(models.Profile, {
                foreignKey: "userId",
                as: "profile",
            });
        }
    }
    User.init(
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: uuidv4,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Username is required" },
                    notEmpty: { msg: "Username is required" },
                    len: [3, 24],
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'email',
                validate: {
                    notNull: { msg: "Email is required" },
                    notEmpty: { msg: "Email is required" },
                    isEmail: true,
                }, 
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Password cannot be null" },
                    notEmpty: { msg: "Password cannot be null" },
                    min: 3,
                },
            },

            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: "users",
            modelName: "User",
        }
    );
    return User;
};
