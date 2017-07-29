// packages
const { send } = require('micro');
const { router, get } = require('microrouter');
const visualize = require('micro-visualize');

// ours
const static = require('./micro-static');
const html = require('./serve-html');
const socialServices = require('../social.json');

const serveNotFound = (req, res) => send(res, 404, { error: 'Not found' });

const goSocial = (req, res) => {
    const service = req.params.social;
    const url = socialServices[service];
    if(!url) {
        return serveNotFound(req, res);
    }

    res.setHeader('Location', url);

    return send(res, 302, url);
};

module.exports = router(
    visualize(get('/', html('index.html'))),
    visualize(get('/on/:social', goSocial)),
    visualize(static({
        source: './assets'
    })),
    visualize(get('/*', serveNotFound))
);