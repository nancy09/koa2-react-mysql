import Request from './../utils/request';

const chartApi = async (params) => {
  let result = await Request.get({
    url: '/api/getChartData.json',
    data: params
  });
  return result;
}

export { chartApi };