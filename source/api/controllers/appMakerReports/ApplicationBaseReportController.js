/**
 * ApplicationBaseReportController
 *
 * @description :: This is responsible for handling server side login for generating
 * application base reports
 *
 **/

var ERROR = { message: 'error'},
    NOT_FOUND = { message: 'not_found'};


module.exports = {


    /**
     * @description :: Get details of application creators
     **/
    getAppCreators: function (req, res) {

        /**
         * Select criteria for getting users' data of users whose userRole is equals to 'beta'
         * 'beta' should be changed according to role of the AppCreator
         **/
        var criteria = {  where: { userRole: { contains: 'beta' }}, select: [ 'email', 'firstName', 'lastName' ]};

        User.find(criteria).exec(function (err, users) {

            if (err) {
                sails.log.error('Error occurred getting beta users list , error: '+ err);
                return res.send(ERROR);
            }
            return res.send({ message: 'success', users: users });

        });
    },

    /**
     * @description :: Get details of all applications of individual app creator
     *
     * @param req :: {
     *
     *          userId : app creators user id
     *
     *          }
     * @param res :: {
     *
     *          message : status message
     *          applications: applications details
     *
     *          }
     **/
    getApplications: function (req, res) {

        var userId = req.param('userId'),
            criteria = { userId: userId };

        Application.find(criteria).exec(function (err, applications) {

            if (err) {
                sails.log.error('Error occurred getting applications details of app creator , error: '+ err);
                return res.send(ERROR);
            }
            return res.send({ message: 'success', applications: applications });
        });
    },



    /*
    *SubscriptonPayments
    */

   getSubscriptionPayments :function(req, res) {

        SubscriptionPayment.find().exec(function (errOne, payments){
        var paymnt = [];
            if(errOne){
                return res.send(errOne);
            }else{
                if (payments){
                    Application.find().exec(function (errTwo, appData){
                      
                         if(appData){
                            payments.forEach(function (pay){
                                appData.forEach(function (apdata){
                                    if(apdata.id == pay.appId){
                                        pay.appName = apdata.appName
                                        paymnt.push(pay);

                                       
                                    }
                                });
                            })
                        }
                            return res.send(paymnt);
                        if(errTwo){
                           return  res.send(errTwo);
                        }
                       
                    });
    
                  
                }
            }
 

        });

   }

	
};

