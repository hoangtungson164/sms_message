var request = require('request');
var logger = require('../config/logger');
let count = 0;

exports.getAuth = function () {
    return new Promise(function(resolve, reject) {
        request.post(
            'http://sandbox.sms.fpt.net/oauth2/token',
            {
                json: {
                    grant_type: 'client_credentials',
                    client_id: '124377fd94eff2C59988eE836d452eC23227252c',
                    client_secret: 'fdBaba82bc08F9c080364bb563c5f1dfd098533eAf415625d83b19ad72CC0dC5D34c5bb2',
                    scope: 'send_brandname_otp',
                    session_id: '789dC48b88e54f58ece5939f14a'
                }
            },
            function (error, response, body) {
                if (error) throw error;
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    resolve(body);
                } else {
                    console.log(response.statusCode);
                    console.log(response.statusMessage);
                    console.log(body);
                    console.log(count);
                    logger.error(body);
                    reject('fail to get authority for sending otp sms');
                }
            }
        );
    })
};

exports.sendBrandNameOTP = async function (OTP_input) {
    return new Promise(function(resolve, reject) {
        request.post(
            'http://sandbox.sms.fpt.net/api/push-brandname-otp',
            {
                json: {
                    access_token: OTP_input.access_token,
                    session_id: OTP_input.session_id,
                    BrandName: OTP_input.BrandName,
                    Phone: OTP_input.Phone,
                    Message: OTP_input.Message,
                }
            },
            function (error, response, body) {
                if (error) throw error;
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    console.log("============================= count =============================");
                    count++;
                    console.log(count);
                    console.log('success to send otp');
                    resolve(true);
                } else {
                    console.log('fail to send otp');
                    console.log(response.statusCode);
                    console.log(response.statusMessage);
                    console.log(body);
                    logger.error(body);
                    resolve(false);
                }
            }
        )
    })
    
};
