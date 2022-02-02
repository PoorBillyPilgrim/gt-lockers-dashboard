const express = require('express')
const router = express.Router()
const pool = require('../database.js')
const { getAll, getLockerById, updateLocker, getAvailableLocker, updateLockerCode } = require('../controllers/queries.js')
const { AppError, catchAsyncErrors } = require('../errors.js')

// all lockers
router.get('/', catchAsyncErrors(getAll))

// single locker
router.put('/locker', catchAsyncErrors(updateLocker))
router.get('/locker/:id', catchAsyncErrors(getLockerById))
router.put('/locker/:id', catchAsyncErrors(updateLockerCode))

// available locker
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

router.get('/group/:lockerGroup', catchAsyncErrors(getLockerGroup))

router.get('/floors/:floor', async (req, res, next) => {
  const sql = 'SELECT * FROM lockers WHERE floor = ?'
  try {
    const [rows] = await pool.query(sql, [req.params.floor])
    if (rows) { res.status(200).send(rows) }
  } catch (err) {
    next(err)
  }
})

module.exports = router
