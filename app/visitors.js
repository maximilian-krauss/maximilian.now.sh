// Mine
const { singleOrDefault } = require('./utils');
const socialServices = require('../social.json');
const backend = require('./visitors.backend');

const getSocialServiceBy = referer =>
  singleOrDefault(Object.keys(socialServices).map(key => Object.assign({ name: key }, socialServices[key])), item =>
    new RegExp(item.referer, 'ig').test(referer)
  );

module.exports.trackIncoming = async referer => {
  if (referer === undefined) {
return;
}

  const socialService = getSocialServiceBy(referer);
  if (socialService === undefined) {
return;
}

  await backend.incrementIncoming(socialService.name);
};

module.exports.trackOutgoing = async service => await backend.incrementOutgoing(service);

module.exports.getData = async () => await backend.getData();
