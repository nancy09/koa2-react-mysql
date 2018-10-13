/**
 * 主页子路由
 */

const router = require('koa-router')()
const svg = require('../controllers/svg')

module.exports = router
  .get('/', svg)
