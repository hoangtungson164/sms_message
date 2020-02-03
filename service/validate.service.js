module.exports = {
    isPhoneNumber: function(phones){
        let pattern = '/^0[35789]{1}[0-9]{7}[1-9]{1}$/'
        let reg = new RegExp(pattern)
        let phonesList = [];
        for(const phone of phones) {
            if(reg.test(phone.PHONE)) {
                phonesList.push(phone.PHONE);
            };
        }
        return phonesList;
    }
};