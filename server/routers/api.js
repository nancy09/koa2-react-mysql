/**
 * restful api 子路由
 */

const router = require('koa-router')()
const chartDataController = require('./../controllers/chart-data')

const routers = router
  .get('/getChartData.json', chartDataController.getChartData)
 
  
module.exports = routers
