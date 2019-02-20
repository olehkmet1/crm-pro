module.exports = (app) => {
    const employees = require('../controllers/employees.controller.js');


    app.post('/employees', employees.create);

    app.get('/employees', employees.find);

    app.get('/employees/:employeeId', employees.findOne);

    app.put('/employees/:employeeId', employees.update);

    app.delete('/employees/:employeeId', employees.delete);
}