const path = require('path')
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./db/config')
require('dotenv').config()

const app = express()

dbConnection()

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())

app.get('/', (req, res) => res.send('<h1>Root</h1>'))

app.use('/api/auth', require('./routes/auth'))

app.get('*', (req, res) => res.redirect('/'))

const { env } = process
const PORT = env.PORT || env.DEV_PORT
app.listen(PORT, () =>
  console.log(`Listening on port ${env.PORT || env.DEV_PORT}!`)
)
