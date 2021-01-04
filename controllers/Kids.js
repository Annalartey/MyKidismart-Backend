const kidsRouter = require('express').Router();
// const {response} = require('express');
const Kids = require('../models/kids')



// Route to get all kids
kidsRouter.get('/', (request,response,next) => {
    Kids.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})


kidsRouter.get('/', (req, res) => {
    
})


// Rout to getkids with a specific parentId
//  kidsRouter.get('/:parentId', (request, response) =>{
//     const parentId= req.params.parentId;

//     let newKidsData=  kidsData.filter(kids=>kids.parentId === parentId );    
//     const parentkids=newKidsData[0].firstname;   
//     res.status(200).send({kids:parentId});
// })



// Rout to getkids with a specific parentId
kidsRouter.get('/:parentId', (request, response) => {
    response.json()
})



// Route to post a new kid
kidsRouter.post('/', async (request, response, next) =>{
    const {firstname, lastname, dateofbirth, parentId} = request.body;


    if (firstname && lastname && dateofbirth && parentId){
        const kidsCount = await Kids.countDocuments();

        const newKids = new Kids ({
            id:kidsCount + 1,
            firstname: firstname,
            lastname: lastname,
            dateofbirth: dateofbirth,
            parentId :parentId
        })

        newKids.save()
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

module.exports = kidsRouter