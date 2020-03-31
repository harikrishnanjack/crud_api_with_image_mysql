var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var db=require('../db');
var router=express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

var multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
cb(null,'./uploads')
    },
    filename:function(req,file,cb){
cb(null,file.originalname)
    }
})
var upload=multer({storage:storage,limits:{
    fileSize:1024 * 1024 *5
},
})
//get product
router.get('/get',upload.single('image'),function(req,res,next){
    db.query(`select * from finals`,[req.body.image,req.body.pname,
        req.body.category,req.body.type,req.body.rate,req.body.property1,req.body.property2,req.body.property3],function(err,rows){
    if(err){
        res.json({message:"error"})
    }
    else{
        res.json(rows)
    }
    })
    })
//get end

//get by id
router.get('/get/:id',function(req,res,next){
    db.query(`select * from finals where id=?`,[req.params.id],function(err,rows,fields){
        if(err){
            res.json({message:"Wrong"})
        }
        else{
            res.json(rows[0])
        }
    
    })
    })


//get by id end


//post product
router.post('/create',upload.single('image'),function(req,res,next){
    db.query(`insert into finals (image,pname,category,type,rate,property1,property2,property3) values (?,?,?,?,?,?,?,?)`,[req.file.originalname,req.body.pname,
    req.body.category,req.body.type,req.body.rate,req.body.property1,req.body.property2,req.body.property3],function(err,data){
    if(err){
        // res.json({message:"error"})
        throw err
    }
    else{
        res.json({data:'success'})
    }
    })
    })

//post end


//update

router.put('/update/:id',upload.single('image'),function(req,res,next){
    db.query(`update finals set image=?,pname=?,category=?,type=?,rate=?,property1=?,property2=?,property3=? where id=?`,[req.file.originalname,req.body.pname,
        req.body.category,req.body.type,req.body.rate,req.body.property1,req.body.property2,req.body.property3,req.params.id],function(error,results,fields){
        if(error) throw error;
        res.json({data:'updated successfully'})
})
})



//update end


//delete start
router.delete('/delete/:id',function(req,res,next){
    db.query(`delete from finals where id=?`,[req.params.id],function(err,data){
        if(err) throw err;
        res.json({data:'deleted'});
    })
    })
//
module.exports=router;