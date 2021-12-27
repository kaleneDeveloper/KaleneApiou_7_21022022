"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            this.hasMany(models.Comment, {
                foreignKey: "postId",
            });
            this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
            this.hasMany(models.Comment, {
                foreignKey: "postId",
                as: "comments",
            });
        }
        toJSON() {
            const values = Object.assign({}, this.get());
            delete values.id;
            delete values.userId;
            return values;
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
            imageUrl: { type: DataTypes.STRING, allowNull: true },
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
