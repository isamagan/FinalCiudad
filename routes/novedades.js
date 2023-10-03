var express=require('express');
var router=express.Router();
//var novedadesModel = require('../models/novedadesModel');

router.get('/', function(req, res,next){

    res.render('index',{
    isNovedades:true,
    
    });
});

module.exports=router;