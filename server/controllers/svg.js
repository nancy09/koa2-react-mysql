module.exports = async (ctx) => {
  const title = 'svg'
  await ctx.render('svg', {
    title
  })
}