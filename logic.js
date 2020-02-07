const DataController = require('./controller/DataController');
const validatePhone = require('./service/validate.service');
const CampaignController = require('./controller/CampaignController');
const OtpController = require('./controller/OtpController');
const otpUtil = require('./util/otp.util');
const campaignUtil = require('./util/campaign.util');
const BrandNameAds = require('./domain/BrandNameAds.class');

let otpFunction = async function () {
    return new Promise(async function (resolve, reject) {
        await checkTableExist();
        const getData = await DataController.getPhoneNumber();
        if(getData.length < 1){
            resolve(false);
            return false;
        }
        const getValidPhone = await validatePhone.isPhoneNumber(getData);
        let phoneListCamp = [];
        for (const phone of getValidPhone) {
            if (phone.TYPE_SMS === 0) {
                await updateAfterSend(phone);
            } else {
                phoneListCamp.push(phone);
            }
        }
        await updateAfterSendCampaign(phoneListCamp);
    });
};

let updateAfterSendCampaign = async function (phoneListCamp) {
    const sendSMSCamp = await sendCampaign(campaignUtil, phoneListCamp);
    console.log(sendSMSCamp);
    try {
        if (sendSMSCamp) {
            for (const phoneCamp of phoneListCamp) {
                await DataController.updateRegiterMSG(0, 1, phoneCamp)
            }
        } else {
            for (const phoneCamp of phoneListCamp) {
                await DataController.updateRegiterMSG(1, 1, phoneCamp)
            }
        }
    } catch (err) {
        throw err
    } finally {
        for (const phoneCamp of phoneListCamp) {
            await moveData(phoneCamp)
        }
    }
};

let updateAfterSend = async function (phone) {
    const result = await sendOTP(otpUtil, phone);
    console.log(result);
    try {
        if (result) {
            console.log('success');
            await DataController.updateRegiterMSG(0, 1, phone);
        } else {
            await DataController.updateRegiterMSG(1, 1, phone)
        }
    } catch (err) {
        throw err;
    } finally {
        await moveData(phone)
    }
};

let moveData = async function (phone) {
    const resultSelect = await DataController.getRow(phone);
    const resultInsert = await DataController.insertMSG(resultSelect[0]);
    console.log(resultInsert);
    const resultDelete = await DataController.deleteMSG(phone);
    console.log(resultDelete);
};

let sendOTP = async function (otp, phone) {
    const getAuth = await OtpController.getAuth();
    const sendSMS = await OtpController.sendBrandNameOTP(otp, phone, getAuth.access_token);
    if (sendSMS) {
        await DataController.updateRegiterMSG(0, 1, phone);
    } else {
        await DataController.updateRegiterMSG(1, 1, phone);
    }
    return sendSMS;
};

let checkTableExist = async function () {
    const tableCheck = await DataController.selectTable();
    console.log(tableCheck);
    if (tableCheck.length < 1) {
        const tableCreate = await DataController.createTable();
        console.log(tableCreate);
    } else {
        console.log('nothing to do');
    }
};

let sendCampaign = async function (campaign, phone) {
    const getAuth = await CampaignController.getAuth();
    const createCampaign = await CampaignController.createCampaign(campaign, getAuth.access_token);
    let brandName = new BrandNameAds(getAuth.access_token, 'abcde', createCampaign.CampaignCode, phone);
    const sendCampaign = await CampaignController.sendSMS(brandName);
    console.log(sendCampaign);
    return sendCampaign;
};

module.exports = otpFunction;
