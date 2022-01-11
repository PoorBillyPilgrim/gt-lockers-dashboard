require('dotenv').config()
const express = require('express')

const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())


app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/hello', (req, res) => {
    res.send('hello WORLD')
})

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})
