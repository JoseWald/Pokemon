const {Pokemon}=require('../db/sequelize')
const pokemons = require('../models/pokemons')
const {Op}=require('sequelize')
const auth =require('../auth/auth')
module.exports=(app)=>{
    app.get('/api/pokemons',auth, (req, res) => {
        if(req.query.name){//parametre de requete req.params.id==parametre d'URL juste au cas où tu ne souviendra pas
            const name=req.query.name
            const limit=parseInt(req.query.limit)||5
            if(name.length>1){
            return Pokemon.findAndCountAll({
                where:{
                    name:{//'name' est la propriété du modèle pokemon
                        [Op.like]:`%${name}%`//name est le critère de la recherche
                        /*
                            ${name}%  commence par le terme de recherche
                            %${name} termine par le terme de recherche
                            %${name}% commence et termine
                        */
                    }
                },
                order:[['name','ASC']],//DESC ordre decroissant 
              
                limit:limit
            })
            .then(({count,rows})=>{
                const message=`On a trouve ${count} Pokemon correpondant au terme de recherche ${name}mais on n'affiche que ${rows.length}`
                res.json({message:message,data:rows})
            })
            }else{
                const message='Veuillez ajouter un mmot clé plus longue'
                res.json({message:message})
            }
        }else{
            Pokemon.findAll()
            .then(pokemons=>{
                const message= 'la liste de pokemon a été bien recuperé'
                res.json({message,data:pokemons})

            })
            .catch(err=>{
                const message=`veuillez refaire la requête dans un instant`
                res.status(500).json({message, data:err})
            })
        }
      
    })
}