const express = require('express');
const app = express();
const cors=require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRound = 10;

app.use(express.json())
app.use(cors())


mongoose.connect('mongodb://localhost:27017/bl')
.then(()=>{
    console.log('connected to database')
})
.catch((error) => {
    console.log(error)
})



// schema 

const userSchema = new mongoose.Schema({
    username : String,
    password : String
});
const user = new mongoose.model('users',userSchema);

app.post('/signup' ,async (req,res) => {

    let newUser = new user({
        username : req.body.userName,
        password: await bcrypt.hash(req.body.password,saltRound)
    })
    newUser.save()
    .then(()=> {console.log('user saved ')})
    .catch((error)=>{console.log('error in saving user',error)})
    res.json(req.body)

})


app.post('/login' ,async (req,res) => {
    

    let oldUser =  await  user.findOne({username:req.body.userName })
  
    let passwordMatch = await bcrypt.compare( req.body.password, oldUser.password)
    if (passwordMatch){
        res.send({'message': 'login success'})
    }

    res.json({'message':'login failed'})
})




app.listen(8000)