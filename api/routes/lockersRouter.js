const express = require('express')
const router = express.Router()
const pool = require('../database.js')

router.get('/', async (req, res) => {
  // move all this to controlers/
  try {
    const [rows] = await pool.query('SELECT * FROM lockers')
    res.status(200).send(rows)
  } catch (err) {
    // handleError(err, res)
    console.error(err)
  }
})

router.get('/:lockerGroup', async (req, res) => {
  const sql = 'SELECT * FROM lockers WHERE locker_group = ?'
  try {
    const [rows] = await pool.query(sql, [req.params.lockerGroup])
    res.status(200).send(rows)
  } catch (err) {
    // handleError(err, res)
    console.error(err)
  }
})

router.get('/floors/:floor', async (req, res) => {
  const sql = 'SELECT * FROM lockers WHERE floor = ?'
  try {
    const [rows] = await pool.query(sql, [req.params.floor])
    if (rows) { res.status(200).send(rows) }
  } catch (err) {
    handleError(err, res)
  }
})

module.exports = router
