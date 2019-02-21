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
          name: "The Lord of the Ringsss",
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

describe('/GET/:id employee', () => {
  it('it should GET an employee by the given id', (done) => {
    let employee = new Employee({ 
          name: "The Lord of the Ringsss",
          avatar: "https://1.fwcdn.pl/p/36/74/53674/374351.1.jpg",
          active: true,
          department: 'Front-End',
          position: 'Junior',
          skills: ["Angular", "React"]
    });
    employee.save((err, book) => {
        chai.request(server)
        .get('/employees/' + employee.id)
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
            res.body.should.have.property('_id').eql(employee.id);
          done();
        });
    });

  });
});

describe('/PUT/:id employee', () => {
  it('it should UPDATE an employee given the id', (done) => {
    let employee = new Employee({
          name: "The Lord of the Rings",
          avatar: "https://1.fwcdn.pl/p/36/74/53674/374351.12.jpg",
          active: true,
          department: 'Front-End',
          position: 'Junior',
          skills: ["Angular", "React"]
    })
    employee.save((err, employee) => {
            chai.request(server)
            .put('/employees/' + employee.id)
            .send({
              name: "The Lord 22of the Rings",
              avatar: "https://1.fwcdn.pl/p/36/74/53674/374351.1.jpg",
              active: true,
              department: 'Front-En22',
              position: 'Middle',
              skills: ["Angular2", "React"]
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.book.should.have.property('position').eql('Middle');
              done();
            });
      });
  });
});

});