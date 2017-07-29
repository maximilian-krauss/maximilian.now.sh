//native
const path = require('path');
const { parse } = require('url');

//packages
const { existsAsync, readFileAsync } = require('fs-extra-promise');
const mime = require('mime-types');
const { send } = require('micro');

const defaultOptions = {
    prefix: '/static',
    source: undefined
};

const cleanPath = (prefix, path) => path.replace(prefix, '');

module.exports = (opts) => {
    const options = Object.assign({}, defaultOptions, opts);
    if(options.source === undefined) throw new Error('options.source must be set');

    return async (req, res) => {
        const requestUrl = parse(req.url);
        if(!requestUrl.path.startsWith(options.prefix)) return;

        const filePath = path.join(options.source, cleanPath(options.prefix, requestUrl.path));
        const fileExists = await existsAsync(filePath);

        if(!fileExists) {
            return send(res, 404, { error: 'page not found' });
        }
        const fileContents = await readFileAsync(filePath);

        res.setHeader('Content-Type', mime.lookup(filePath));

        return send(res, 200, fileContents);
    };
};