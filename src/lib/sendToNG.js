const axios = require('axios');

const sendToBotNG = async (webhook, data) => {
  const logPrefix = `Send To Bot for ${data}`;

  let resWebhook = null;

  try {
    console.info(`${logPrefix} with ${JSON.stringify(webhook)}`);

    const url = webhook;
    const options = {
      method: 'POST',
      baseURL: url,
      responseType: 'json',
      data,
    };
    const res = await axios(options);
    console.info(`${logPrefix} response from ${url}: `, res);
    if (res) {
      resWebhook = await res.data;
      console.log(`resWebhook ${resWebhook}`);
    }
  } catch (error) {
    console.error(error);
  }

  return resWebhook;
};

module.exports = {
  sendToBotNG,
};
