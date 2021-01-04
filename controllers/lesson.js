const lessonRouter = require('express').Router();
// const {response} = require('express');
const Lesson = require('../models/lesson')

lessonRouter.get('/', (request,response,next) => {
    Lesson.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})


// lessonRouter.get('/', (req, res) => {
    
// })

lessonRouter.post('/', async (request, response, next) =>{
    const {lesson,title} = request.body;


    if (lesson && title){
        // const lessonCount = await Lesson.countDocuments();

        const newLesson = new Lesson ({
            // id:questionCount + 1,
            lesson: lesson,
            title: title
        })

        newLesson.save()
        .then (res =>{
            response.status(201).send(res);
        })
        .catch(err =>{
            console.log(err)
            response.sendStatus(501);
        })

    }

    else {
        response.status(400).send({ message:"check your request body"})
    }
});

module.exports = lessonRouter