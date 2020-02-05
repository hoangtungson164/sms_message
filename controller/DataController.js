let con = require('../config/db');
let validate = require('../service/validate.service');
let dateService = require('../service/date.service');
let CampaignController = require('./CampaignController');
let campaignService = require('../service/campaign.service');
let changeToArray = require('../service/changeToArray.service');
let OtpController = require('./OtpController');
let otpService = require('../service/otp.service');

exports.getPhoneNumber =  function (fn) {
    campaignService.CampaignName += 1;
    let SELECT = 'SELECT*FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0 OR RSLT = 1';
    let sql = SELECT + WHERE;
    let promotionList = [];
    let customerCareList = [];
    checkTableExist();
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length === 0){
            fn(result);
            return;
        }

        // divide by type
        for (const row of result) {
            if (row.TYPE_SMS === 1) {
                promotionList.push(row)
            } else {
                customerCareList.push(row)
            }
        }

        // validate and get phone number
        let promotionPhone = validate.isPhoneNumber(promotionList);
        let customerCarePhone = validate.isPhoneNumber(customerCareList);

        // send sms campaign
        CampaignController.getAuth(promotionPhone, campaignService, promotionList);

        // // send sms otp
        for (const phone of customerCarePhone) {
            OtpController.getAuth(otpService.otpMes, phone);
        }

        console.log(result);
    });
};

exports.updateRegiterMSG = function (RSLT, STATUS_SMS, phone) {
    let sql = "UPDATE MSG_TABLE SET RSLT_DATE = '" + dateService.formatDate(new Date) +
        "', RSLT = " + RSLT +
        ", STATUS_SMS = " + STATUS_SMS +
        " WHERE MSGKEY = '" + phone.MSGKEY + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('update success');

        let SELECT = 'SELECT*FROM MSG_TABLE';
        let WHERE = ' WHERE MSGKEY = ' + phone.MSGKEY;
        let sql = SELECT + WHERE;
        con.query(sql, function (err, result) {
            console.log('get again success');
            console.log(result[0]);

            let sql = 'INSERT INTO MSG_TABLE_' + dateService.formatDateForTable(new Date) + ' VALUES ?';
            let values = [changeToArray.valueChange(result[0])];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log('insert success');

                let DELETE = "DELETE FROM MSG_TABLE";
                let WHERE = " WHERE MSGKEY = '" + phone.MSGKEY + "'";
                let sql = DELETE + WHERE;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log('delete success');
                })
            })
        })
    })
};

let checkTableExist = function() {
    let sql = "SELECT*FROM MSG_TABLE_" + dateService.formatDateForTable(new Date);
    con.query(sql, function(err, result){
        if(err){
            let sql = "CREATE TABLE " + "MSG_TABLE_" + dateService.formatDateForTable(new Date) + " (`MSGKEY` INT NOT NULL AUTO_INCREMENT,`COMPKEY` VARCHAR(20) NOT NULL,`PHONE` VARCHAR(12) NOT NULL,`STATUS_SMS` INT NOT NULL,`INPUT_DATE` DATETIME NULL,`SEND_DATE` DATETIME NULL,`RSLT_DATE` DATETIME NULL,`RSLT` INT NULL,`MSG` VARCHAR(500) NULL,`TYPE_SMS` INT NOT NULL, PRIMARY KEY (`MSGKEY`))";
            con.query(sql, function(err, reslt) {
                if(err) throw err;
                return reslt;
            })
        } else {
            return result;
        }
    })
};
