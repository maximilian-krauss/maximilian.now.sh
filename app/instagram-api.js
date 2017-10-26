// Theirs
const axios = require('axios');

// Mine
const feedUrl = 'https://www.instagram.com/krauss.maximilian/media/';

module.exports = async () => {
  const instagramResult = await axios({ method: 'get', url: feedUrl });
};
