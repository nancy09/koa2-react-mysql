module.exports = async (ctx) => {
  const title = 'echarts'
  await ctx.render('chart', {
    title
  })
}