const express = require('express')
const router = express.Router()
const pool = require('../database.js')
const {getAll} = require('../controllers/queries.js')
const {AppError, catchAsyncErrors} = require('../errors.js')


router.get('/', catchAsyncErrors(getAll))

/*const isValidLockerGroup = (query) => {
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
*/
const isValid = (query, acceptedValues, isRequired) => {
  
  // required keys cannot be undefined
  if (isRequired) {
    if (query === undefined || !acceptedValues.includes(query.toLowerCase())) {
      return false
    }
  }

  if (!acceptedValues.includes(query.toLowerCase())) {
    return false
  }

  return true
}

const parseQueryString = (query, requiredKey) => {
  
  // parse query string and see if requiredKey is present
  // if so, then no error message is created

  let errorMsg
  let isValid = true

  if (!query.hasOwnProperty(requiredKey)) {
    errorMsg = `${requiredKey} must be present in query string`
    isValid = false
  }
  

  /*if (query === {}) {
    errorMsg = 'Query parameters must be provided'
  }

  for (let param in query) {
    if (param !== 'locker_group' || param !== 'locker_size') {
      errorMsg = 'Query parameters must be locker_size or locker_group'
      break
    } else if (param === 'locker_group') {
      if (!isValidLockerGroup(param)) {
        errorMsg = 'No valid locker_group value was provided'
        break
      }
    } else if (param === 'locker_size') {
      if (!isValidLockerSize(param)) {
        errorMsg = 'No valid locker_size value was provided'
        break
      }
    }
  }*/
  return {
    params: query,
    errorMsg: errorMsg,
    isValid: isValid
  }
}

const getAvailableLocker = async (req, res, next) => {
  let sql = 'SELECT * FROM lockers WHERE locker_status="available" AND locker_group=?'
  const validLockerGroups = ['graduate', 'faculty', 'general']
  const validLockerSizes = ['cubby', 'mid', 'full', '']
  try {
    const query = parseQueryString(req.query, 'locker_group')
    if (!query.isValid) {
      throw new AppError(query.errorMsg, 404)
    }
    res.send(query)
    
    // add locker_size if value present
    //sql += locker_size ? ' AND locker_size=? LIMIT 1' : ' LIMIT 1'
    //const [rows] = await pool.query(sql, [locker_group, locker_size])

    //res.status(200).send(rows)
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
