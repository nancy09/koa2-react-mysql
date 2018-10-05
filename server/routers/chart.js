/**
 * 主页子路由
 */

const router = require('koa-router')()
const chart = require('../controllers/chart')

module.exports = router.get('/', chart)
