const express=require('express')

const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require("../Middlewares/jwtMiddleware")
const multerConfig=require('../Middlewares/multerMiddleware')

//create router object of express
const router=new express.Router()

//using router object to define path

// register api path    -http://localhost:4000/register -   frontend
router.post('/register',userController.register)

// login api path    -http://localhost:4000/login -   frontend
router.post('/login',userController.login)

//add user project API path - http://localhost:4000/project/add
 router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//get all users projects path- http://localhost:4000/project/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAllUserProjects)

//get all projects path- http://localhost:4000/project/all-projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get home project path- http://localhost:4000/project/home-project
router.get('/project/home-project',projectController.getHomeProject)

//updateProject
router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateProject)

//delete project
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)


module.exports=router