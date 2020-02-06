let con = require('../config/db');
const oracledb = require('oracledb');

let validate = require('../service/validatePhone.service');
let dateService = require('../service/date.service');
let changeToArray = require('../service/changeToArray.service');
let oracleQuery = require('../service/oracleConnect.service');
var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var params = {}

exports.getPhoneNumber = async function (res) {
    let SELECT = 'SELECT*FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0 OR RSLT = 1';
    let sql = SELECT + WHERE;
    oracleQuery(sql, params, optionSelect)
};

exports.insertMsgTableDate = function (result, fn) {
    let sql = 'INSERT INTO MSG_TABLE_' + dateService.formatDateForTable(new Date) + ' VALUES ?';
    let values = [changeToArray.valueChange(result[0])];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        fn(result);
    })
};

exports.deleteAfterInsert = function(phone, fn) {
    let DELETE = "DELETE FROM MSG_TABLE";
    let WHERE = " WHERE MSGKEY = '" + phone.MSGKEY + "'";
    let sql = DELETE + WHERE;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('delete success');
        fn(result);
    })
};

exports.updateRegiterMSG = function (RSLT, STATUS_SMS, phone, fn) {
    let sql = "UPDATE MSG_TABLE SET RSLT_DATE = '" + dateService.formatDate(new Date) +
        "', RSLT = " + RSLT +
        ", STATUS_SMS = " + STATUS_SMS +
        " WHERE MSGKEY = '" + phone.MSGKEY + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('update success');
        fn(result);
    })
};

let checkTableExist = function () {
    let sql = "SELECT*FROM MSG_TABLE_" + dateService.formatDateForTable(new Date);
    con.query(sql, function (err, result) {
        if (err) {
            let sql = "CREATE TABLE " + "MSG_TABLE_" + dateService.formatDateForTable(new Date) + " (`MSGKEY` INT NOT NULL AUTO_INCREMENT,`COMPKEY` VARCHAR(20) NOT NULL,`PHONE` VARCHAR(12) NOT NULL,`STATUS_SMS` INT NOT NULL,`INPUT_DATE` DATETIME NULL,`SEND_DATE` DATETIME NULL,`RSLT_DATE` DATETIME NULL,`RSLT` INT NULL,`MSG` VARCHAR(500) NULL,`TYPE_SMS` INT NOT NULL, PRIMARY KEY (`MSGKEY`))";
            con.query(sql, function (err, reslt) {
                if (err) throw err;
                return reslt;
            })
        } else {
            return result;
        }
    })
};


