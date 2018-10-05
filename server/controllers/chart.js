module.exports = async (ctx) => {
  const title = 'chart'
  await ctx.render('chart', {
    title
  })
}