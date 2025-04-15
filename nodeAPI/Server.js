require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//to get url
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT||3000;
const FRONTEND = process.env.FRONTEND;
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get('/',(req,res)=>{
    //throw new Error('Fake Error');
    res.send('Hello NODE API')
})

app.use('/api/products',productRoute)
app.use('/api/user',userRoute)

app.use(errorMiddleware);

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=>{
        console.log(`Node API is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error)
})