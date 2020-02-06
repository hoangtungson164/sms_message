var winston = require('./config/winston');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var app = express();
var cors = require('cors');
var DataController = require('./controller/DataController');
let CronJob = require('cron').CronJob;

let job = new CronJob('* * * * * *', function(){
    console.log('success');
    DataController.getPhoneNumber(function (r) {
        if(r.length === 0) {
            job.stop();
        }
    });
}, function(){ console.log('end of the cron') }, false, 'America/New_York');

job.start();

app.use(cors());
app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
