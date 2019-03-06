// /* eslint-disable no-undef */
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../server');

// const should = chai.should();
// chai.use(chaiHttp);

// // Agent that will keep track of our cookies
// const agent = chai.request.agent(server);

// const User = require('../models/user');


// describe('User', () => {
//   // TESTS WILL GO HERE

//   it('should not be able to login if they have not registered', (done) => {
//     agent.post('/login', { email: 'wrong@wrong.com', password: 'nope' }).end((err, res) => {
//       res.status.should.be.equal(401);
//       done();
//     });
//   });


//   // signup
//   it('should be able to sign up', (done) => {
//     User.findOneAndRemove({ username: 'testone' }, () => {
//       agent
//         .post('/sign-up')
//         .send({ username: 'testone', password: 'password' })
//         .end((err, res) => {
//           console.log(res.body);
//           res.should.have.status(200);
//           agent.should.have.cookie('nToken');
//           done();
//         });
//     });
//   });
//   // login
//   it('should be able to login', (done) => {
//     agent
//       .post('/login')
//       .send({ username: 'testone', password: 'password' })
//       .end((err, res) => {
//         res.should.have.status(200);
//         agent.should.have.cookie('nToken');
//         done();
//       });
//   });
//   // logout
//   it('should be able to logout', (done) => {
//     agent.get('/logout').end((err, res) => {
//       res.should.have.status(200);
//       agent.should.not.have.cookie('nToken');
//       done();
//     });
//   });

//   after(() => {
//     agent.close();
//   });
// });
