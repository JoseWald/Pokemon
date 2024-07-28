const {Pokemon}=require('../db/sequelize')
const auth =require('../auth/auth')
module.exports=(app)=>{
    app.delete('/api/pokemon/:id',auth, (req, res) => {
        const id=req.params.id
         Pokemon.findByPk(id).then(pokemon=>{
            if(pokemon==null){
                const message='pokemon not found'
               return res.status(404).json({message})
            }else{
                const pokemondeleted=pokemon
            }          
            return    Pokemon.destroy({
                where:{id:pokemon.id}
            }).then(_=>{
                const message=`Pokemon N° ${pokemondeleted.id}supprimé`
                res.json({message,data:pokemondeleted})
              })
             
        }) .catch(_=>{
            const message=`pokemon introuvable`
            res.json({message})
          })
    })
}