const pool = require('../database.js')
const getAll = async (req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT * FROM lockers')
      res.status(200).send(rows)
    } catch (err) {
      next(err)
    }
  }

module.exports = {
    getAll
}