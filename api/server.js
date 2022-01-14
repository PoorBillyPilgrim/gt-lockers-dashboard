const express = require('express')
const config = require('./config.js')
const {AppError, handleErrors} = require('./errors.js')

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
  let testErr = new Error('test error')
  testErr.statusCode = 404
  next(testErr)
})
app.get('*', (req, res, next) => {
  // change this to redirect to an error page
  
  let allErr = new Error('resource not found')
  allErr.statusCode = 301
  next(allErr)

})

// error handling is placed after routes have been set
// for error handling: https://scoutapm.com/blog/express-error-handling#h_625988582581619642987320
// log error
app.use((err, req, res, next) => {
  console.error('\x1b[31m', err) // adding some color to our logs
  next(new AppError(err.message, err.statusCode))
})
// send error response
app.use((err, req, res, next) => {
  handleErrors(err, res)
})

app.listen(port, () => {
  console.log(`########################\nserver listening on http://localhost:${port}\n########################`)
})
