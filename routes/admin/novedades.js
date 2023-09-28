var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuarios: req.session.nombre,
        novedades
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', { //agregar hbs
        layout: 'admin/layout'
    })
});
router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        }else {
                res.render('admin/agregar', {
                    layout: 'admin/layout',
                    error: true,
                    message: 'Todos los campos son requeridos'
                })
            }
        }catch (error) {
            console.log(error)
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'No se cargó la novedad'
            })
        }
    
    })
    /*diseño del formulario de modificar con esa novedad cargada*/

router.get('/modificar/:id', async(req,res,next)=>{
    var id = req.params.id;
    //console.log(req.params.id);
    var novedad = await novedadesModel.getNovedadesById(id);

    res.render('admin/modificar',{ //modificar hbs
        layout:'admin/layout',
        novedad
    })
})
/*uppdate*/
router.post('/modificar', async (req, res, next) => {
    try {

        var obj={
           titulo:req.body.titulo,
           subtitulo:req.body.subtitulo,
            cuerpo:req.body.cuerpo
        }

        //console.log(obj) //pruebo titulo subtitulo y cuerpo
        //console.log(req.body.id) //pruebo si está viniendo el id

        await novedadesModel.modificarNovedadesById(obj, req.body.id);
        res.redirect('/admin/novedades');

        }catch (error) {
            console.log(error)
            res.render('admin/modificar', {
                layout: 'admin/layout',
                error: true,
                message: 'No se modificó la novedad'
            })
        }
    
    })
module.exports = router;