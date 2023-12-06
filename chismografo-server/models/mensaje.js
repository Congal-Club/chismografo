const { Schema, model } = require('mongoose')
const { DataTypes, Sequelize } = require('sequelize')

const { dbReplication } = require('../database/config')

const MensajeSchema = Schema({
  de: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  para: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  mensaje: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

MensajeSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject()
  return object
})

const Mensaje = model('Mensaje', MensajeSchema)

const MensajeReplication = dbReplication.define('mensajes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  de: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    },
  },
  para: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  mensaje: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAd: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAd: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {})

module.exports = {
  Mensaje,
  MensajeReplication
}
