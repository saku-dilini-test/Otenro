///**
// * Built-in Log Configuration
// * (sails.config.log)
// *
// * Configure the log level for your app, as well as the transport
// * (Underneath the covers, Sails uses Winston for logging, which
// * allows for some pretty neat custom transports/adapters for log messages)
// *
// * For more information on the Sails logger, check out:
// * http://links.sailsjs.org/docs/config/log
// */
//
////const { createLogger, format, transports } = require('winston');
////const { combine, timestamp, label, printf,colorize } = format;
////var moment = require('moment-timezone');
//
////const myCustomLevels = {
//// levels: {
////     error: 0,
////     warn: 1,
////     info: 2,
////     http: 3,
////     sql: 4,
////     debug: 5
////   },
////   colors: {
////     error: "red",
////     warn: "darkred",
////     info: "black",
////     http: "green",
////     sql: "blue",
////     debug: "gray"
////   }
////};
//
////const myFormat = printf(info => {
////  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
////});
//
//
////const appendTimestamp = format((info, opts) => {
////  if(opts.tz)
////    info.timestamp = moment().tz(opts.tz).format();
////  return info;
////});
//
//var logger = createLogger({
////levels: myCustomLevels.levels,
//
////  format: combine(
////    appendTimestamp({ tz: 'Asia/Colombo' }),
////    myFormat,
////    colorize()
////  ),
////  transports: [
////  new transports.Console({
////        colorize: true,
////        handleExceptions: true
////  }),
////  new transports.File({
////        name: 'info-file',
////        level: 'info',
////        filename: 'combined.log',
////        colorize: true,
////        handleExceptions: true
////  }),
////  new transports.File({
////        name: 'error-file',
////        filename: 'error.log',
////        level: 'warn',
////        colorize: true,
////        handleExceptions: true
////  })
////
////  ],
//    exceptionHandlers: [
//      new transports.File({ filename: 'exceptions.log' })
//    ]
//});
//
//module.exports.logging = {
//
////   Valid `level` configs:
////   i.e. the minimum log level to capture with sails.log.*()
////
////   'error'	: Display calls to `.error()`
////   'warn'	: Display calls from `.error()` to `.warn()`
////   'debug'	: Display calls from `.error()`, `.warn()` to `.debug()`
////   'info'	: Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
////   'verbose': Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`
//
//  log: {
//    level: 'info'
//  },
//    custom: logger,
////    level: 'silly'
//
//};
