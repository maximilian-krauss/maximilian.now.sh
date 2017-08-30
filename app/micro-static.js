// native
const path = require('path');

// packages
const { existsAsync, readFileAsync } = require('fs-extra-promise');
const mime = require('mime-types');
const { send } = require('micro');
const etag = require('etag');
const compress = require('micro-compress');

const defaultOptions = {
    source: undefined
};

module.exports = (opts) => {
    const options = Object.assign({}, defaultOptions, opts);
    if(options.source === undefined) throw new Error('options.source must be set');

    return async (req, res) => {
        const asset = req.params.asset;
        const filePath = path.join(options.source, asset);
        const fileExists = await existsAsync(filePath);
        
        if(!fileExists) {
            return send(res, 404, { error: `Asset '${asset}' is not available` });
        }
        const fileContents = await readFileAsync(filePath);

        res.setHeader('Content-Type', mime.lookup(filePath));
        res.setHeader('ETag', etag(fileContents));

        return compress(send(res, 200, fileContents));
    };
};