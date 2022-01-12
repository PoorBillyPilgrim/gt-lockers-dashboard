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
		try {
			const [rows] = await connection.execute('SELECT * FROM lockers WHERE floor = ?', [5])
			res.status(200).send(rows)
		} catch (err) {
			res.status(300).json({'error':'sorry, a query error has occurred'})
			console.error(err)
		} finally {
			connection.release()
		}
	} catch (err) {
		res.status(300).json({'error': 'sorry, a connection error has occurred'})
		console.error(err)
	}
})

app.listen(port, () => {
  console.log(`########################\nserver listening on ${port}\n########################`)
})
