const express = require('express')
const router = express.Router()
const pool = require('../database.js')

router.get('/', async (req, res) =>{
    // move all this to controlers/
    try {
		const [rows] = await pool.query('SELECT * FROM lockers')
		res.status(200).send(rows)
	} catch(err) {
		// handleError(err, res)
        console.error(err)
	}
})

module.exports = router