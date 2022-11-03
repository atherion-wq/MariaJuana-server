const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./database");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a list of all the records.
recordRoutes.get('/',(req,res) =>{
    res.send("Hello");
})

recordRoutes.get('/records', (req, res) =>{
  dbo.connection.useDb('MariajuanaDb').collection("Usuario").find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});

recordRoutes.get('/get/Usuarios', (req, res) =>{
  dbo.connection.useDb('MariajuanaDb').collection("Usuario").find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  }); 
});

recordRoutes.get('/productos', (req, res) =>{
  dbo.connection.useDb('MariajuanaDb').collection("Producto").find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  
});

recordRoutes.post('/add/usuario', (req, res) =>{
    let myobj = {
        nombre: req.body.nombre,        
        apellido: req.body.apellido,
        fecha_nacimiento: req.body.fecha_nacimiento,
        correo: req.body.correo,
        contrasenha : req.body.contrasenha,
        cedula : req.body.cedula,
        sexo : req.body.sexo,
        rol : req.body.rol
      };
      console.log(req.body);
    dbo.connection.useDb('MariajuanaDb').collection("Usuario").insertOne(myobj, function (err, result) {
        if (err) console.log (err);
        res.json(result);
      });
});




recordRoutes.post('/add/producto', (req, res) =>{
  let myobj = {
      nombre: req.body.nombre,        
      precio: req.body.precio,
      estado: req.body.estado,
      categoria: req.body.categoria,
      imagen : req.body.imagen,
      cantidad : req.body.cantidad,
      descripcion : req.body.descripcion,
    };
  dbo.connection.useDb('MariajuanaDb').collection("Producto").insertOne(myobj, function (err, result) {
      if (err) console.log (err);
      res.json(result);
    });
});

recordRoutes.post('/producto/actualizar', (req, res) =>{  
  dbo.connection.useDb('MariajuanaDb').collection("Producto")
  .updateOne({_id: ObjectId(req.body._id)},{$set:
    {
      nombre: req.body.nombre,
      precio: req.body.precio,
      estado: req.body.estado,
      categoria: req.body.categoria,
      imagen: req.body.imagen,
      cantidad:req.body.cantidad,
      descripcion: req.body.descripcion,
    }}, function(err,result){
    if (err) console.log (err);
    res.json(result);
  })
});

recordRoutes.delete('/producto/borrar', (req, res) => {
  dbo.connection.useDb('MariajuanaDb').collection("Producto").deleteOne({_id: ObjectId(req.body._id)}, function (err, result) {
    if (err) console.log (err);
    res.json(result);
  });
});


 




recordRoutes.get('/preguntas', (req, res) =>{
  dbo.connection.useDb('MariajuanaDb').collection("Pregunta").aggregate(
    [{$lookup:{from :"Usuario",localField:"usuario",foreignField:"_id", as: "usuario"}}])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.post('/add/pregunta', (req, res) =>{
  var userid = req.body.usuario;
  var o_id = new ObjectId(userid);  
  let myobj = {
      contenido:req.body.contenido,        
      usuario: o_id,
      respuesta:  req.body.respuesta
    }; 
  dbo.connection.useDb('MariajuanaDb').collection("Pregunta").insertOne(myobj, function (err, result) {
      if (err) console.log (err);
      res.json(result);
    });
});

recordRoutes.post('/question', (req, res) =>{  
  dbo.connection.useDb('MariajuanaDb').collection("Pregunta")
  .updateOne({_id: ObjectId(req.body.preguntaId)},{$set:{respuesta:req.body.respuesta}}, function(err,result){
    if (err) console.log (err);
    res.json(result);
  })
});

recordRoutes.get('/promociones', (req, res) =>{
  dbo.connection.useDb('MariajuanaDb').collection("Promocion").aggregate(
    [{$lookup:{from :"Producto",localField:"producto",foreignField:"_id", as: "producto"}}])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
}); 


module.exports = recordRoutes;
