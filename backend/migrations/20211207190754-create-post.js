"use strict";
module.exports = {
    up: async (queryInterface, DataType) => {
        await queryInterface.createTable("posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataType.INTEGER,
            },
            uuid: {
                type: DataType.UUID,
                allowNull: false,
            },

            userId: { type: DataType.INTEGER, allowNull: false },
            title: {
                allowNull: false,
                type: DataType.STRING,
            },
            content: { type: DataType.STRING, allowNull: false },
            imageUrl: { type: DataType.STRING, allowNull: true },
            createdAt: {
                allowNull: false,
                type: DataType.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataType.DATE,
            },
        });
    },
    down: async (queryInterface, DataType) => {
        await queryInterface.dropTable("Posts");
    },
};
