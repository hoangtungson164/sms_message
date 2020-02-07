const oracledb = require('oracledb');
const dbconfig = require('../config/auth');

async function queryOracel(sql, param, option) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        let result = await connection.execute(
            sql, param, option);
            if(result.rows !== undefined){
                return result.rows;
            }
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

module.exports = queryOracel;
