const remarkRouter = require('express').Router();
// const {response} = require('express');
const Remark = require('../models/remark')

remarkRouter.get('/', (request,response,next) => {
    Remark.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})


// remarkRouter.get('/', (req, res) => {
    
// })

remarkRouter.post('/', async (request, response, next) =>{
    const {remark} = request.body;


    if (remark){
        const remarkCount = await Remark.countDocuments();

        const newRemark = new Remark ({
            id:remarkCount + 1,
            remark: remark
        })

        newRemark.save()
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

module.exports = remarkRouter