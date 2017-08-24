// native
const { parse } = require('url');

// theirs
const { send } = require('micro');

const trackedUrls = {};

module.exports.track = req => {
    const urlPath = parse(req.url).path;

    if(!trackedUrls[urlPath]) {
        trackedUrls[urlPath] = 1;
        return;
    }

    trackedUrls[urlPath]++;
};

module.exports.deliver = async (req, res) => {
    return await send(res, 200, trackedUrls);
};