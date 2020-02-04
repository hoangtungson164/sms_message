var con = require('../config/db');
var validate = require('../service/validate.service');
var dateService = require('../service/date.service');
var CampaignController = require('./CampaignController');
var campaignService = require('../service/campaign.service');
var changeToArray = require('../service/changeToArray.service');


var OtpController = require('./OtpController');
var otpService = require('../service/otp.service');

exports.getPhoneNumber = function (req, res, next) {
    let SELECT = 'SELECT*FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0 OR RSLT = 1';
    let sql = SELECT + WHERE;
    let promotionList = [];
    let customerCareList = [];
    console.log('data controller');
    con.query(sql, function (err, result) {
        if (err) return res.status(500).send("There was a problem with get all the item.");

        // divide by type
        for(const row of result){
            if(row.TYPE_SMS == 1){
                promotionList.push(row)
            } else {
                customerCareList.push(row)
            }
        }

        // validate and get phone number
        let promotionPhone = validate.isPhoneNumber(promotionList);
        let customerCarePhone = validate.isPhoneNumber(customerCareList);
        let totalPhone = validate.isPhoneNumber(result);
     
        // send sms campaign
        CampaignController.getAuth(promotionPhone, campaignService.campaignPromtion, promotionList);
        CampaignController.getAuth(customerCarePhone, campaignService.campaignCustomerCare, customerCareList);

        // // send sms otp
        // for (const phone of totalPhone){
        //     OtpController.getAuth(otpService.otpMes, phone, result);
        // }

        return res.status(200).send(result);
    });
}

exports.updateRegiterMSG = function (RSLT, STATUS_SMS, PHONE) {
    let sql = "UPDATE MSG_TABLE SET RSLT_DATE = '" + dateService.formatDate(new Date) + 
    "', RSLT = " + RSLT + 
    ", STATUS_SMS = " + STATUS_SMS + 
    " WHERE PHONE = '" + PHONE + "'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log('update success');
        return result;
    })
}

exports.insertSMSMonthly = function(reslt) {
    let sql = 'INSERT INTO MSG_TABLE_' + dateService.formatDateForTable(new Date) +  ' VALUES ?'
    let values = reslt
    con.query(sql, [values],  function(err, result) {
        if(err) throw err;
        for(const row of reslt){
            deleteMSGRow(row[0]);
        }
        return result;
    })
}

var deleteMSGRow = function(MSGKEY){
    let DELETE = "DELETE FROM MSG_TABLE";
    let WHERE = " WHERE MSGKEY = '" + MSGKEY + "'";
    let sql = DELETE + WHERE;
    con.query(sql, function(err, result) {
        if(err) throw err;
        return result;
    })
}