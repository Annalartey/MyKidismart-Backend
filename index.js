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
const remarkRouter = require('./controllers/remark');
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
app.use('/remark', remarkRouter)





app.listen(port, () => console.log("Express app is listening"))