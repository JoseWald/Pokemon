const {Pokemon}=require('../db/sequelize')
const pokemons = require('../models/pokemons')
module.exports=(app)=>{
    app.get('/api/pokemons/:id', (req, res) => {
      Pokemon.findByPk(req.params.id)
        .then(pokemons=>{
                const message='pokemon trouvé';
                res.json({message,data:pokemons})
        })
        .catch(err=>{
          const message=`veuillez refaire la requête dans un instant`
          res.status(500).json({message, data:err})
      })
    })
}