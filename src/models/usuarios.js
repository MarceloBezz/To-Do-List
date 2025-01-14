'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.hasMany(models.tarefas, {
        foreignKey: 'usuario_id',
        as: 'tarefas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  usuarios.init({
    nome: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    defaultScope:{
      attributes: {
        exclude: ['senha']
      }
    },
    scopes: {
      todasAsColunas: {
        attributes: {
          include: ['senha']
        }
      }
    }
  });
  return usuarios;
};