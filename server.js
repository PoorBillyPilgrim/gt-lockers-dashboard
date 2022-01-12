const express = require('express')
const mysql = require('mysql2/promise')
const config = require('./config.js')

const cors = require('cors')
const helmet = require('helmet')

const app = express()
const port = config.port || 4000

app.use(cors())
app.use(helmet())

app.get('/', async (req, res) => {
  
	try {
		const pool = await mysql.createPool(config.db)
		const connection = await pool.getConnection()
		const [rows] = await connection.execute('SELECT * FROM lockers WHERE floor = ?', [5])
		res.status(200).send(rows)
		await connection.release()
	} catch (err) {
		res.status(300).json({'error':'sorry, an error has occured'})
		console.error(err)
	}
	
	/*pool.getConnection((err, connection) => {
    if (err) console.error(err)
		// .execute creates a prepared statement
    connection.execute('SELECT * FROM lockers WHERE floor = ?', [5], (err, results) => {
      if (err) {
				res.status(300).json({'error':'sorry, an error has occured'})
				console.error(err)
			}
      res.status(200).send(results )
    })
    pool.releaseConnection(connection)
  })*/
})

app.listen(port, () => {
  console.log(`########################\nserver listening on ${port}\n########################`)
})
