const dbUtils = require('./../utils/db-util');

const chart = {
  async getData(options = {}) {
    let _sql = `
    select * from (
    select * from sensor_data order by ds desc) aa order by ds`;
    let result = await dbUtils.query(_sql);
    // console.log('result', result)
    if (Array.isArray(result) && result.length > 0) {
      result = result;
    } else {
      result = null;
    }
    return result;
  }
}
module.exports = chart;