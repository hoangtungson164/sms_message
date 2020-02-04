let campg = ['0323456789', '0312546392', '0973069378', '0123456789'];
var Regex = require("regex");
var regex = new Regex(/(a|b)*abb/);
var dateService = require('./service/date.service');

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

console.log(dateService.formatDate(new Date));
console.log(dateService.formatDateForTable(new Date));