const Lesson = require('../models/lesson.model.js');

exports.create = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Lesson content can not be empty"
        });
    }


    const lesson = new Lesson({
        title: req.body.title || "Untitled Lesson",
        content: req.body.content
    });


    lesson.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Lesson."
        });
    });
};


exports.findAll = (req, res) => {
    Lesson.find()
    .then(lessons => {
        res.send(lessons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving lessons."
        });
    });
};


exports.findOne = (req, res) => {
    Lesson.findById(req.params.lessonId)
    .then(lesson => {
        if(!lesson) {
            return res.status(404).send({
                message: "Lesson not found with id " + req.params.lessonId
            });            
        }
        res.send(lesson);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lesson not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving lesson with id " + req.params.lessonId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Lesson content can not be empty"
        });
    }


    Lesson.findByIdAndUpdate(req.params.lessonId, {
        title: req.body.title || "Untitled Lesson",
        content: req.body.content
    }, {new: true})
    .then(lesson => {
        if(!lesson) {
            return res.status(404).send({
                message: "Lesson not found with id " + req.params.lessonId
            });
        }
        res.send(lesson);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lesson not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Error updating lesson with id " + req.params.lessonId
        });
    });
};


exports.delete = (req, res) => {
    Lesson.findByIdAndRemove(req.params.lessonId)
    .then(lesson => {
        if(!lesson) {
            return res.status(404).send({
                message: "Lesson not found with id " + req.params.lessonId
            });
        }
        res.send({message: "Lesson deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Lesson not found with id " + req.params.lessonId
            });                
        }
        return res.status(500).send({
            message: "Could not delete lesson with id " + req.params.lessonId
        });
    });
};
