
module.exports = {

    addLandingPageDetails : function(req,res){
    console.log(req.body);

         AppMakerUser.findOne({email: req.body.email}, function (err, user) {
              if (err) return res.negotiate(err);
              if (user) return res.json('already exists');
              var newUserDetails = {
                  name : req.body.name,
                  email     : req.body.email,
                  contactNo : req.body.contactNo,
              };

              AppMakerUser.create(newUserDetails).exec(function(err, user) {
                  if (err) {
                      return res.negotiate(err);
                  }
                  if (user) {
                      res.send('ok');
                  }
              });
         });
    }

}