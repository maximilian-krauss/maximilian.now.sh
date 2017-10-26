// Native
const { parse } = require('url');

// Theirs
const { send } = require('micro');

const trackedUrls = {};
const trackedReferer = {};

const addOrIncrement = (source, item) => {
  if (item === undefined) {
    return;
  }

  if (!source[item]) {
    source[item] = 1;
    return;
  }
  source[item]++;
};

module.exports.track = req => {
  const urlPath = parse(req.url).path;
  const referer = req.headers.referer;
  const host = req.headers.host;
  const hostRegex = new RegExp(`^(.*)${host}(.*)$`, 'ig');

  addOrIncrement(trackedUrls, urlPath);

  if (!hostRegex.test(trackedReferer)) {
    console.log(host);
    addOrIncrement(trackedReferer, referer);
  }
};

module.exports.deliver = async (req, res) => {
  return send(res, 200, {
    trackedUrls,
    trackedReferer
  });
};
