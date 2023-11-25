const mongoose=require('mongoose')
const QuestionSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    question:{
        type:String,
        required:true

    },
    date:{
        type:Date, 
        default:Date.now()
    }
})
const QuestionModel=mongoose.model('Question',QuestionSchema)
module.exports=QuestionModel