const {Sequelize,DataTypes}=require('sequelize')
const PokemonModel=require('../models/pokemons.js')
const pokemons=require('./pokemonType.js')
const UserModel=require('../models/user.js')
const bcrypt=require('bcrypt')
//connexion à la base de données
const sequelize= new Sequelize(
    'pokedex',
    'root',
    '',
    {
      host:'localhost',
      dialect:'mysql',
      /*dialectOptions:{
        timezone: 'Etc/GMT-2'
      },*/
      logging: false
    }
  )
  sequelize.authenticate()
    .then(_=>console.log('connexion à la base de données établie'))
    .catch(err=>console.error(`connexion echouée error:${err}`))
  
  const Pokemon=PokemonModel(sequelize,DataTypes)//sequeliser
  const User=UserModel(sequelize,DataTypes)
  //ajout des informations dans une table
  const initDb=()=>{
      return sequelize.sync({force:true}).then(_=>{
                console.log('la base de données Pokedex a bien été synchronisé')
                pokemons.map(pokemon=>
                  Pokemon.create({
                    name:pokemon.name,
                    hp:pokemon.id,
                    cp:pokemon.base_experience,
                    picture:pokemon.created,
                    types:pokemon.type
                  }).then(bulbizarre=>console.log(bulbizarre.toJSON()))
                
                )
                bcrypt.hash('123',10)
                .then(hash=>{User.create({username:"JoséWald",password:hash })})
                .catch(err=>console.log(`erreur d'encryptage ${err}`))
               
                
      })          
        .catch(err=>{
          console.log(`erreur de creation: ${err}`)
        })       
}

module.exports={
    initDb,
    Pokemon,
    User
}