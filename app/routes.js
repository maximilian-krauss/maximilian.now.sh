module.exports.register = async server => {
  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      return h.redirect('https://max.krauss.io')
    }
  })
}
