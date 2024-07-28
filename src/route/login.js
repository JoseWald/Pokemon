const {User}=require('../db/sequelize')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const privateKey=require('../auth/privateKey')

module.exports=(app)=>{
    app.post('/api/logg',(req,res)=>{
            User.findOne({where:{username:req.body.name}})//tkn req.body.username fa tss mega anaovna insomnia
            .then(user=>{
                if(!user){
                    const message='Erreur lors de la recherche de l\'utilisateur'
                    return res.status(401).json({message})
                }
                bcrypt.compare(req.body.mdp,user.password)}).then(validMdp=>{
                    if(!validMdp){
                        const message='Mot de passe invalid'
                        return res.json({message,data:user})
                    }       
                    
                    //JWT
                    const  token=jwt.sign(
                        {userId:id},
                        privateKey,
                        {expiresIn:'24h'}
                    )
                    const message='Bienvenu'
                    return res.json({message,data:user,token})

                })
            .catch(err=>{
                const message='L\'utilisateur n\' a pas pu connecter'
                return res.json({message:message})
            })
    })
}