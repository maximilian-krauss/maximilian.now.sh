// Native
const path = require('path');

// Packages
const {readFileAsync} = require('fs-extra-promise');
const {send} = require('micro');
const compress = require('micro-compress');

module.exports = fileName => {
  return async (req, res) => {
    const filePath = path.join('./html', fileName);
    res.setHeader('Content-Type', 'text/html');

    const fileContents = await readFileAsync(filePath, 'utf-8');

    return compress(send(res, 200, fileContents));
  };
};
