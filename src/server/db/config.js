const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN)
    console.log('DB Ready')
  } catch (error) {
    console.log('error::::::', error)
    // throw new Error('Database error')
  }
}

module.exports = { dbConnection }
