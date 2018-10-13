/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const chart = require('./chart')
const svg = require('./svg')

router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/chart', chart.routes(), chart.allowedMethods())
router.use('/svg', svg.routes(), svg.allowedMethods())

module.exports = router


