const oracledb = require('oracledb');
const dbconfig = require('../config/auth');

async function queryOracel(sql, param, option) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        let result = await connection.execute(
            sql, param, option);
        if (result.rows !== undefined) {
            console.log('something');
            return result.rows;
        } else {
            return result;
        }
    } catch (err) {
        console.log("Problem with server");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.log("Problem with closing connection");
            }
        }
    }
}

module.exports = queryOracel;