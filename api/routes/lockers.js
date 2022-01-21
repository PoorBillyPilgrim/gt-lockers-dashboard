const express = require('express')
const router = express.Router()
const pool = require('../database.js')
const {getAll} = require('../controllers/queries.js')
const {AppError, catchAsyncErrors} = require('../errors.js')


router.get('/', catchAsyncErrors(getAll))

const isValidValue = (query, acceptedValues/*, isRequired*/) => {
  
  if (!acceptedValues.includes(query.toLowerCase())) {
    return false
  }

  return true
}

const parseQueryString = (query, requiredKey, validValues) => {
  
  let queryString = {
    queries: query,
    isValid: false
  }
  // if queryString is empty or requiredKey is not present
  if (query === {} || !query.hasOwnProperty(requiredKey)) {
    queryString.errorMsg = `${requiredKey} must be present in query string`
    return queryString
  }
 
  
  for (let query in queryString.queries) {
    // ensure that keys found in query are valid
    if (validValues[query] === undefined) {
      queryString.errorMsg = `${query} is not a valid key to use in a query`
      return queryString
    }
    // ensure that keys are only used once in query
    if (Array.isArray(queryString.queries[query])) {
      queryString.errorMsg = `Multiple values for ${query} are not accepted`
      return queryString
    }
    // ensure values in key-value query are valid
    if (!isValidValue(queryString.queries[query], validValues[query])) {
      queryString.errorMsg = `No valid ${query} was provided`
      return queryString
    }
  }

  queryString.isValid = true
  return queryString
}


const getAvailableLocker = async (req, res, next) => {

  try {
    let sql = 'SELECT * FROM lockers WHERE locker_status="available" AND locker_group=?'
 
    const validValues = {
      locker_group: ['graduate', 'faculty', 'general'],
      locker_size: ['cubby', 'mid', 'full', '']
    }
    const queryString = parseQueryString(req.query, 'locker_group', validValues)
    if (!queryString.isValid) {
      throw new AppError(queryString.errorMsg, 404)
    }

    const {locker_group, locker_size} = queryString.queries
    // add locker_size if value present
    sql += locker_size ? ' AND locker_size=? LIMIT 1' : ' LIMIT 1'
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
