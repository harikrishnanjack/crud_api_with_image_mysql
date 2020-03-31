var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors')
var app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var final=require('./routes/finals');
app.use('/product',final);

app.listen(3000,()=>{
console.log("server listen @3000")
})