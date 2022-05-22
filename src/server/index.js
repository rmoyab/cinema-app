const path = require('path')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const publicPath = path.join(__dirname, '../..', 'dist')

const app = express()

app.use(cors())
app.use(express.static('dist'))

app.get('/', (req, res) => res.send('<h1>Root</h1>'))

app.use(require('./routes/helloExpress'))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html')),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
})

const { env } = process
const PORT = env.PORT || env.DEV_PORT
app.listen(PORT, () =>
  console.log(`Listening on port ${env.PORT || env.DEV_PORT}!`)
)
