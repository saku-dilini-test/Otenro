/**
 * Created by kalani on 4/28/17.
 */
/**
 * Seneca
 *
 * @help        :: See http://senecajs.org/getting-started/
 */
 var config = require('../mobile_apis/Services/config');
var seneca = require('seneca')()

seneca.use('CommonMobileApisController');
seneca.use('EcommerceAppMobileApisController');
seneca.use('MediaAppMobileApisController');



/*Common Mobile Api*/

seneca.act({cmd: 'getContactUs'}, function ( err, result ) {
    if (err) return console.error(err)
    console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getAboutUsData'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getPolicies'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'viewImages'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log('result123::::::::'+result);
} )

seneca.act({ role: 'process', cmd: 'getTermsAndConditions'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

/*Ecommerce App controller*/


seneca.act({ role: 'process', cmd: 'getThirdBySecondId'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getCurrency'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getListOfSalesAndPromotions'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getTaxInfo'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getCurrency'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getCurrency'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getIPGInfo'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getSpecificChild'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getIconAllowance'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getSubChildById'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getShippingPickupInfo'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getTaxInfoByCountry'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'updateInventory'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'register'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'saveorder'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'authenticate'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getClientToken'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getProductById'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )


/*Media App controller*/

seneca.act({ role: 'process', cmd: 'getArticleCategoryByAppId'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getArticles'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getArticleByCategoryId'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getArticleById'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.act({ role: 'process', cmd: 'getCommentsDummy'}, function ( err, result ) {
   if (err) return console.error(err)
      console.log(result);
} )

seneca.listen({ port:8080, host:'192.168.8.54',protocol: 'http' })


