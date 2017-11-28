const path = require('path');

const { Router } = require('express');

const socialServices = require('../social.json');

const htmlRoot = path.join(__dirname, '..', 'html');

module.exports = () => {
  const router = Router();

  router.get('/', (req, res) =>
    res.sendFile('index.html', {
      root: htmlRoot
    })
  );

  router.get('/on/:social', (req, res) => {
    const url = socialServices[req.params.social];

    return url === undefined ? res.boom.notFound() : res.redirect(url);
  });

  router.get('/robots.txt', (req, res) => res.type('text/plain').send('User-agent: *\r\nAllow: /'));

  return router;
};
