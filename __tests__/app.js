'use strict'
const process = require('../src/listeners/processListener.js')
const application = require('../app.js')
const koa = require('koa')
const koaRouter = require('koa-router')
const app = new koa()
const router = new koaRouter()
const request = require('supertest')

describe('Loading server', () => {
    beforeEach(() => {
        process.listen()
        application.run(app, router)
    })

    afterEach(() => {
        application.close()
    })

    it('Verifying /health', function testSlash(done) {
        request(global.server)
            .get('/health')
            .expect(200, { status: 'UP' }, done)
    })

})
