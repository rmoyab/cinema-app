const path = require('path')
const express = require('express')

require('dotenv').config()

const app = express()

app.use(express.static('dist'))

app.get('/', (req, res) => res.send('<h1>Root</h1>'))

app.use(require('./routes/helloExpress'))

const { env } = process
const PORT = env.PORT || env.DEV_PORT
app.listen(PORT, () =>
  console.log(`Listening on port ${env.PORT || env.DEV_PORT}!`)
)
