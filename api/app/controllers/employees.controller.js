const Employee = require('../models/employees.model.js');

exports.create = (req, res) => {

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

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

exports.find = (req, res) => {

    let appliedFilters = [];
    let filter = {}
    let skills;

    if (!isEmpty(req.query)) {
        for (let key in req.query) {
            if(req.query.hasOwnProperty('skills')) {
                skills = req.query[key].split(',');
                skills = ['Angular', 'React'];
                appliedFilters.push({ [key]: { $eq: skills.map(item => {
                    console.log(item);
                    return item
                })}} )
            } else {
            appliedFilters.push({ [key]: { $regex: new RegExp("^" + req.query[key].toLowerCase(), "i") } })
            }
        }
        filter = {
            $and: appliedFilters
        }
    }

    Employee.find(filter)
        .then(employees => {
            console.log(req.query, 22)
            res.send(employees);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving employees."
            });
        });
};

exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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

    Employee.findByIdAndUpdate(req.params.employeeId, {
        name: req.body.name,
        avatar: req.body.avatar,
        active: req.body.active,
        department: req.body.department,
        position: req.body.position,
        skills: req.body.skills
    }, { new: true })
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "employee not found with id " + req.params.employeeId
                });
            }
            res.send({ message: "Employee deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Could not delete employee with id " + req.params.employeeId
            });
        });
};
