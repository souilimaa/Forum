const express=require('express')
const questionRouter=express.Router();
const questionController=require('./../controllers/questionController')
questionRouter.route('/question')
.post(questionController.createQuestion)
questionRouter.route('/')
.get(questionController.getAllQuestions)

module.exports=questionRouter 