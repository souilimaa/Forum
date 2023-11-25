const session = require('express-session')
const QuestionModel=require('./../models/Question')
const ResponseModel=require('./../models/Response')
const userModel=require('./../models/User')
const bodyParser = require('body-parser')
exports.getQuestion=async(req,res)=>{
    try{
        const question=await QuestionModel.findOne({_id:req.params.id})

        const responses=await ResponseModel.find({question_id:req.params.id})
        for(const element of responses){
            const user=await userModel.findOne({_id:element.user_id})
            element.email=user.email
        }
        res.render('question',{qst: question ,session:req.session,responses:responses})


    }catch(err){
        console.log("error in find Question" + err)
    }
}

exports.addReponse=async(req,res)=>{
    if(req.session.UserID){
        try{
            let newResponse=await ResponseModel.create({
                user_id:req.session.UserID,
                question_id:req.params.id,
                response:req.body.reponse
            }
            )
            console.log("response created")
            res.redirect('/question/'+req.params.id)

        }catch(err){
            console.log("error in createResponse ")
        }


    }else{
        console.log("You should be login to envoyer question")
        res.status(400).json({
            status:"Fail",
            message:"Login first!!"
        })
        res.render('login')
    }}

