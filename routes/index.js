var express = require('express');
var router = express.Router();

var nodemailer=require('nodemailer');
var novedadesModel=require('../models/novedadesModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var novedades= await novedadesModel.getNovedades();
  res.render('index', {
    isInicio:true,
    novedades
  });
});

router.post('/', async(req,res,next)=>{
console.log(req.body)
  var nombre= req.body.nombre;
  var email= req.body.email;
  var telefono= req.body.tel;
  var mensaje= req.body.mensaje;

var obj={
  to:'maganisa@gmail.com',
 subject:'Contacto desde la Web',
 html: nombre + "Se contactó por la Web y quiere más info a este correo:" + email + ".<br> Además, hizo el siguiente comentario:" + mensaje + ".<br> Su teléfono es" + telefono
}


var ciudadinquieta=nodemailer.createTransport({
host:process.env.SMTP_HOST,
port:process.env.SMTP_PORT,
  auth:{
   user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

var info= await ciudadinquieta.sendMail(obj);
res.render('index',{
  isInicio:true,
  message:'Mensaje enviado correctamente'

});
});


module.exports = router;


