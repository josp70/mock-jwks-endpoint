/* eslint no-process-env: "off" */

const endpoint = require('.');

endpoint.start(process.env.PORT || 0);
