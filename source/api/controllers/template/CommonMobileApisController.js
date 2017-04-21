/**
 * Created by udeshika on 3/24/17.
 */
/**
 * CommonMobileApisController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var CommonMobileApisController = require('../../../mobile_apis/CommonMobileApisController');



module.exports = {

getContactUs : CommonMobileApisController.getContactUs,
getAboutUs : CommonMobileApisController.getAboutUs,
getPolicies : CommonMobileApisController.getPolicies,
viewImages : CommonMobileApisController.viewImages,
getTermsAndConditions : CommonMobileApisController.getTermsAndConditions

}





var seneca = require('seneca')()

seneca.use('../../../mobile_apis/CommonMobileApisController');

getContactUs : seneca.act({ role: 'process', cmd: 'getContactUs'},{getContactUs:{GET:true}}, function ( err, result ) {
  console.log( result );
} )

getAboutUs : seneca.act({ role: 'process', cmd: 'getAboutUs'},{getAboutUs:{GET:true}}, function ( err, result ) {
  console.log( result );
} )

getPolicies : seneca.act({ role: 'process', cmd: 'getPolicies'},{getPolicies:{GET:true}}, function ( err, result ) {
  console.log( result );
} )

viewImages : seneca.act({ role: 'process', cmd: 'viewImages'},{viewImages:{GET:true}}, function ( err, result ) {
  console.log( result );
} )

getTermsAndConditions : seneca.act({ role: 'process', cmd: 'getTermsAndConditions'},{getTermsAndConditions:{GET:true}}, function ( err, result ) {
  console.log( result );
} )




