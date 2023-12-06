const { Schema, model } = require('mongoose')
const { DataTypes } = require('sequelize')

const { dbReplication } = require('../database/config')

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false
  }
})

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})

const Usuario = model('Usuario', UsuarioSchema)

const UsuarioReplication = dbReplication.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  online: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {})

module.exports = {
  Usuario,
  UsuarioReplication
}
