var dateTime = new Date;
var DataController = require('./controller/DataController');
var Campaign = require ('./domain/Campaign.class');

let campg = [ '0123456789', '0312546392' ];
let phonelist = '';
for (const ads of campg){
    phonelist += ads + ','
}
console.log(phonelist);
