const projects=require('../Models/projectSchema')

// add the project details
exports.addUserProject=async(req,res)=>{
    console.log("inside adduserProject");

    //get userId
    const userId=req.payload
    //get projectimage
    const projectImage=req.file.filename
    //get project details
    const {title,language,github,link,overview}=req.body

     console.log(userId,title,language,github,link,overview,projectImage);

    //logic for adding project details
    //res.status(200).json("add user project request received")
    try {
    
        //if email is preent in mongodb
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(402).json("project already exist")
        }
        else{
            //if github is not present in mongodb then create new project details and save them in mongodb
            const newProject=new projects({
                title,language,github,link,overview,projectImage,userId
            })
            await newProject.save() //save new project in mongodb
            res.status(200).json(newProject) //response send to client
        }
    } 
    catch(err) {
        console.log("error in adduserproject",+err);
        res.status(404).json({message:err.message})
    }
}

//get all user-projects
exports.getAllUserProjects=async(req,res)=>{
    //get userId
    const userId=req.payload;
    //get all projects of particular user
    try {
        //api call
        const userProject=await projects.find({userId})
        res.status(200).json(userProject)//send all projects to frontend

        
    } catch (err) {
        res.status(401).json("internal server error"+err.message);
    }
}



//get all projects
exports.getAllProjects=async(req,res)=>{

    const searchKey=req.query.search

    const query={
        language:{
            $regex:searchKey,   //regular expression
            $options:"i" //to ignore case sensitive

        }
    }
    try {
        //api call
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)//send all projects to frontend
    }
     catch (err) {
        res.status(401).json("internal server error"+err.message);
    }
}

//get home project
exports.getHomeProject=async(req,res)=>{
    try {
        const homeProject=await projects.find().limit(3)
        res.status(200).json(homeProject) // send all projects to frontend
    } 
    catch (err) {
        res.status(401).json("internal server error"+err.message);
    }
}

//update project details
exports.updateProject=async(req,res)=>{
    const {title,language,github,link,overview,projectImage}=req.body
    const uploadImage=req.file?req.file.filename:projectImage
    userId=req.payload
    const {pid}=req.params
    try {
        const updateProject=await projects.findByIdAndUpdate({_id:pid},{title,language,github,link,overview,projectImage:uploadImage,userId})
        await updateProject.save()
        // response send back to client.
        res.status(200).json(updateProject)
    }
    catch (err) {
        res.status(401).json("internal server error"+err.message);
    }
}

exports.deleteProject=async(req,res)=>{
    
    const {pid}=req.params
    try {
        const deleteUserProject=await projects.findOneAndDelete({_id:pid})
        res.status(200).json(deleteUserProject)
        
    } catch (err) {
        res.status(401).json("internal server error"+err.message);
    }
}


