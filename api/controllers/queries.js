const pool = require('../database.js')
const lockerSchema = require('../schema/locker.json')
const fs = require('fs/promises')
const parseQueryString = require('../services/parseQueryString')
const validateId = require('../services/validateId')
const randomInt = require('../utils/randomInt')
const { AppError } = require('../errors.js')

const getAll = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lockers')
    res.status(200).send(rows)
  } catch (err) {
    next(err)
  }
}

const getLockerById = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM lockers WHERE id=?'
    validateId(req.params.id)
    const [row] = await pool.query(sql, [req.params.id])
    res.status(200).send(row)
  } catch (err) {
    next(err)
  }
}

const updateLocker = async (req, res, next) => {
  try {
    const {id, patron_name, current_code, locker_status} = req.body
    validateId(id)
    const sql = 
    `
    UPDATE lockers
    SET patron_name=?, current_code=?, locker_status=?
    WHERE id=?
    `
    const [query] = await pool.query(sql, [patron_name, current_code, locker_status, id])
    let message = query.changedRows > 0 ? 'Changes made successfully.' : 'No changes made.'
    res.status(200).send({message: message})
  } catch (err) {
    next(err)
  }
}

const updateLockerCode = async (req, res, next) => {
  try {
    const sql = 'UPDATE lockers SET current_code=? WHERE id=?'
    console.log(req.params)
    validateId(req.params.id)
    let passcode = ''
    for (let i = 0; i < 4; i++) {
      passcode += i === 0 ? randomInt(1, 9) : randomInt(0, 9)
    }
    const [query] = await pool.query(sql, [passcode, req.params.id])
    let message = query.changedRows > 0 ? 'New locker code created successfully.' : 'Sorry, no updates were made.'
    res.status(200).send({message: message})
  } catch (err) {
    next(err)
  }
}

const getAvailableLocker = async (req, res, next) => {
  try {
    let sql = 'SELECT * FROM lockers WHERE locker_status="available" AND locker_group=?'

    const queryString = parseQueryString(req.query, 'locker_group', lockerSchema)
    if (!queryString.isValid) {
      throw new AppError(queryString.errorMsg, 404)
    }

    const { locker_group, locker_size } = queryString.queries
    if (locker_group === 'general') sql += ' AND floor <> 5'
    // add locker_size if value present
    sql += locker_size ? ' AND locker_size=? LIMIT 1' : ' LIMIT 1'
    const [rows] = await pool.query(sql, [locker_group, locker_size])

    res.status(200).send(rows)
  } catch (err) {
    next(err)
  }
}

const getSchema = async (req, res, next) => {
  try {
    const data = await fs.readFile('./schema/locker.json') // file path is ./ not ../ because file read from server.js
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll,
  getLockerById,
  updateLocker,
  updateLockerCode,
  getAvailableLocker,
  getSchema
}
