const mongoose=require('mongoose')
const ResponseSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:"true"
    },
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:true
    },
    response:{
    type:String,
    required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const ResponseModel=mongoose.model('Response',ResponseSchema)
module.exports=ResponseModel