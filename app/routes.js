// native
const path = require('path');

// npm
const { Router } = require('express');

// mine
const { asyncMiddleware } = require('./utils');
const socialServices = require('../social.json');
const htmlRoot = path.join(__dirname, '..', 'html');
const visitors = require('./visitors');

const trackIncoming = async (req, res, next) => {
  next();
  await visitors.trackIncoming(req.get('referer'));
};
const trackOutgoing = async (req, res, next) => {
  const serviceName = req.params.social;
  const service = socialServices[serviceName];
  if (service === undefined) return res.boom.notFound();

  await visitors.trackOutgoing(serviceName);
  res.status(204).send();
};

const serveIndex = (_, res) => res.sendFile('index.html', { root: htmlRoot });
const serveRobotsFile = (_, res) => res.type('text/plain').send('User-agent: *\r\nAllow: /');
const serveTracking = async (_, res, next) => res.json(await visitors.getData());

const redirectToSocialService = (req, res) => {
  const serviceName = req.params.social;
  const service = socialServices[serviceName];
  if (service === undefined) return res.boom.notFound();

  res.redirect(service.url);
};

module.exports = () => {
  const router = Router();

  router.get('/', asyncMiddleware(trackIncoming));
  router.get('/', serveIndex);
  router.get('/on/:social', redirectToSocialService);
  router.post('/track/:social', asyncMiddleware(trackOutgoing));
  router.get('/robots.txt', serveRobotsFile);
  router.get('/tracking', asyncMiddleware(serveTracking));

  return router;
};
