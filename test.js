var dateTime = new Date;
var DataController = require('./controller/DataController');
var Campaign = require('./domain/Campaign.class');

let campg = ['0323456789', '0312546392', '0973069378', '0123456789'];

let pattern = '/^0[35789]{1}[0-9]{7}[1-9]{1}$/'
let reg = new RegExp('/^0[35789]{1}[0-9]{7}[1-9]{1}$/')
let phonesList = [];
for (const phone of campg) {
    if (reg.test(phone)) {
        phonesList.push(phone);
    };
}
console.log(phonesList);