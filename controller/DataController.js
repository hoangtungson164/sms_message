var con = require('../config/db');
var validate = require('../service/validate.service');
var dateService = require('../service/date.service');
var CampaignController = require('./CampaignController');
var campaignService = require('../service/campaign.service');

var OtpController = require('./OtpController');
var otpService = require('../service/otp.service');

exports.getPhoneNumber = function (req, res, next) {
    let SELECT = 'SELECT*FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0 OR RSLT = 1';
    let sql = SELECT + WHERE;
    let promotionList = [];
    let customerCareList = [];
    con.query(sql, async function (err, result) {
        if (err) return res.status(500).send("There was a problem with get all the item.");
        console.log("Success get table");

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
        CampaignController.getAuth(promotionPhone, campaignService.campaignPromtion);
        CampaignController.getAuth(customerCarePhone, campaignService.campaignCustomerCare);

        // send sms otp
        for(const phone of totalPhone){
            OtpController.getAuth(otpService.otpMes, phone);
        }

        return res.status(200).send(result);
    });
}

exports.updateRegiterMSG = function (reslt) {
    let sql = "UPDATE MSG_TABLE SET RSLT_DATE = '" + dateService.formatDate(new Date) + 
    "', SET RSLT = '" + reslt.RSLT + 
    "', SET STATUS_SMS = '" + reslt.STATUS_SMS;
    con.query(sql, function(err, result) {
        if (err) throw err;
        return;
    })
}

exports.insertSMSMonthly = function(reslt) {
    let sql = 'INSERT INTO MSG_TABLE_' + dateService.formatDateForTable(new Date) +  ' VALUES = ?'
    let values = [reslt]
    con.query(sql, [values],  function(err, result) {
        if(err) throw err;
        return;
    })
}