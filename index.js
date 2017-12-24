const express = require('express');
const jwksDb = require('jwks-db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/make_jws', (req, res) => {
  // check for payload & options

  jwksDb.generateJWS(req.body.payload)
  .then((token) => {
    res.json({token});
  });
});

app.get('/.well-known/jwks.json', (req, res) => {
  res.json(jwksDb.get().toJSON());
});

let server = null;

function start(port) {
  return jwksDb.connect()
  .then(() => new Promise((resolve) => {
    server = app.listen(port || 0, () => {
      console.log(`server JWKS listening on port ${server.address().port}`);
      resolve(server);
    });
  }));
}

function baseUrl() {
  return `http://127.0.0.1:${server.address().port}`;
}

function wellKnown() {
  return `${baseUrl()}/.well-known/jwks.json`;
}

function close() {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        console.log('close failed:', err.message);
        reject(err);
      } else {
        console.log('server JWKS closed');
        resolve();
      }
    });
  });
}

exports.start = start;
exports.close = close;
exports.baseUrl = baseUrl;
exports.wellKnown = wellKnown;
