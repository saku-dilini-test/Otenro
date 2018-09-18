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
    role:  {
      type: 'string'
    },
    streetNumber:{
        type: 'string'
    },
    streetName:{
        type: 'string'
    },
    zip:{
        type: 'string'
    },
    city:{
        type: 'string'
    },
    province:{
        type: 'string'
    },
    country:{
        type: 'string'
    },
    appId:{
        type: 'string'
    },
    phone:{
        type: 'string'
    },
    regToken:{
        type: 'string'
    },
    isEmailVerified:{
        type: 'boolean',
        defaultsTo: false
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
//
//  ,
//
//  beforeUpdate : function(values, next) {
//    console.log("value");
//    console.log(values);
//    if(values.password){
//    Passwords.encryptPassword({
//      password: values.password,
//      difficulty: 10
//    }).exec({
//      error: function (err) {
//        return res.negotiate(err);
//      },
//      success: function(hash) {
//        values.password = hash;
//        next();
//      }
//    });
//    }
//  }
};

