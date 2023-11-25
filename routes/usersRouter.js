const express=require('express')
const userController=require('../controllers/userController')
const usersRouter=express.Router();
usersRouter.route('/users')
.post(userController.addUser)
 
usersRouter.route('/home')
.post(userController.auth)

module.exports=usersRouter