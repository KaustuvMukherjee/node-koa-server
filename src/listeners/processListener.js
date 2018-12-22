/*
 * Class - ProcessListener
 */
'use strict'
const winston = require('../config/winston')

class ProcessListener {
    static listen() {
        process.on('exit', (code) => {
            winston.info(`EXIT CODE ${code}`)
        })
        //
        process.on('message', (msg) => {
            winston.info(`MESSAGE: ${msg}`)
        })
        //
        process.on('rejectionHandled', (reason, promise) => {
            winston.info(`REJECTION HANDLED at: ${promise} reason: ${reason}`)
        })
        //
        process.on('uncaughtException', (err) => {
            winston.info(`UNCAUGHT EXCEPTION: ${err}`)
        })
        //
        process.on('unhandledRejection', (reason, promise) => {
            winston.info(`UNHANDLED REJECTION at: ${promise} reason: ${reason}`)
        })
        //
        process.on('warning', (warning) => {
            winston.info(`WARNING: ${warning}`)
        })
        winston.info('ProcessListeners started.....')
    }
}

module.exports = ProcessListener
