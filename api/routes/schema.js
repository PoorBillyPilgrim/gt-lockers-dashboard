const express = require('express')
const router = express.Router()
const { getSchema } = require('../controllers/queries.js')
const { catchAsyncErrors } = require('../errors.js')

router.get('/', catchAsyncErrors(getSchema))

module.exports = router