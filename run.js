let DataController = require('./controller/DataController');
let CampaignController = require('./controller/CampaignController');
let OtpController = require('./controller/OtpController');
let validate = require('./service/validatePhone.service');

var runRepeat = async function(){
    try {
        const something = await DataController.getPhoneNumber();
        console.log(something);
    } catch (e) {
        console.log("fail")
    }

};

runRepeat();

