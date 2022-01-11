require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  environment: 'development',
  db: {
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  }
}
