const { ValidationError, UniqueConstraintError } = require('sequelize')
const {Pokemon}=require('../db/sequelize')
const auth =require('../auth/auth')
module.exports=(app)=>{
    app.post('/api/pokemons',auth,(req,res)=>{
        Pokemon.create(req.body)
        .then(pokemon=>{
            const message= `le pokemon ${req.body.name} créé avec succès`
            resizeBy.json({message,data:pokemon})
        })
        .catch(err=>{
            if(err instanceof ValidationError){
                return res.status(400).json({message:err.message,data:err})
            }
            if(err instanceof UniqueConstraintError){
                return res.status(400).json({message:err.message,data:err})
            }
            const message=`veuillez refaire la requête dans un instant`
            res.status(500).json({message, data:err})
        })
        
    })
   
}