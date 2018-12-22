/*
 * Class - HealthController
 */
'use strict'
const winston = require('../config/winston')
const HealthService = require('../services/healthService')

class HealthController {
    static async validateHealthRequest(ctx, next) {
        winston.info('HealthController.validateHealthRequest called...')
        next('route')
    }
    static async getHealth(ctx, next) {
        winston.info('HealthController.getHealth called...')
        ctx.status = 200
        ctx.body = await HealthService.up()
    }
}

module.exports = HealthController
