const bodyParser = require('body-parser');
// var request = require ('request')
const { req, res } = require('express');
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const userRouter = require ('./controllers/user')
const app = express()
const port = 5000
const cors = require('cors');
const questionRouter = require('./controllers/question');
const kidsRouter = require('./controllers/kids');
const lessonRouter = require('./controllers/lesson');
app.use(cors());
app.use(express.json())



const config ={
    useNewUrlParser: true,
    useUnifiedTopology: true
}



mongoose.connect(process.env.MONGODB_URI,config)
.then(() => {
    console.log("successfully connected to MongoDB");
})

.catch(err => {
    console.error("Some problem occured")
})


app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/question', questionRouter)
app.use('/kids', kidsRouter);
app.use('/lesson', lessonRouter);



// app.get("/", (req,res) => {
//     res.send("Hello World")
// })

// app.get("/getWeather", (req,res) => {
//     req("https://api.weatherbit.io/v2.0/current?city=Accra,Ghana&key=e79cffbc8cca4b9f8b34968c14db1d06",
//     function(error,response,body){
//         if(!error && response.statusCode==200){
//             var parsedBody = JSON.parse(body)
//             var temperature = parsedBody["data"][0]["temp"]
//             res.send({temperature})
//         }
//     })
    
// })



app.listen(port, () => console.log("Express app is listening"))