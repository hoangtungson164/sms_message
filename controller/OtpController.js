var request = require('request');
var DataController = require('./DataController');

exports.getAuth = function (otp, phone) {
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
        function (error, response, body, fn) {
            if (error) throw error;
            if (!error && response.statusCode === 200) {
                console.log(body);
                fn(response.statusCode);
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
                console.log(body)
                fn(response.statusCode);
            }
        }
    );
};

var sendBrandNameOTP = function (OTP_input, phone) {
    request.post(
        'http://sandbox.sms.fpt.net/api/push-brandname-otp',
        {
            json: {
                access_token: OTP_input.access_token,
                session_id: OTP_input.session_id,
                BrandName: OTP_input.BrandName,
                Phone: phone.PHONE,
                Message: OTP_input.Message,
            }
        },
        function (error, response, body, fn) {
            if (error) throw error;
            if (!error && response.statusCode === 200) {
                console.log(body);
                fn(response.statusCode);
                console.log('success to send otp');
            } else {
                fn(response.statusCode);
                console.log('fail to send otp');
                console.log(response.statusCode);
                console.log(response.statusMessage);
                console.log(body);
            }
        }
    )
};
