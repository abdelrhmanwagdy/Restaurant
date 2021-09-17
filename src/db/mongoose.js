const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MongoUrl,{
    useNewUrlParser: true
    // useCreateIndex: true
}).then(()=>{
    console.log("Connected to database...");
}).catch((err)=>{
    console.log(err);
    console.log("Connection failed...");
})
