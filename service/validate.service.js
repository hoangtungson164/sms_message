const DataController = require('../controller/DataController');

exports.isPhoneNumber = function(phones){
    return new Promise(async function(resolve, reject){
        let pattern = /^0[35789]{1}[0-9]{7}[1-9]{1}$/;
        let reg = new RegExp(pattern);
        let phonesList = [];
        for(const phone of phones) {
            if(reg.test(phone.PHONE)) {
                phonesList.push(phone);
            } else {
                await DataController.insertMSG(phone);
                await DataController.deleteMSG(phone);
            }
        }
        resolve(phonesList);
    })
};

