var con = require('../config/db');
var auth = require('../domain/AuthClass');

exports.postAuth = function (req, res, next) {
    const auth_user = auth()
    con.query(sql, function (err, result) {
        if (err) return res.status(500).send("There was a problem with get all the item.");
        console.log("Success get table");
        res.status(200).json(result);
    });
}