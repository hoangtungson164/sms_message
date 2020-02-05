let request = require('request');
let BrandNameAds = require('../domain/BrandNameAds.class');
let DataController = require('./DataController');
require('dotenv').config();
const urlGetAuth = process.env.URL_REQUEST + '/oauth2/token';
const urlCreateCampaign = process.env.URL_REQUEST + '/api/create-campaign';
const urlSendCampaign = process.env.URL_REQUEST + '/api/push-brandname-ads';

exports.getAuth = function (phonelist, campaign, campaignPhoneList) {
    request.post(
        urlGetAuth,
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
            if (error) throw error;
            if (!error && response.statusCode === 200) {
                console.log(body);
                campaign.access_token = body.access_token;
                createCampaign(campaign, phonelist, campaignPhoneList);
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
                console.log(body)
            }
        }
    );
};

var createCampaign = function (campaign_input, phonelist, campaignPhoneList) {
    request.post(
        urlCreateCampaign,
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
            if (error) throw error;
            if (!error && response.statusCode === 200) {
                console.log(body);
                console.log(body.CampaignCode);

                sendSMS(new BrandNameAds(campaign_input.access_token, campaign_input.session_id,
                    body.CampaignCode, phonelist), campaignPhoneList);
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
                console.log(body)
            }
        }
    )
};

var sendSMS = function (ads_input, campaignPhoneList) {
    console.log(ads_input);
    let phonelist = '';
    for (const ads of ads_input.PhoneList) {
        phonelist += ads + ','
    }
    request.post(
        urlSendCampaign,
        {
            json: {
                access_token: ads_input.access_token,
                session_id: ads_input.session_id,
                CampaignCode: ads_input.CampaignCode,
                PhoneList: phonelist,
            }
        },
        function (error, response, body) {
            if (error) throw error;
            if (!error && response.statusCode === 200) {
                console.log(body);
                for(const phone of ads_input.PhoneList){
                    DataController.updateRegiterMSG(0,1,phone);
                }
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
                console.log(body);
                for(const phone of ads_input.PhoneList){
                    DataController.updateRegiterMSG(1,1,phone);
                }
            }
        }
    )
};



