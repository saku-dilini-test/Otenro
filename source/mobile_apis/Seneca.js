
var seneca = require('seneca')()

seneca.use('CommonMobileApisController');


getContactUs : seneca.act({ role: 'process', cmd: 'getContactUs'}, function ( err, result ) {
  console.log( result );
  sails.log.debug(results);
} )

getAboutUs : seneca.act({ role: 'process', cmd: 'getAboutUs'}, function ( err, result ) {
  console.log( result );
} )

getPolicies : seneca.act({ role: 'process', cmd: 'getPolicies'}, function ( err, result ) {
  console.log( result );
} )

viewImages : seneca.act({ role: 'process', cmd: 'viewImages'}, function ( err, result ) {
  console.log( result );
} )

getTermsAndConditions : seneca.act({ role: 'process', cmd: 'getTermsAndConditions'},{getTermsAndConditions:{GET:true}}, function ( err, result ) {
  console.log( result );
} )

cal : seneca.act({ role: 'process', cmd: 'cal'}, function ( err, result ) {
  console.log( result );
} )

seneca.listen({ port: 8080, host: '192.168.8.62' })