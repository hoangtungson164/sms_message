var mysql = require('mysql');
var config = require('./config.db')
require('dotenv').config();
var querySQL = async function (sql, param) {
    let connection;
    try {
        connection = await mysql.createConnection(config);
        let result = await connection.query(sql, param, function(err, reslt) {
            if(err) throw err;
            return reslt;
        })
        return result;
    } catch (err) {
        return err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                return error;
            }
        }
    }
}

module.exports = querySQL;