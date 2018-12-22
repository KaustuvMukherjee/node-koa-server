/*
 */
'use strict'
const process = require('./src/listeners/processListener.js')
const application = require('./app.js')
const koa = require('koa')
const koaRouter = require('koa-router')
const app = new koa()
const router = new koaRouter()


/*
 * Listen to the process events.
 */
process.listen()

/*
 * Run the application.
 */
application.run(app, router)
