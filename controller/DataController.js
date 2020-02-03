var con = require('../config/db');
var validate = require('../service/validate.service');
var dateService = require('../service/date.service');
var MesController = require('./MesController');


exports.getPhoneNumber = function (req, res, next) {
    let SELECT = 'SELECT*FROM MSG_TABLE';
    let WHERE = ' WHERE STATUS_SMS = 0';
    let sql = SELECT + WHERE;
    con.query(sql, async function (err, result) {
        if (err) return res.status(500).send("There was a problem with get all the item.");
        console.log("Success get table");
        let reslt = validate.isPhoneNumber(result);
        res.status(200).send(reslt);
        // MesController.getAuth(reslt);
    });
}

exports.updateRegiterMSG = function (reslt) {
    console.log(dateService.formatDate(new Date));
    let sql = "UPDATE MSG_TABLE SET RSLT_DATE = '" + reslt.RSLT_DATE + 
    "', SET RSLT = '" + reslt.RSLT + 
    "', SET STATUS_SMS = '" + reslt.STATUS_SMS;
    con.query(sql, function(err, result) {
        if (err) throw err;
        return res.status(200).send('success to update');
    })
}