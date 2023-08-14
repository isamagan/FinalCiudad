var express=require('express');
var router=express.Router();


router.get('/',function(req, res,next){
    res.render('index',{
        isContacto:true
    });// es el final.hbs
});

module.exports=router;