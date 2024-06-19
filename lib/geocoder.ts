/* eslint-disable @typescript-eslint/no-var-requires */
const NodeGeocoder = require('node-geocoder');
import NodeFetch from 'node-fetch';

const options = {
  fetch: NodeFetch,
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
