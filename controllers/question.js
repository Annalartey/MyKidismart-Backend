const questionRouter = require('express').Router();
// const {response} = require('express');
const Question = require('../models/question')

questionRouter.get('/', (request,response,next) => {
    Question.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})


// questionRouter.get('/', (req, res) => {
    
// })

questionRouter.post('/', async (request, response, next) =>{
    const {subject,topic,question,answer} = request.body;


    if (subject && topic && question && answer){
        const questionCount = await Question.countDocuments();

        const newQuestion = new Question ({
            id:questionCount + 1,
            subject: subject,
            topic: topic,
            question: question,
            answer: answer
        })

        newQuestion.save()
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

module.exports = questionRouter