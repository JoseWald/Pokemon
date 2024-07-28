const express= require('express');

const morgan=require('morgan');

const port=3000;

const bodyParser=require('body-parser');

const favicon=require('serve-favicon');

const app=express();
const sequelize=require('./src/db/sequelize')


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()
//emplacement de point de terminaison 
require('./src/route/findAllPokemons')(app)
require('./src/route/createPokemon')(app)
require('./src/route/findPokemonByPK')(app)
require('./src/route/updatePokemon')(app)
require('./src/route/deletePokemon')(app)
require('./src/route/login')(app)
//gestion d'erreur 404
app.use(({res})=>{ 
    const message='Veuiller essayer un autre URL'
    res.status(404).json({message})
})
//erreur 500=erreur lors de la requete sequel
//démarrage d'un serveur
app.listen(port,()=> console.log(`Notre app est démrarré sur : http:\\localhost:${port}`));