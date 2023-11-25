const UserModel = require('../models/User')
const QuestionModel=require('./../models/Question')
exports.createQuestion=async (req,res)=>{
    if(req.session.UserID){
        try{
            let newQst=await QuestionModel.create({
                user_id:req.session.UserID,
                question:req.body.question
            })
            console.log("question created")
            res.redirect('/')

        }catch(err){
            console.log("error in createQuestion ")
        }


    }else{
        console.log("You should be login to envoyer question")
        res.status(400).json({
            status:"Fail",
            message:"Login first!!"
        })
    }
}
exports.getAllQuestions=async (req,res)=>{
try{
    const questions=await QuestionModel.find()
    for(const question of questions) {
        try{
       const userEmail=await UserModel.findOne({_id:question.user_id})
       question.email=userEmail.email

       }catch(err){
           console.log("error infindOne Questions")
       }

   }
   res.render('home',{session:req.session,questions:questions})

   
}catch(err){
console.log("error in find all questions ")
}
}    