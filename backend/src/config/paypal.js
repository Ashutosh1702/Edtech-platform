// config/paypal.js
const paypal = require('@paypal/checkout-server-sdk');

// PAYPAL_MODE = 'sandbox' | 'live'
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET');
  }

  if (process.env.PAYPAL_MODE === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }
}

function paypalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = {
  paypal,
  paypalClient,
};
