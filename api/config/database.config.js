if(process.env.NODE_ENV == 'dev') {
    mongoURI = 'mongodb://localhost:27017/crm-pro'
} else if(process.env.NODE_ENV = 'test') {
    mongoURI = 'mongodb://localhost:27017/test-crm-pro'
} else if(process.env.NODE_ENV == 'production') {
    mongoURI = 'mongodb://localhost:27017/crm-pro'
}

module.exports = {
    url: mongoURI
};