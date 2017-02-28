/**
 * Created by prasanna on 2/28/17.
 */
module.exports = {
    
    tansactionLog: function (req, res) {
        Template.find().exec(function (err, template) {
            if (err) res.send(err);
            TansactionLogger.info('logging from your IoC container-based logger');
            res.send(template);
        });
    }
}