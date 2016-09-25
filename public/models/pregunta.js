/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude;
    return sequelize.define("Pregunta", {
        enunciado: {
            type: DataTypes.STRING(2500),
            field: 'enunciado',
            allowNull: false,
            primaryKey: false
        },
        numero: {
            type: DataTypes.INTEGER(),
            field: 'numero',
            allowNull: false,
            primaryKey: true
        },
        peso: {
            type: DataTypes.DECIMAL(4,2),
            field: 'peso',
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING(20),
            field: 'estado',
            allowNull: true
        }

    }, {
        tableName: 'pregunta',
        timestamps: false,
        classMethods: {
            associate: function(db) {

            },
        }
    });
};
