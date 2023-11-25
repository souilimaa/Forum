const express=require ('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const session=require('express-session')
const usersRouter=require('./routes/usersRouter')
const questionRouter=require('./routes/questionRouter')
const responseRouter=require('./routes/responseRouter')
const app=express()

app.set('view engine','pug')
app.set('views','./views')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))
app.use(express.json())
app.use(session({
    secret: 'your-secret-key', // Change this to a strong, random value
    resave: false,
    saveUninitialized: true,
  }));
app.use('/',usersRouter)
app.use('/',questionRouter)
app.use('/',responseRouter)






let connectionString='mongodb://localhost:27017'
mongoose.connect (connectionString)
.then((conn)=>{
    console.log('connected')
}).catch((er)=>{
    console.log("Connection error "+err)
})



app.get('/register',(req,res)=>{
    res.render('register')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){

        }else{
            res.redirect('/')
        }
    })
})



let port=3000
app.listen(port,()=>{
    console.log("server has started")
})