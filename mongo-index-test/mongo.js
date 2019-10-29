const mongoose = require('mongoose');
var readline = require('readline-sync');

let InsertSchema;
let Modelo;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/teste', { useUnifiedTopology: true })
    .then(()=>{
        console.log('Conectado...')
        let option;
    
        InsertSchema = mongoose.Schema({
            val1: Number,
            val2: Number,
        })
        Modelo = mongoose.model("Modelo", InsertSchema, 'indexTest')        
        
        inserirDados()
        buscaSimples({val1:{$gte:0 , $lt: 11}})                
        criaIndice()    
        buscaSimples({val1:{$gte:0 , $lt: 11}})  
        buscaSimples({"val1":{$gte:0 , $lt: 11}}, {"val2": 0, "_id":0})                           
        dropaCollection()

    }).catch((err)=>{
        console.log(`Falha ao se conectar, ${err}`)
    });

inserirDados = () => {
    let lista = []
    let firstInsert;
    console.time(firstInsert)
    for (i = 0; i < 100; i++){
        for (j = 0; j < 10000; j++){
            lista.push({
                val1: Math.round(Math.random() *101),
                val2: Math.round(Math.random() *101)
            })
        }
        Modelo.collection.insertMany(lista, (err, docs)=> {
            if (err) {
                return console.error(err)
            }
        })
        while (lista.length > 0) {
            lista.pop();
        }
    }
    console.timeEnd(firstInsert)
    console.log("Esse tempo foi gasto na inserção \n")
}

buscaSimples = (query) => {
    let simpleFind;
    console.time(simpleFind)
    Modelo.find(query, (err, docs) => { 
        if ( err ) {
            console.error(err)
        }
    })
    console.timeEnd(simpleFind)
    console.log("Esse tempo foi gasto na busca dos ítens com val1 de 0-10 \n")
}

criaIndice = () => {
    console.log('criando indices...\n')
    Modelo.createIndexes({val1: 1}).then((resp)=> console.log(resp)).catch((err) => console(err))
};

dropaCollection = () => {
    console.log('dropaCollection')
    Modelo.drop()
}