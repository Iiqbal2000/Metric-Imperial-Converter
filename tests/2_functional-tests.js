const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

const endpoint = '/api/convert';

chai.use(chaiHttp);

/**
 * Convert a valid input such as 10L: GET request to /api/convert.
   Convert an invalid input such as 32g: GET request to /api/convert.
   Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
   Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
   Convert with no number such as kg: GET request to /api/convert.
 */

suite('Functional Tests', function() {
  test('Convert a valid input', (done) => {
    chai.request(server)
    .get(endpoint)
    .query({ input: '10L' })
    .end(function(err, res) {
      if (err) done(err)
      assert.equal(res.status, 200);
      const { returnNum, returnUnit } = res.body;
      assert.approximately(returnNum, 2.64172, 0.1);
      assert.equal(returnUnit, 'gal');
      done();
    });
  });

  test('invalid input', (done) => {
    chai.request(server)
    .get(endpoint)
    .query({ input: '32g' })
    .end((err, res) => {
      if (err) done(err)
      assert.equal(res.status, 200);
      assert.equal(res.text, 'invalid unit')
      done();
    })
  })

  test('Convert an invalid number with double slash', (done) => {
    chai.request(server)
    .get(endpoint)
    .query({ input: '3/7.2/4kg' })
    .end((err, res) => {
      if (err) done(err)
      assert.equal(res.status, 200);
      assert.equal(res.text, 'invalid number')
      done();
    })
  })

  test('Convert an invalid number AND unit', (done) => {
    chai.request(server)
    .get(endpoint)
    .query({ input: '3/7.2/4kilomegagram' })
    .end((err, res) => {
      if (err) done(err)
      assert.equal(res.status, 200);
      assert.equal(res.text, 'invalid number and unit')
      done();
    })
  })

  test('Convert with no number', (done) => {
    chai.request(server)
    .get(endpoint)
    .query({ input: 'kg' })
    .end((err, res) => {
      if (err) done(err)
      assert.equal(res.status, 200);
      const { returnNum, returnUnit } = res.body;
      assert.approximately(returnNum, 2.20462, 0.1);
      assert.equal(returnUnit, 'lbs');
      done();
    })
  })
});
