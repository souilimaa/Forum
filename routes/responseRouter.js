const express=require('express')
const responseController=require('./../controllers/responseController')
const responseRouter=express.Router();
responseRouter.route('/question/:id')
.get(responseController.getQuestion)


responseRouter.route('/reponse/:id')
.post(responseController.addReponse)




module.exports=responseRouter