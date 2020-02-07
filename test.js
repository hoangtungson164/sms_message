var DataController = require('./controller/DataController');
let querySQL = require('./config/db');

DataController.getSomething()

//-----------------------------get something -------------------------------------
// exports.getSomething = async function () {
//     try {
//         let SELECT = 'SELECT*FROM MSG_TABLE';
//         let WHERE = ' WHERE STATUS_SMS = 0 OR RSLT = 1';
//         let sql = SELECT + WHERE;
//         const someRows = await queryOracle('SELECT * FROM MSG_TABLE');
//         // someRows.then(val => {
//             console.log("==========================");
//             // console.log(val);
//             console.log("someRows")
//             console.log(someRows)
//         // })
//     } catch (err) {
//         // handle the error
//     } finally {
//         // await querySQL.close();
//     }
// };

// ------------------------------db file---------------------------------
// var config = require('./config.db');

// const mysql = require('mysql'); // or use import if you use TS
// const util = require('util');
// const conn = mysql.createConnection(config);

// // node native promisify
// const query = util.promisify(conn.query).bind(conn);

// querySQL = async function (sql) {
//     //   try {
//     // const rows = await query(sql);
//     // console.log(JSON.stringify(rows));
//     // return JSON.stringify(rows);
//     //   } finally {
//     //     conn.end();
//     //   }
//     // await new Promise(resolve => {
//     //     resolve(query(sql));
//     // })
//     try {
//         return await Promise.resolve(query(sql))
//     } catch (e) {
//         conn.end();
//     }
// };

// module.exports = querySQL;