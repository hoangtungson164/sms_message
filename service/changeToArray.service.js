var changeValue = function (rowDataPacket) {
    let phoneList = [];
    for(const row of rowDataPacket){
        let phone = [];
        phone.push(row.MSGKEY, row.COMPKEY, row.PHONE, row.STATUS_SMS, 
            row.INPUT_DATE, row.SEND_DATE, row.RSLT_DATE, row.RSLT, row.MSG, row.TYPE_SMS);
        phoneList.push(phone);
    }
    return phoneList;
}

module.exports = changeValue;