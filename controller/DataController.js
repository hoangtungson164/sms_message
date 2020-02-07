const dateService = require('../service/date.service');
const queryOracle = require('../service/oracleConnect.service');
const oracledb = require('oracledb');

var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var optionCommit = { autoCommit: true};
var params = {};

exports.getPhoneNumber = async function () {
    let SELECT = 'SELECT*FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0 OR RSLT = 1';
    let sql = SELECT + WHERE;
    const rows = await queryOracle(sql, params, optionSelect);
    return rows;

};

exports.updateRegiterMSG = async function (RSLT, STATUS_SMS, phone) {
    let sql = "UPDATE MSG_TABLE SET RSLT_DATE = TO_DATE('" + dateService.formatDate(new Date) + "', 'yyyy/mm/dd hh24:mi:ss')" +
        ", RSLT = " + RSLT +
        ", STATUS_SMS = " + STATUS_SMS +
        " WHERE MSGKEY = '" + phone.MSGKEY + "'";
        console.log(phone);
    const result = await queryOracle(sql, params, optionCommit);
    return result;
};

exports.selectTable = async function () {
    let sql = "select tname from tab where tname = 'MSG_TABLE_" + dateService.formatDateForTable(new Date) + "'";
    const result = await queryOracle(sql, params, optionSelect);
    return result;
}

exports.getRow = async function(phone) {
    let sql = "select*from MSG_TABLE where MSGKEY = " + phone.MSGKEY;
    const result = await queryOracle(sql, params, optionSelect);
    return result;
}

exports.insertMSG = async function (reslt) {
    let sql = 'INSERT INTO MSG_TABLE_' + dateService.formatDateForTable(new Date) + ' VALUES (:MSGKEY, :COMPKEY, :PHONE, :STATUS_SMS, :INPUT_DATE, :SEND_DATE, :RSLT_DATE, :RSLT, :MSG, :TYPE_SMS)';
    let values = {
        MSGKEY: {val: reslt.MSGKEY },
        COMPKEY: {val: reslt.COMPKEY},
        PHONE: {val: reslt.PHONE},
        STATUS_SMS: {val: reslt.STATUS_SMS},
        INPUT_DATE: {val: reslt.INPUT_DATE},
        SEND_DATE: {val: reslt.SEND_DATE},
        RSLT_DATE: {val: reslt.RSLT_DATE},
        RSLT: {val: reslt.RSLT},
        MSG: {val: reslt.MSG},
        TYPE_SMS: {val: reslt.TYPE_SMS}

    };
    const result = await queryOracle(sql, values, optionCommit);
    return result;
};

exports.deleteMSG = async function (phone) {
    let DELETE = "DELETE FROM MSG_TABLE";
    let WHERE = " WHERE MSGKEY = " + phone.MSGKEY;
    let sql = DELETE + WHERE;
    const result = await queryOracle(sql, params, optionCommit);
    return result;
};

exports.createTable = async function () {
    let sql = "CREATE TABLE " + "MSG_TABLE_" + dateService.formatDateForTable(new Date)
    + " (MSGKEY INT NOT NULL PRIMARY KEY, COMPKEY VARCHAR(20) NOT NULL, PHONE VARCHAR(12) NOT NULL, STATUS_SMS INT NOT NULL, INPUT_DATE TIMESTAMP NULL, SEND_DATE TIMESTAMP NULL, RSLT_DATE TIMESTAMP NULL, RSLT INT NULL, MSG VARCHAR(500) NULL, TYPE_SMS INT NOT NULL)";
    const result = queryOracle(sql, params, optionCommit);
    return result;
};


