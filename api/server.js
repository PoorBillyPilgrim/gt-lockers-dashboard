const express = require('express')
const config = require('./config.js')

const cors = require('cors')
const helmet = require('helmet')

const app = express()
const port = config.port || 4000

app.use(cors())
app.use(helmet())

// routes
app.use('/lockers', require('./routes/lockersRouter.js'))

app.listen(port, () => {
  console.log(`########################\nserver listening on ${port}\n########################`)
})
