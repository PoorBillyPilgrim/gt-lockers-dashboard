const express = require('express')
// const mysql = require('mysql2/promise')
const config = require('./config.js')

const cors = require('cors')
const helmet = require('helmet')


const app = express()
const port = config.port || 4000

app.use(cors())
app.use(helmet())

// initialize pool
// const pool = mysql.createPool(config.db)
const pool = require('./database.js')

/*const handleError = (err, res) => {
	res.status(300).json({'error':'sorry, a query error has occurred'})
	console.error(err)
}*/


// routes
app.use('/lockers', require('./routes/lockersRouter.js'))

app.listen(port, () => {
  console.log(`########################\nserver listening on ${port}\n########################`)
})
