var con = require('../config/db');
var validate = require('../service/validate.service');
var auth = require('../domain/AuthClass');

exports.getPhoneNumber =function (req, res, next) {
    let SELECT = 'SELECT PHONE TYPE_SMS FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0';
    let sql = SELECT + WHERE;
    con.query(sql, function (err, result) {
        if (err) return res.status(500).send("There was a problem with get all the item.");
        console.log("Success get table");
        return res.status(200).send(validate.isPhoneNumber(result));
    });
}