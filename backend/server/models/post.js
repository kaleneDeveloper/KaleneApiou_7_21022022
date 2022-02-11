"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
            this.hasMany(models.Comment, {
                foreignKey: "postId",
                as: "comments",
            });
        }
    }
    Post.init(
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: uuidv4,
            },
            title: { type: DataTypes.STRING(48), allowNull: false },
            content: { type: DataTypes.STRING, allowNull: false },
            imageUrl: { type: DataTypes.STRING(3000), allowNull: true },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "posts",
            modelName: "Post",
        }
    );
    return Post;
};
