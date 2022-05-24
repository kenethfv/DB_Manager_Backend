const getBody = (event) => {
  if (event.isBase64Encoded === true) {
    return JSON.parse(Buffer.from(event.body, 'base64').toString('UTF-8'));
  }
  return JSON.parse(event.body);
};

module.exports = getBody;
