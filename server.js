const express = require('express')
const mysql = require('mysql2/promise')
const config = require('./config.js')

const cors = require('cors')
const helmet = require('helmet')


const app = express()
const port = config.port || 4000

app.use(cors())
app.use(helmet())

// initialize pool
const pool = mysql.createPool(config.db)


const handleError = (err, res) => {
	res.status(300).json({'error':'sorry, a query error has occurred'})
	console.error(err)
}

let sql = 'Select * FROM lockers'


app.get('/lockers', async (req, res) => {

	try {
		const [rows] = await pool.query(selectAll)
		res.status(200).send(rows)
	} catch(err) {
		handleError(err, res)
	}
})

app.get('/lockers/floors/:floor', async (req, res) =>{
	sql += ' WHERE floor = ?'
	try {
		const [rows] = await pool.query(sql, [req.params.floor])
		res.status(200).send(rows)
	} catch (err) {
		handleError(err, res)
	}
})

app.get('/lockers/:group', async (req, res) => {
	sql += ' WHERE locker_group = ?'
	try {
		const [rows] = await pool.query(sql, [req.params.group])
		res.status(200).send(rows)
	} catch (err) {
		handleError(err, res)
	}
})

app.listen(port, () => {
  console.log(`########################\nserver listening on ${port}\n########################`)
})
