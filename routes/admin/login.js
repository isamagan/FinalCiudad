var express=require('express');
var router=express.Router();
var usuariosModel= require('./../../models/usuariosModel');

router.get('/',function(req, res,next){
    res.render('admin/login',{
        layout: 'admin/layout'
    });
});

router.post('/', asyn(req, res,next) =>{
    try{

        var usuario = req.body.usuario;
        var password = req.body.password;
        console.log(req.body);

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario.password);
    }
}

)

module.exports=router;