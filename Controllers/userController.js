// define logic function

const users=require('../Models/userSchema')

const jwt=require('jsonwebtoken')

// register logic function
exports.register=async(req,res)=>{
    console.log('inside register function');
    try {
        const {username,email,password} = req.body
        console.log(`${username} ${email} ${password}`);
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(402).json("user already exist")
        }
        else{
            const newUser=new users({
                username,email,password,github:"",link:"",profile:""

            })
            await newUser.save()// data saved in mongodb
            res.status(200).json("user created successfully")   
        }
    } catch (err) {
        res.status(500).json('server error')
    }
    
}

//logic for login
exports.login=async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await users.findOne({email,password})
        if(user){
            
            const token=jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token}) // login success
        }
        else{
            res.status(401).json("invalid user") 
        }
        
    }
    catch{
        res.status(500).json("server error")
    }
}

