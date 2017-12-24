/* eslint no-process-env: "off" */
/* global beforeEach, afterEach, describe, it */
/* eslint global-require: "off" */

process.env.NODE_ENV = 'test';

const service = require('../');
const chai = require('chai');

chai.should();
chai.use(require('chai-as-promised'));

const {expect} = chai;
const request = require('request-promise-native');

describe('MOCK-JWKS-ENDPOINT', () => {
  beforeEach('START SERVER', () => service.start());
  afterEach('STOP SERVER', () => service.close());

  it('GET /.well-known/jwks.json',
  () => expect(request({
    uri: service.wellKnown(),
    json: true
  }))
  .to.eventually.have.property('keys')
  .that.is.an('array'));

  it('CREATE a JWS /make_jws',
  () => expect(request({
    method: 'POST',
    uri: `${service.baseUrl()}/make_jws`,
    body: {
      payload: {
        admin: true,
        sub: 'user@gmail.com'
      }
    },
    json: true
  }))
  .to.eventually.have.property('token')
  .that.is.a('string'));

  it('/make_jws fail on invalid body',
  () => request({
    method: 'POST',
    uri: `${service.baseUrl()}/make_jws`,
    body: 'invalid',
    json: true
  }).should.be.rejected);

  it('FAIL ON CLOSE',
  () => service.close()
  .then(() => service.close().should.be.rejected)
  .then(() => service.start().should.be.fulfilled));
});
