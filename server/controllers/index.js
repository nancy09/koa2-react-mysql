module.exports = async(ctx) => {
  const title = 'index'
  await ctx.render('index', {
    title
  })
}