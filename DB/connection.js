// node +mongodb connection

const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("mongodb connection established");
})
.catch(err=>{
    console.log('mongodb connection error'+err.message);
})