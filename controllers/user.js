const userRouter = require('express').Router();
// const {response} = require('express');
const User = require('../models/user')
const authentication = require("../middleware/authentication")


// Route to get all users
userRouter.get('/', (request,response,next) => {
    User.find({}).then(res => {
        response.status(200).send(res)
        next();
    })
})


userRouter.get('/', (req, res) => {
    
})


userRouter.post('/signup', async (request, response, next) =>{
    const {firstname,lastname, email,password, confirmpassword} = request.body;


    if (firstname && lastname && email && password && confirmpassword){
        const userCount = await User.countDocuments();

        const newUser = new User ({
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
 const {firstname} = request.body.firstname;
const {password} = request.body.password;

if (firstname && password) {
    await Users.findOne({firstname:firstname}).exec((error, user) => {
        if (error) {
            response.status(500).send({error: "INTERNAL SERVER ERROR"})
        }
        try{
            const password = password
            // bcrypt.compareSync(password, user.passwordHash)
            if (password) {
                response.send({message: "LOGGED IN"})
            }
            else {
                response.send({error: "invalid username or password"})
            }
        }
        catch (exception) {
            console.log(exception)
            response.status(500).send({exception})
        }
    })
}

    //  const token = authentication.generateAccessToken(firstname, password)
    //  res.status(200).send({ "message": "successful login!" ,token})

 })

module.exports = userRouter