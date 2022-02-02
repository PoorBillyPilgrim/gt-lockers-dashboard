const { AppError } = require('../errors.js')

module.exports = (id) => {
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
