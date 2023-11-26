const session = require('express-session')
const UserModel=require ('./../models/User')
const bcrypt=require('bcrypt')
exports.addUser=async (req,res)=>{
    try{
    let user=await UserModel.findOne({email:req.body.email})
    if(user){

        console.log('user deja exist')
        res.status(400).json({
            Email:req.body.email,
            message:"user Deja exist"
   
        })
       }
       
       
       
       else{
        if(req.body.password===req.body.confirmerPassword){

            try{
             const saltRounds = 10;
             try{
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password=hashedPassword
             }catch(err){
                console.log("error in bcrypt.hash")
             }
            let user=await UserModel.create(req.body)
            req.session.UserID=user._id;
            console.log(req.session.UserID)
            console.log('user created: '+user)
           res.render('login')
            }catch(error){
                res.status(400).json({
                    status:"fail",
                    message:'error creating user'
                })
                console.log("error creating user:"+error)
            }
             
        }
        else{
            res.status(400).json({
                status:"fail",
                message:'Le champs password no rassemble pas a confirmer le mot de passe'
            })
            console.log('Le champs password no rassemble pas a confirmer le mot de passe')
        }
    
        
       }
    }catch(err){
        console.log("error has occured in findOne")
        
    }
    
}

exports.auth=async(req,res)=>{
    try{
    let user=await UserModel.findOne({email:req.body.email});
    if(user){
        try{
            try{
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
            }catch(err){
                console.log("error in bcrypt compare function")
            }
            

        }catch(err){
            console.log("error in bcrypt hash function ")
        }
        
    }else{
        res.status(400).json({
            status:"fail",
            message:"L'utilisateur n'existe pas, essayer de se register!!"
        })
    }
    }catch(err){
        console.log("error in findOne function from auth")
    }
    
}