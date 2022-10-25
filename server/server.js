const express = require('express');
const app = express();

const cors=require("cors");

app.use(express.json())
app.use(cors())
app.post('/signup' ,(req,res) => {
    res.json({'message':'sign up'})
})


app.post('/login' ,(req,res) => {
    res.json({'message':'login'})
})

app.listen(8000)