/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');

const should = chai.should();
chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const User = require('../models/user');

describe('User', () => {
  // Should not log in not existing user
  it('should not be able to login if they have not registered', (done) => {
    agent.post('/login', { username: 'wrong', password: 'nope' }).end((err, res) => {
      res.status.should.be.equal(401);
      done();
    });
  });

  // signup
  it('should be able to signup', (done) => {
    User.findOneAndDelete({ username: 'testone' }, () => {
      agent
        .post('/sign-up')
        .send({ username: 'testone', password: 'password' })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          agent.should.have.cookie('nToken');
          done();
        });
    });
  });

  after(() => {
    agent.close();
  });
});
