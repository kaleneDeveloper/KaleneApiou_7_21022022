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
                type: Sequelize.UUID,
                allowNull: false,
            },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            postId: { type: Sequelize.INTEGER, allowNull: false },
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
