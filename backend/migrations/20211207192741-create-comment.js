"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("comments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            uuid: {
                type: DataType.UUID,
                allowNull: false,
            },
            userId: { type: DataType.INTEGER, allowNull: false },
            postId: { type: DataType.INTEGER, allowNull: false },
            content: {
                type: Sequelize.STRING,
            },
            imageUrl: { type: Sequelize.STRING, allowNull: true },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Comments");
    },
};
