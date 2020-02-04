const dateFormat = require('dateformat');

module.exports = {
    formatDate: function (date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hh = '' + d.getHours(),
            mm = '' + d.getMinutes(),
            ss = '' + d.getSeconds();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hh.length < 2) hh = '0' + hh;
        if (mm.length < 2) mm = '0' + mm;
        if (ss.length < 2) ss = '0' + ss;
        return year + month + day + hh + mm + ss;
    },

    formatDateForTable: function(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        return year + month;
    }
};
