const express = require('express')
const config = require('./config.js')
const { sendErrorRes, logError } = require('./errors.js')

const cors = require('cors')
const helmet = require('helmet')

const app = express()
const port = config.port || 4000

// security
app.use(cors())
app.use(helmet())

// routes
app.get('/', (req, res, next) => {
  res.status(301).redirect('/lockers')
})
app.use('/lockers', require('./routes/lockers.js'))
app.get('/test-error', (req, res, next) => {
  const testErr = new Error('test error')
  testErr.statusCode = 404
  next(testErr)
})
app.get('*', (req, res, next) => {
  // change this to redirect to an error page

  const allErr = new Error('resource not found')
  allErr.statusCode = 301
  next(allErr)
})

// error handling is placed after routes have been set
// for error handling: https://scoutapm.com/blog/express-error-handling#h_625988582581619642987320
// log and send error
app.use(logError)
app.use(sendErrorRes)

app.listen(port, () => {
  console.log(`\nServer listening on http://localhost:${port}\n`)
})
