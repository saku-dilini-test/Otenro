

var Passwords = require('machinepack-passwords');
module.exports = {

    schema: true,
    attributes: {
        userId:{
            type: 'string'
        },
        appId: {
            type: 'string',
            required: true,
            model: 'Application'
        },
        category :{
            type: 'string'
        },
        title:{
            type: 'string'
        },
        shortDescription:{
            type: 'string'
        },
        language:{
            type: 'string'
        },
        primaryCategory:{
            type: 'string'
        },
        secondaryCategory:{
            type: 'string'
        },
        fullDescription:{
            type: 'string'
        },
        applicationType: {
            type:'string'
        },
        contentRating : {
            type:'string'
        },
        email : {
            type:'string'
        },
        appType : {
            type: 'string' 
        },
        isNew : {
            type: 'boolean'
        },
        copyrights:{
            type: 'string'
        },
        marketingUrl:{
            type: 'string'
        },
        privacyPolicyUrl:{
            type: 'string'
        },
        supportUrl:{
            type: 'string'
        },
        alcoholViolence:{
            type: 'string'
        },
        cartoonViolence:{
            type: 'string'
        },
        gamblingViolence:{
            type: 'string'
        },
        horrorViolence:{
            type: 'string'
        },
        matureViolence:{
            type: 'string'
        },
        nudityViolence:{
            type: 'string'
        },
        profanityViolence:{
            type: 'string'
        },
        realisticViolence:{
            type: 'string'
        },
        firstName : {
            type : 'string'
        },
        lastName : {
            type : 'string'
        },
        phoneNumber :{
            type : 'integer'
        },
        demoAccountUser : {
            type : 'string'
        },
        password: {
            type : 'string'
        },
        createdDate:{
            type: 'date'
        },
        name:{
            type: 'string'
        },
        springBoardName:{
            type: 'string'
        },
        primaryCat:{
            type: 'string'
        },
        secondaryCat:{
            type: 'string'
        },
        desc:{
            type: 'string'
        },
        keywords:{
            type: 'string'
        },
        serviceID : { //Use to identify the app when call through the admin api by Ideabiz
            type : 'string'
        },
        keyword:{
            type: 'string'
        },
        port:{
            type: 'string'
        },
        price:{
            type: 'string'
        },
        operators:{
            type: 'json'
        },
        comment:{
            type: 'string'
        },
        publishStatus:{
            type: 'string'
        },
        cashTaxable :{
            type: 'boolean',
            defaultsTo : false
        },
        playstoreLink:{
            type: 'string'
        },

        toJSON: function() {
          var obj = this.toObject();
          delete obj.password;
          return obj;
        }
    },

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