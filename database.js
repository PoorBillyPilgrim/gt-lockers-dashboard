/**
 * pool creation reference: https://github.com/FaztTech/nodejs-mysql-links/blob/master/src/database.js
 */

const mysql = require('mysql2/promise')
const { db } = require('./config.js')

const pool = mysql.createPool(db)

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has to many connections");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused");
        }
    }

    if (connection) connection.release();
    console.log("DB is Connected");

    return;
})

module.exports = pool