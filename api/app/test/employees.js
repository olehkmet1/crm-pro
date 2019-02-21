process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Employee = require('../models/employees.model');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Employees', () => {
    beforeEach((done) => {
        Employee.deleteMany({}, (err) => { 
           done();         
        });     
    });

  describe('/GET employees', () => {
      it('it should GET all the employees', (done) => {
        chai.request(server)
            .get('/employees')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST employee', () => {
    it('it should not POST a employee without enough data', (done) => {
      let employee = {
          name: "The Lord of the Rings",
          avatar: "https://1.fwcdn.pl/p/36/74/53674/374351.1.jpg",
          active: true,
          department: 'Front-End',
          position: 'Junior',
          skills: ["Angular", "React"]
      }
      chai.request(server)
          .post('/employees')
          .send(employee)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('skills');
              res.body.should.have.property('name');
              res.body.should.have.property('avatar');
              res.body.should.have.property('active');
              res.body.should.have.property('department');
              res.body.should.have.property('position');
            done();
          });
    });

});

});