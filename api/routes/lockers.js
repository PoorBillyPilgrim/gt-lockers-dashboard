const express = require('express')
const router = express.Router()
const pool = require('../database.js')
const {getAll} = require('../controllers/queries.js')
const {AppError, catchAsyncErrors} = require('../errors.js')


router.get('/', catchAsyncErrors(getAll))

const isValidLockerGroup = (query) => {
  if (query === undefined || !['graduate', 'faculty', 'general'].includes(query.toLowerCase())) {
    return false
  }
  return true
}

const isValidLockerSize = (query) => {
  if (!['cubby', 'mid', 'full', ''].includes(query.toLowerCase())) {
    return false
  }
  return true
}


const getAvailableLocker = async (req, res, next) => {
  let sql = 'SELECT * FROM lockers WHERE locker_status="available" AND locker_group=?'
  const {locker_group, locker_size} = req.query
  sql += locker_size ? ' AND locker_size=? LIMIT 1' : 'LIMIT 1'
  
  try {
    if (!isValidLockerGroup(locker_group)) {
      throw new AppError('No valid group name was provided', 404)
    }
    if (!isValidLockerSize(locker_size)) {
      throw new AppError('No valid locker size was provided', 404)
    }
    const [rows] = await pool.query(sql, [locker_group, locker_size])

    res.status(200).send(rows)
  } catch (err) {
    next(err)
  }
}

router.get('/available', catchAsyncErrors(getAvailableLocker))

const getLockerGroup = async (req, res, next) => {
  const sql = 'SELECT * FROM lockers WHERE locker_group = ?'
  try {
    const groupName = req.params.lockerGroup.toLowerCase()
    if (!['graduate', 'faculty', 'general'].includes(groupName)) throw new AppError('no group by that name', 404)
    const [rows] = await pool.query(sql, [req.params.lockerGroup])
    res.status(200).send(rows)
  } catch (err) {
    next(err)
  }
}


router.get('/:lockerGroup', catchAsyncErrors(getLockerGroup))

router.get('/floors/:floor', async (req, res) => {
  const sql = 'SELECT * FROM lockers WHERE floor = ?'
  try {
    const [rows] = await pool.query(sql, [req.params.floor])
    if (rows) { res.status(200).send(rows) }
  } catch (err) {
    next(err)
  }
})

module.exports = router
