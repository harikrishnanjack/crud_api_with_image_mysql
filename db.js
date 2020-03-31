var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'final2'
});
connection.connect((err)=>{
    if(err) throw err;
    console.log("connected to db");
})
module.exports=connection;