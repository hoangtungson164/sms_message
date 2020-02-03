module.exports = {
    isPhoneNumber: function(phones){
        let phonesList = [];
        for(const phone of phones) {
            if(phone.PHONE.length == 10) {
                phonesList.push(phone.PHONE);
            };
        }
        return phonesList;
    }
};