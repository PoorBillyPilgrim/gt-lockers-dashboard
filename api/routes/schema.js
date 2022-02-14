const express = require('express')
const router = express.Router()
const { Schema } = require('../controllers/queries.js')
const { catchAsyncErrors } = require('../errors.js')

router.get('/', catchAsyncErrors(Schema.get))
router.put('/', catchAsyncErrors(Schema.update))

module.exports = router
