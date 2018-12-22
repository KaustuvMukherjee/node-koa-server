/*
 *
 */
'use strict'
var winston = require('winston')

// define the custom settings for each transport (file, console)
var options = {
    consoleDebug: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: false,
    },
    consoleInfo: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: false,
    },
    consoleError: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: false,
    }
}

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.consoleInfo)
    ],
    exitOnError: false, // do not exit on handled exceptions
})

logger.debugStream = {
    write: function(message, encoding) {
        logger.debug(message)
    },
}

logger.infoStream = {
    write: function(message, encoding) {
        logger.info(message)
    },
}

logger.errorStream = {
    write: function(message, encoding) {
        logger.error(message)
    },
}

module.exports = logger
