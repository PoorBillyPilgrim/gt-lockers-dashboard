const pool = require('../database.js')
const lockerSchema = require('../schema/locker.json')
const path = require('path')
const fs = require('fs/promises')
const parseQueryString = require('../services/parseQueryString')
const { AppError } = require('../errors.js')

const getAll = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lockers')
    res.status(200).send(rows)
  } catch (err) {
    next(err)
  }
}

const validateId = (id) => {
  if (id === undefined) {
    throw new AppError('ID must be present', 404)
  }
  if (isNaN(parseInt(id))) {
    throw new AppError('ID must be a valid integer', 404)
  }
  if (parseInt(id) < 1) {
    throw new AppError('ID must be greater than or equal to 1', 404)
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


const randomInt = (min, max) => {
  return (Math.floor(Math.random() * (max - min + 1) + min)).toString()
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
    let message = query.changedRows > 0 ? 'New locker code created successfully.' : 'Sorry, no updates were made.CANNO'
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
  updateLockerCode,
  getAvailableLocker,
  getSchema
}
