const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const db = require('./models')
const port = 3000;
const methodOverRide = require('method-override');


app.set('view engine','ejs');
app.use(layouts);
app.use(express.static( __dirname +'/static'));
app.use(express.urlencoded({extended:false}))
app.use(methodOverRide('_method'));

//Post /dinosaurs



app.get('/',function(dinos){
    res.render('dinos/new',{dinos})
})
//TODo's  remove file system stud   ` and use sequelize functions

app.get('/dinosaurs',function(req,res){
    db.dino.findAll().then(function(dinosaurs){
        res.render('dinos/index',{dinosaurs:dinosaurs})
    })

});

app.get('/dinosaurs/new',function(req,res){
    res.render('dinos/new')
});

app.get('/dinosaurs/:id/edit',function(req,res){
    db.dinosaur.findByPk(parseInt(req.params.id))
    .then(function(dinos) {
        res.render('dinos/edit',{dinosaur:dino})
    });
    
    res.render('dinos/edit',{dinosaur:dinoData[id],id});
});

app.get('/dinosaurs/:id',function(req,res){
    db.dinosaur.findByPk(parseInt(req.params.id)
        .then(function(dino){
            res.render('dinos/show',{dinosaur:dinos})
    })
    );

    
    



    
//post dinos 

app.post('/dinosaurs',function(req,res){
    let newDino = {
        enviroment: req.body.dinosaurType,
        name: req.body.dinosaurName
    }
    db.dinosaur.create(newDino).then(function(dino){
        res.redirect('/dinosaurs')
    })
});

app.delete('/dinosaurs/:id',function(req,res){
    //Read the data from the file 
    db.dinosaur.destroy({
        where:{id:parseInt(req.params.id)}
    }).then(function(data){
        res.redirect('/dinosaurs')
    });
});

app.put('/dinosaurs/:id',function(req,res){
    db.dinosaur.update({
        name:req.body.dinosaurName,
        enviroment:req.body.dinosaurType
    },
    {
        where:{id: parseInt(req.body.params.id)}
    })
    .then (function(dino){

    })
    res.redirect("/dinosaurs/" + id)

})

app.listen(port,function(){
    console.log('we are listening'+ port);
})

//get dinosaurs/new - serves up new dino 
