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
// its writing to a database instead of a 
app.get('/dinosaurs',function(req,res){
    db.dino.findAll().then(function(dinosaurs){
        res.render('dinos/index',{dinosaurs})
    })
//     let dinosaurs = fs.readFileSync('./dinosaurs.json');
//     let dinoData = JSON.parse(dinosaurs)
//     console.log(dinoData);
//     res.render('dinos/index',{dinosaurs: dinoData})
});

app.get('/dinosaurs/new',function(req,res){
    res.render('dinos/new')
});

app.get('/dinosaurs/:id/edit',function(req,res){
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    let id = parseInt(req.params.id);
    
    res.render('dinos/edit',{dinosaur:dinoData[id],id});
});

app.get('/dinosaurs/:id',function(req,res){
    db.dinos.findOne()
    where:(id.req.params.id)
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);

    let id = parseInt(req.params.id)
    res.render('dinos/show',{dinosaur: dinoData[id],id})
});

//post dinos 

app.post('/dinosaurs',function(req,res){
    //read our JSON file
    let dinosaurs = fs.readFileSync('./dinosaurs.json');

    //convert it to an array
    let dinoData = JSON.parse(dinosaurs);
    //push it to new data on array
    let newDino = {
        enviroment: req.body.dinosaurType,
        name: req.body.dinosaurName
    }
    dinoData.push(newDino);
    //write the array back into the file 
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData));
    res.redirect('/dinosaurs')
})

app.delete('/dinosaurs/:id',function(req,res){
    //Read the data from the file 
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    


    //parse the data into a object
    let dinoData = JSON.parse(dinosaurs);
    let id = parseInt(req.params.id);
    dinoData.splice(id,1);

    //splice out the object at the specified index
    let dinoString = JSON.stringify(dinoData);

    //write the object
    fs.writeFileSync('./dinosaurs.json',dinoString);
    res.redirect('/dinosaurs');
})

app.put('/dinosaurs/:id',function(req,res){
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    let id = parseInt(req.params.id);
    dinoData[id].name = req.body.dinosaurName;
    dinoData[id].type = req .body.dinosaurType;
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData));
    res.redirect("/dinosaurs/" + id)

})

app.listen(port,function(){
    console.log('we are listening'+ port);
})

//get dinosaurs/new - serves up new dino form
