const bcrypt=require('bcrypt')
const UserModel=require('./../models/User')
exports.loginMiddleware=async(req,res,next)=>{
    try{
    let user=await UserModel.findOne({email:req.body.email});
    if(user){
            let resComparPass=await bcrypt.compare(req.body.password,user.password);
            if(resComparPass){
                req.session.UserID=user._id
                console.log("User connected")
                res.status(200);
                res.redirect('/')

            }
            else{
                res.status(400).json({
                    status:"fail",
                    message:"Mot de passe Incorrect"
                })
                console.log("Mot de passe Incorrect")
            }

       
        
    }else{
        res.status(400).json({
            status:"fail",
            message:"L'utilisateur n'existe pas, essayer de se register!!"
        })
    }

    }catch(err){
        console.log("error in findOne function from auth "+err)
    }
    next();

}
exports.logoutMiddleware=(req,res,next)=>{

    req.session.destroy((err)=>{
        if(err){

        }else{
            res.redirect('/')
        }
        next()

    })
}
