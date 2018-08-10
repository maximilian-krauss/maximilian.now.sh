// Npm
const Hapi = require('hapi')

// Mine
const routes = require('./routes')
const config = require('./config')
const logger = require('./logger')

const registerRoutes = async server => {
  await routes.register(server)
}

const registerPlugins = async server => {
  await server.register(require('inert'))
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      instance: logger
    }
  })
}

const prepareApp = async () => {
  const server = Hapi.server({
    port: config.port
  })

  await registerPlugins(server)
  await registerRoutes(server)

  return server
}

module.exports = prepareApp
