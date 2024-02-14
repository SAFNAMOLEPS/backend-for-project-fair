//router level middleware
const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware-router-level-middleware");

    //get the token form user request
    const token=req.headers['authorization']?.slice(7)
    console.log(token);
    try{
        //token varification
        const tokenVerification=jwt.verify(token,"superkey2024")
        console.log(tokenVerification);

        req.payload=tokenVerification.userId
        console.log('multer');
        next()
        console.log(' after multer');
    }
    catch(err){
        res.status(401).json("Authorization failed....please login again")
    }
    
}

module.exports=jwtMiddleware