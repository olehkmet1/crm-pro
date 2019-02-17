module.exports = (app) => {
    const lessons = require('../controllers/lesson.controller.js');


    app.post('/lessons', lessons.create);


    app.get('/lessons', lessons.findAll);


    app.get('/lessons/:lessonId', lessons.findOne);

    app.put('/lessons/:lessonId', lessons.update);

    app.delete('/lessons/:lessonId', lessons.delete);
}