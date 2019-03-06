const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('site', () => {
  it('Should create an article', (done) => {
    chai
      .request(app)
      .post('/api/news')
      .send({
        title: 'test title',
        date: '1234-00-00',
        description: 'test description',
        picture: 'test picture',
        pictureDescription: 'test picture description',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(201);
        return done();
      });
  });
  it('Should read all articles', (done) => {
    chai
      .request(app)
      .get('/api/news')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done();
      });
  });
});
