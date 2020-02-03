var request = require('request');
var campaign = require('../domain/Campaign.class');
var brandName_ads = require('../domain/BrandNameAds.class');

exports.getAuth = request.post(
    'http://sandbox.sms.fpt.net/oauth2/token',
    {
        json: {
            grant_type: 'client_credentials',
            client_id: '124377fd94eff2C59988eE836d452eC23227252c',
            client_secret: 'fdBaba82bc08F9c080364bb563c5f1dfd098533eAf415625d83b19ad72CC0dC5D34c5bb2',
            scope: 'send_brandname',
            session_id: '789dC48b88e54f58ece5939f14a'
        }
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);

exports.createCampaign = function (campaign_input) {
    campaign_input = campaign;
    request.post(
        'http://sandbox.sms.fpt.net/api/create-campaign',
        {
            json: {
                access_token: campaign_input.access_token,
                session_id: campaign_input.session_id,
                CampaignName: campaign_input.CampaignName,
                BrandName: campaign_input.BrandName,
                Message: campaign_input.Message,
                ScheduleTime: campaign_input.ScheduleTime,
                Quota: campaign_input.Quota
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    )
}

exports.sendSMS = function(ads_input){
    ads_input = brandName_ads;
    request.post(
        'http://sandbox.sms.fpt.net/api/create-campaign',
        {
            json: {
                access_token: ads_input.access_token,
                session_id: ads_input.session_id,
                CampaignCode: ads_input.CampaignCode,
                PhoneList: ads_input.PhoneList,
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    )
}

