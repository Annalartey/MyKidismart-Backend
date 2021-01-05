const kidsRouter = require('express').Router();
// const {response} = require('express');
const Kids = require('../models/kids')
const authentication = require("../middleware/authentication")



// Route to get all kids
kidsRouter.get('/', authentication.authenticateToken, (request,response,next) => {
    console.log("Fetching kids", request.user)

    Kids.find({ parentId: request.user.id }).then(foundKids => {
        console.log("Found kids")
        response.status(200).send(foundKids)
        next();
    })
})


// kidsRouter.get('/', (req, res) => {
    
// })


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
kidsRouter.post('/', authentication.authenticateToken, async (request, response, next) =>{
    
    console.log("Current logged in user", request.user)
    const {firstname, lastname, dateofbirth} = request.body;


    if (firstname && lastname && dateofbirth){
        const kidsCount = await Kids.countDocuments();
        const newKidData = {
            id: kidsCount + 1,
            firstname: firstname,
            lastname: lastname,
            dateofbirth: dateofbirth,
            parentId: request.user.id
        }

        console.log("New Kid data to add", newKidData)
        
        const newKids = new Kids(newKidData)
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