/*
 * Class - Middleware
 */
'use strict'
const winston = require('../config/winston')
const morgan = require('morgan')
const bodyParser = require('body-parser')

class Middleware {
    static initialize(app) {
        app.use(morgan('tiny', { stream: winston.infoStream }))
        app.use(bodyParser.json())
        winston.info('Middlewares initialized.....')
    }
}

module.exports = Middleware
