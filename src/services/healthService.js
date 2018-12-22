/*
 * Generic health response in Cloud Foundry.
 */
'use strict'
const instanceIndex = process.env.CF_INSTANCE_INDEX

class HealthService {
    static async up() {
        return {
            status: 'UP'
        }
    }

    static async down() {
        return {
            status: 'DOWN'
        }
    }
}

module.exports = HealthService
