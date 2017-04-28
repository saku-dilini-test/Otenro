
var seneca = require('seneca')()

seneca.use('CommonMobileApisController');


seneca.act({ role: 'process', cmd: 'getContactUs'},{GET:true}, function ( err, result ) {
    if (err) return console.error(err)
    console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getAboutUs'},{getAboutUs:{GET:true}}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getPolicies'},{getPolicies:{GET:true}}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'viewImages'},{viewImages:{GET:true}}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getTermsAndConditions'},{getTermsAndConditions:{GET:true}}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.listen({ port: 8080, host: '192.168.8.62' })



