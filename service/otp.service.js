var OTP = require('../domain/OTP.class');
let message = 'test message';
let buff = new Buffer(message);
let base64data = buff.toString('base64');

exports.otpMes = new OTP(
    '', 'abcde', 'FTI', '', base64data);