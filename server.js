const express = require('express')
const mysql = require('mysql2')
const config = require('./config.js')

const cors = require('cors')
const helmet = require('helmet')

const app = express()
const port = config.port || 4000

app.use(cors())
app.use(helmet())

const pool = mysql.createPool(config.db)

app.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) console.error(err)
    connection.query('SELECT * ', (err, results, fields) => {
      if (err) {
				res.status(300).json({'error':'sorry, an error has occured'})
				console.error(err)
			}
      res.status(200).send(results)
    })
    connection.release()
  })
})

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
