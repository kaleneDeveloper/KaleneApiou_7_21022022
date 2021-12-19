"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            this.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
            this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
        }
        toJSON() {
            const values = Object.assign({}, this.get());
            delete values.id;
            delete values.userId;
            delete values.postId;
            return values;
        }
    }
    Comment.init(
        {
            content: { type: DataTypes.STRING, allowNull: false },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: uuidv4,
            },
            imageUrl: { type: DataTypes.STRING, allowNull: true },
        },
        {
            sequelize,
            tableName: "comments",
            modelName: "Comment",
        }
    );
    return Comment;
};
