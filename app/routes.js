module.exports.register = async server => {
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: async (request, h) => {
      return h.redirect('https://max.krauss.io')
    }
  })
}
