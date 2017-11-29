const parameters = [
  {
    name: 'mongodbUri',
    required: true,
    environment: 'MONGODB_URI'
  }
];

module.exports.load = (overrides = {}) => {
  let config = {};
  for (let parameter of parameters) {
    const valueFromEnvironment = process.env[parameter.environment];
    if (parameter.required && valueFromEnvironment === undefined) throw new Error(`Required environment variable ${parameter.environment} not set!`);

    config[parameter.name] = valueFromEnvironment;
  }

  return {
    ...config,
    ...overrides
  };
};
