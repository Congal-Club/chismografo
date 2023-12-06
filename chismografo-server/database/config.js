const mongoose = require('mongoose')
const { Sequelize } = require('sequelize')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log('DB online')
  } catch (error) {
    console.log(error)
    throw new Error('Error en la base de datos - vea logs')
  }
}

const dbReplication = new Sequelize('chismografo', 'postgres', '1234', {
  host: '192.168.39.17',
  dialect: 'postgres',
  port: 5432,
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  }
})

module.exports = {
  dbConnection,
  dbReplication
}
