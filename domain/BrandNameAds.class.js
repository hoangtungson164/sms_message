module.exports = function brandname_ads(brandname_ads) {
    const {
            access_token,
            session_id,
            CampaignCode,
            PhoneList,
    } = brandname_ads;

    this.access_token = access_token;
    this.session_id = session_id;
    this.CampaignCode = CampaignCode;
    this.PhoneList = PhoneList;
}