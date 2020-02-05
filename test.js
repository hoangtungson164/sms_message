let campg = ['0323456789', '0312546392', '0973069378', '0123456789'];
// var Regex = require("regex");
// var regex = new Regex(/(a|b)*abb/);
var dateService = require('./service/date.service');
var OtpController = require('./controller/OtpController');

// let pattern = '/^0[35789]{1}[0-9]{7}[1-9]{1}$/'
// let reg = new RegExp(/^0[35789]{1}[0-9]{7}[1-9]{1}$/)
// let phonesList = [];
// for (const phone of campg) {
//     if (reg.test(phone)) {
//         phonesList.push(phone);
//     };
// }
// console.log(phonesList);
// console.log(regex.test("abb"),
// regex.test("aabb"),
// regex.test("babb"),
// regex.test("aaabb"),
// regex.test("ababb"),
// regex.test("abba"),
// regex.test("cabb"))

// console.log(dateService.formatDate(new Date));
// console.log(dateService.formatDateForTable(new Date));

// const asyncForEach = async (array, callback) => {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array)
//   }
// }

// const start = async () => {
//   await asyncForEach([1, 2, 3], async (num) => {
//     console.log(num)
//   })
//   console.log('Done')
// }

// start();

// var CronJob = require('cron').CronJob;
// var job = new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');
// }, function(){ console.log('end of the cron') }, false, 'America/New_York');
// job.start();

let campaignName = 'campaign_name ' + new Date;

console.log(campaignName);

