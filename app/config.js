const parameters = [
  {
    name: 'port',
    required: true,
    environment: 'PORT'
  }
]

const getAppConfig = (overrides = {}) => {
  const config = {}
  for (const parameter of parameters) {
    const valueFromEnvironment = process.env[parameter.environment]
    if (parameter.required && valueFromEnvironment === undefined) {
      throw new Error(`Required environment variable ${parameter.environment} not set!`)
    }

    config[parameter.name] = valueFromEnvironment
  }

  return {
    ...config,
    ...overrides
  }
}

const appConfig = getAppConfig()

module.exports = appConfig
