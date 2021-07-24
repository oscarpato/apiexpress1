//librerias 
const express = require('express');
const app = express();

const paises=[
    {id:1,nombre:"Chile",habitantes:1000},
    {id:2,nombre:"Argentina",habitantes:2000},
    {id:3,nombre:"Peru",habitantes:1500},
]
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//router

//CRUD -> create: POST Read:GET Update:PUT Delete: DELETE

app.get('/', (req,res) => {
    res.send('Hola Mundo');
});

app.get('/api/paises', (req,res) => {
    res.send(paises);
});

app.get('/api/paises/:id', (req,res) => {
    let id = req.params.id;
    let pais = existePais(id);
    if(pais)
       res.send(pais);
    else
       res.status(404).send("País no encontrado");
});

//JOI
app.post('/api/paises', (req,res)=>{
    let body = req.body;
    paises.push(body);
    res.send(body);
});

app.put('/api/paises/:id',(req,res)=>{
    let id =req.params.id;
    let body = req.body;
    let pais = existePais(id);
    if(pais){
        pais.nombre = body.nombre;
        pais.habitantes = body.habitantes;
        res.send(pais);
    }
    else {
        res.status(404).send("Dato no Encontrado");
    }
});

app.delete('/api/paises/:id',(req,res)=>{
    let id = req.params.id;
    let pais = existePais(id);
    if (pais) {
        let index = paises.indexOf(pais);
        paises.splice(index,1);
        res.send(pais);
    } else {
        res.status(404).send("Dato no Encontrado");
    }
})


//server
app.listen(3000,()=>{
    console.log("Servidor está en el puerto 3000");
});

//process.env.

function existePais(id) {
    return paises.find(x => x.id === parseInt(id));
    
}