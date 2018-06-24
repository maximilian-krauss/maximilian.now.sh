// Npm
const { notFound } = require('boom');

// Mine
const socialServices = require('../social.json');
const visitors = require('./visitors');

module.exports.register = async server => {
  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const { referer } = request.headers;
      await visitors.trackIncoming(referer);

      return h.file('html/index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: 'assets'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/on/{social}',
    handler: async (request, h) => {
      const serviceName = request.params.social;
      const service = socialServices[serviceName];
      if (service === undefined) {
return notFound();
}

      return h.redirect(service.url);
    }
  });

  server.route({
    method: 'POST',
    path: '/track/{social}',
    handler: async (request, h) => {
      const serviceName = request.params.social;
      const service = socialServices[serviceName];
      if (service === undefined) {
return notFound();
}

      await visitors.trackOutgoing(serviceName);
      return h.response().code(204);
    }
  });

  server.route({
    method: 'GET',
    path: '/tracking',
    handler: async () => visitors.getData()
  });

  server.route({
    method: 'GET',
    path: '/robots.txt',
    handler: () => 'User-agent: *\r\nAllow: /'
  });
};
