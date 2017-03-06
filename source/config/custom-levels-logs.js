 var log4js = require('log4js');
 log4js.loadAppender('file');
 log4js.addAppender(log4js.appenders.file('transaction.log'), 'Transaction');
 TansactionLogger = log4js.getLogger('Transaction');
 TansactionLogger.setLevel('info');