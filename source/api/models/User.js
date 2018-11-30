/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Passwords = require('machinepack-passwords');

module.exports = {


  schema: true,

  attributes: {


    id :{
        type: 'ObjectId'
    },
    name:  {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string'
    },
    accountType:  {
      type: 'string'
    },
    picture: {
      type: 'string'
    },
    googleId:  {
      type: 'string'
    },
    displayName:  {
      type: 'string'
    },
    facebookId: {
      type: 'string'
    },
    linkedin:  {
      type: 'string'
    },
    yahoo:  {
      type: 'string'
    },
    userRole:  {
      type: 'array',
      defaultsTo : ['APP_CREATOR']
    },
    address:{
        type: 'string'
    },
    phone:{
        type: 'string'
    },
    resetToken:{
        type: 'array'
    },
    yourselfReason:{
      type: 'string'
    },
    lastLoginTime:{
      type : 'date'
    },
    isReminderSent:{
      type: 'boolean'
    },
    adagent:{
      type: 'string'
    },
    affid:{
      type: 'string'
    },
    loginCount:{
      type: 'integer'
    },
    mobile: {
        type: 'string'
    },
    country:{
        type: 'string'
    },
    beneficiaryName: {
        type: 'string'
    },
    bankCode: {
        type: 'string'
    },
    swiftCode:{
        type: 'string'
    },
    branchCode: {
        type: 'string'
    },
    branchName: {
        type: 'string'
    },
    accountNumber: {
        type: 'string'
    },
    loginPin: {
        type: 'string'
    },
    isMobileVerified: {
      type: 'boolean'
    },
    mobileVerificationPin: {
      type: 'string'
    },
    ideaBizPinServerRef: {
        type: 'string'
    },
    registrationStatus: {
      type: 'string'
    },    
    operator: {
        type: 'string' //This is the operator from config.IDEABIZ_USER_NETWORK_CLIENTS eg. config.IDEABIZ_USER_NETWORK_CLIENTS.Dialog.code
    },


    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },


  beforeCreate : function(values, next) {
    console.log(values);
    var facebookId = values['facebookId'];
    var googleId = values['googleId'];
    if(facebookId || googleId){
      console.log('facebook Id : '+facebookId);
      console.log('googleId : '+googleId);
      next();
    }else {
      Passwords.encryptPassword({
        password: values.password,
        difficulty: 10
      }).exec({
        error: function (err) {
          return res.negotiate(err);
        },
        success: function (hash) {
          values.password = hash;
          next();
        }
      });
    }

  }
  ,

  beforeUpdate : function(values, next) {
    if (typeof values.password !== 'undefined'){
      console.log("value"+values);
      Passwords.encryptPassword({
        password: values.password,
        difficulty: 10
      }).exec({
        error: function(err) {
          return res.negotiate(err);
        },
        success: function(hash) {
          values.password = hash;
          next();
        }
      });
   }else {
      next();
    }
  }


};

