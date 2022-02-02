const pool = require('../database.js')
// const lockerSchema = require('../schema/locker.json')
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

const getLockerById = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM lockers WHERE id = ?'
    const [row] = await pool.query(sql, [req.params.id])
    res.status(200).send(row)
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
    const data = await fs.readFile('./schema/locker.json')
    // console.log(data)
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll,
  getLockerById,
  getAvailableLocker,
  getSchema
}
