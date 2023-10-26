const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');


const usuario = sequelize.define('usuario', {
    
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    nombre: {
    type: DataTypes.STRING(255),
 
    },
    passw: {
    type: DataTypes.STRING(255),
    },
}, {
    tableName: 'usuario',
    timestamps: false,
    freezeTableName: true,
});

module.exports = usuario;