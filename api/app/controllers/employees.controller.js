const Employee = require('../models/employees.model.js');

exports.create = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }


    const employee = new Employee({
        name: req.body.name,
        avatar: req.body.avatar,
        active: req.body.active,
        department: req.body.department,
        position: req.body.position,
        skills: req.body.skills
    });


    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Employee."
        });
    });
};


exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving lessons."
        });
    });
};


exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.employeeId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }


    Employee.findByIdAndUpdate(req.params.employeeId, {
        name: req.body.name,
        avatar: req.body.avatar,
        active: req.body.active,
        department: req.body.department,
        position: req.body.position,
        skills: req.body.skills
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeId
        });
    });
};


exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
    .then(lesson => {
        if(!lesson) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.employeeId
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.employeeId
        });
    });
};