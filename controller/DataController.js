let dateService = require('../service/date.service');
let campaignService = require('../util/campaign.util');
let changeToArray = require('../service/changeToArray.service');
let queryOracle = require('../service/oracleConnect.service');
const oracledb = require('oracledb');

var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var optionCommit = { autoCommit: true}
var params = {}

exports.getPhoneNumber = async function () {
    campaignService.CampaignName += 1;
    let SELECT = 'SELECT*FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0 OR RSLT = 1';
    let sql = SELECT + WHERE;
    const rows = await queryOracle(sql, params, optionSelect);
    return rows;

};

exports.updateRegiterMSG = async function (RSLT, STATUS_SMS, phone) {
    let sql = "UPDATE MSG_TABLE SET RSLT_DATE = '" + dateService.formatDate(new Date) +
        "', RSLT = " + RSLT +
        ", STATUS_SMS = " + STATUS_SMS +
        " WHERE MSGKEY = '" + phone.MSGKEY + "'";
    const result = await queryOracle(sql, params, optionCommit);
    return result;
};

exports.selectTable = async function () {
    let sql = "select tname from tab where tname = 'MSG_TABLE_" + dateService.formatDateForTable(new Date) + "'";
    const result = await queryOracle(sql, params, optionSelect)
    return result;
}

exports.insertMSG = async function (reslt) {
    let sql = 'INSERT INTO MSG_TABLE_' + dateService.formatDateForTable(new Date) + ' VALUES ?';
    let input_Date = 'TIMESTAMP' + reslt.INPUT_DATE;
    let send_Date = 'TIMESTAMP' + reslt.SEND_DATE;
    let rslt_Date = 'TIMESTAMP' + reslt.RSLT_DATE
    let values = [reslt.MSGKEY, reslt.COMPKEY, reslt.PHONE, reslt.STATUS_SMS, input_Date, reslt.SEND_DATE, reslt.RSLT_DATE, reslt.RSLT, reslt.MSG];
    const result = await queryOracle(sql, values, optionCommit);
    return result;
}

exports.deleteMSG = async function (phone) {
    let DELETE = "DELETE FROM MSG_TABLE";
    let WHERE = " WHERE MSGKEY = '" + phone.MSGKEY + "'";
    let sql = DELETE + WHERE;
    const result = await queryOracle(sql, params, optionCommit);
    return result;
}

exports.createTable = async function () {
    let sql = "CREATE TABLE " + "MSG_TABLE_" + dateService.formatDateForTable(new Date)
    + " (MSGKEY INT NOT NULL PRIMARY KEY, COMPKEY VARCHAR(20) NOT NULL, PHONE VARCHAR(12) NOT NULL, STATUS_SMS INT NOT NULL, INPUT_DATE TIMESTAMP NULL, SEND_DATE TIMESTAMP NULL, RSLT_DATE TIMESTAMP NULL, RSLT INT NULL, MSG VARCHAR(500) NULL, TYPE_SMS INT NOT NULL)";
    const result = queryOracle(sql, params, optionCommit);
    return result;
};


