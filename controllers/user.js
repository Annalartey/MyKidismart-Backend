const userRouter = require('express').Router();
// const {response} = require('express');
const Users = require('../models/user')
const authentication = require("../middleware/authentication")


// Route to get all users
userRouter.get('/', (request,response,next) => {
    Users.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})


userRouter.get('/', (req, res) => {
    
})


userRouter.post('/signup', async (request, response, next) =>{
    const {firstname,lastname, email,password, confirmpassword} = request.body;


    if (firstname && lastname && email && password && confirmpassword){
        const userCount = await Users.countDocuments();

        const newUser = new Users ({
            id:userCount + 1,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            confirmpassword: confirmpassword
        })

        newUser.save()
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



//Route to login a user
userRouter.post('/login', async (request, response, next) =>{
    const {email, password} = request.body;

    if (!email || !password) {
        response.send({ error: "You must provide an email and a password" })
        return
    }

    await Users.findOne({ email, password })
        .exec((error, user) => {
            if (error) {
                response.status(500).send({error: "INTERNAL SERVER ERROR"})
                return;
            }

            try{
                if (!user) {
                    response.send({error: "invalid username or password"})
                    return;
                }

                const token = authentication.generateAccessToken(user.email)
                response.status(200)
                    .send({
                        message: "successful login!",
                        token
                    })
            } catch (exception) {
                console.log(exception)
                response.status(500)
                    .send({exception})
            }
        })

 })

module.exports = userRouter