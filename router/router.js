var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var DataController = require('../controller/DataController');


router.get('/data', DataController.getPhoneNumber);


module.exports = router