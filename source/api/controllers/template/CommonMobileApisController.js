/**
 * Created by udeshika on 3/24/17.
 */
/**
 * CommonMobileApisController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var CommonMobileApisController = require('../../../mobile_apis/CommonMobileApisController');
//var CommonMobileApisController = require('../../../mobile_apis/example');

module.exports = {

getContactUs : CommonMobileApisController.getContactUs,
getAboutUs : CommonMobileApisController.getAboutUs,
getPolicies : CommonMobileApisController.getPolicies,
viewImages : CommonMobileApisController.viewImages,
getTermsAndConditions : CommonMobileApisController.getTermsAndConditions

}




