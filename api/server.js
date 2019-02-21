const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt    = require('jsonwebtoken');
const jwtConfig = require('./config/jwt.config');

require('dotenv').load();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("CRM Pro API");
});

require('./app/routes/employees.routes.js')(app);

let port = process.env.port || 3000;

app.listen(port, () => {
    console.log("Server is listening on port 3000");
});

module.exports = app