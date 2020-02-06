const DataController = require('./controller/DataController');
const validatePhone = require('./service/validate.service');
const changeValue = require('./service/changeToArray.service');
const OtpController = require('./controller/OtpController');
const otpUtil = require('./util/otp.util');

let otpFunction = async function(){
    checkTableExist();
    const getData = await DataController.getPhoneNumber();
    const getValidPhone = await validatePhone.isPhoneNumber(getData);
    for(const phone of getValidPhone){
        if(phone.TYPE_SMS === 1){
            const result = await sendOTP(otpUtil, phone);
            if(result) {
                const resultInsert = await DataController.insertMSG(phone);
                console.log(resultInsert);
                // const resultDelete = await DataController.deleteMSG(phone);
                // console.log(resultDelete);
            }
        }
    }
}

let sendOTP = async function(otp, phone) {
    const getAuth = await OtpController.getAuth()
    const sendSMS = await OtpController.sendBrandNameOTP(otp, phone, getAuth.access_token);
    if(sendSMS){
        await DataController.updateRegiterMSG(0,1,phone);
    } else {
        await DataController.updateRegiterMSG(1,1,phone);
    }
    return sendSMS;
}

let checkTableExist = async function(){
    const tableCheck = await DataController.selectTable();
    console.log(tableCheck);
    if(tableCheck.length < 1){
        const tableCreate = await DataController.createTable();
        console.log(tableCreate);
    } else {
        console.log('nothing to do');
    }
}

otpFunction();