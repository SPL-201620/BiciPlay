/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude;
    return sequelize.define("RespuestaPregunta", {
        calificacion: {
            type: DataTypes.DECIMAL(8,4),
            field: 'calificacion',
            allowNull: true,
            primaryKey: false
        },
        retroalimentacion: {
            type: DataTypes.STRING(2500),
            field: 'retroalimentacion',
            allowNull: true,
            primaryKey: false
        },
        texto: {
            type: DataTypes.TEXT(),
            field: 'respuesta',
            allowNull: true
        }
    }, {
        tableName: 'respuesta_pregunta',
        timestamps: false,
        classMethods: {
            associate: function(db) {

            },
        }
    });
};
