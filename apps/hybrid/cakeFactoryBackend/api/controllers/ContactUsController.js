/**
 * ContactUsController
 *
 * @description :: Server-side logic for managing contactuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-extra'),
  email = require("../../node_modules/emailjs/email");

var host,link;
var server  = email.server.connect({
  user:    "orders@verticalmedia.lk",
  password :"YDUyfsdhduis**S&f83-2",
  host     :"localhost",   // This should be as 'verticalmedia.lk' when local testing
  ssl     :  false,
  port    : '25'
});


var orderEmail = 'galapitage@gmail.com';
//var orderEmail = 'amila@onbitlabs.com';

module.exports = {

  create: function(req,res) {
    var data = req.body;

    var desPath = sails.config.appPath +'/userSubmitImage/';
    if(data.imageUrl != 'null'){

      ContactUs.create(data).exec(function (err, contact) {
        if (err) {
          return res.status(err.status).json({err: err.message});
        }
        desPath = desPath +'/' + contact.id +'/' ;
        req.file('file').upload({
          dirname: require('path').resolve(desPath)
        },function (err, uploadFile) {
          if (err) return res.send(500, err);
          fs.rename(uploadFile[0].fd, desPath + req.body.imageUrl, function (err) {
            if (err) return res.send(err);

            var imageUrl = desPath + req.body.imageUrl;

            var phone = '';
            if(contact.phone){
              phone = "<ul>Phone : "+contact.phone+"</ul>"
            }
            var emailBody = "<html>" +
              "<h4> Title : "+contact.title+" </h4>"+
              "<ul> Name : "+contact.name+"</ul>"+
              "<ul> Email : "+contact.email+"</ul>"+
              phone+
              "<ul> Image : "+contact.imageUrl+"</ul>"+
              "<ul> Comment : </ul>"+
              "<ul>"+contact.msg+"</ul>"+
              "</html>";
            var emailDetails = {
              from: "orders@verticalmedia.lk",
              to: orderEmail,
              cc: "onbilabsttest@gmail.com",
              bcc: '',
              subject: "New Contact Request : "+contact.title,
              attachment: [
                {data: emailBody, alternative: true},
                {path:imageUrl, type:"application/jpg", name: req.body.imageUrl}
              ]
            };
            server.send(emailDetails, function (err, message) {
                sails.log('Contact Us email send by Id : ' + contact.id);
            });

            return res.json(200, {result: contact});
          });
        });
      });
    }else{
      ContactUs.create(data).exec(function (err, contact) {
        if (err) {
          return res.status(err.status).json({err: err.message});
        }
        var phone = '';
        if(contact.phone){
          phone = "<ul>Phone : "+contact.phone+"</ul>"
        }
        var emailBody = "<html>" +
          "<h4> Title : "+contact.title+" </h4>"+
          "<ul> Name : "+contact.name+"</ul>"+
          "<ul> Email : "+contact.email+"</ul>"+
            phone+
          "<ul> Comment : </ul>"+
          "<ul>"+contact.msg+"</ul>"+
          "</html>";
        var emailDetails = {
          from: "orders@verticalmedia.lk",
          to: orderEmail,
          cc: "onbilabsttest@gmail.com",
          bcc: '',
          subject: "New Contact Request : "+contact.title,
          attachment: [
            {data: emailBody, alternative: true},
          ]
        };
        server.send(emailDetails, function (err, message) {
          sails.log(err || message);
          sails.log('Contact Us email send by Id : '+contact.id);
        });
        return res.json(200, {result: contact});
      });
    }
  }
};

