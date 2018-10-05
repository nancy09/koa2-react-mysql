
const chartModel = require('./../models/chart-data');

module.exports = {
  async getChartData(ctx) {
    let formData = ctx.request.body;
    // console.log(ctx.request)
    let chartData = await chartModel.getData(formData);
    let result = {
      data: chartData
    };
    ctx.body = result;
  }
}