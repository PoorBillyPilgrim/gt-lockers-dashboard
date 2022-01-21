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
const isValidValue = (query, acceptedValues/*, isRequired*/) => {
  
  // required keys cannot be undefined
  /*if (isRequired) {
    if (query === undefined || !acceptedValues.includes(query.toLowerCase())) {
      return false
    }
  }*/

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

  if (query === {} || !query.hasOwnProperty(requiredKey)) {
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
    queries: query,
    errorMsg: errorMsg,
    isValid: isValid
  }
}

const getAvailableLocker = async (req, res, next) => {
  let sql = 'SELECT * FROM lockers WHERE locker_status="available" AND locker_group=?'
 
  const validValues = {
    locker_group: ['graduate', 'faculty', 'general'],
    locker_size: ['cubby', 'mid', 'full', '']
  }
  try {
    const queryString = parseQueryString(req.query, 'locker_group')
    if (!queryString.isValid) {
      throw new AppError(queryString.errorMsg, 404)
    }
    console.log(queryString)
    /*const {locker_group} = query.queries
    if (Array.isArray(locker_group) || !isValidValue(locker_group, validLockerGroups)) {
      throw new AppError(`No valid locker_group was provided`, 404)
    }*/
    const queries = queryString.queries
    for (let query in queries) {
      if (Array.isArray(queries[query])) {
        throw new AppError(`Multiple values for ${query} are not accepted`, 404)
      }
      if (!isValidValue(queries[query], validValues[query])) {
        throw new AppError(`No valid ${query} was provided`, 404)
      }
    }
    const {locker_group, locker_size} = queries
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
