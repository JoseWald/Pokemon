const jwt=require('jsonwebtoken')
const privateKey=require('../auth/privateKey')
module.exports=(req,res,next)=> {
    const autorizationHeader=req.headers.authorization
    if(!autorizationHeader){
        const message='Jeton d\'authentification requise,veuillez ajouter un dans l\'entete'
        return res.status(401).json({message})
    }
    const token=authorizationHeader.split(' ')[1]
    const decodedToken=jwt.verify(token,privateKey,(error,decodedToken)=>{
        if(error){
            const message='Vous n\' etes pas autorisé d\'y accéder à cette page '
            return res.status(401).json({message,data:error})
        }
        const UserId=decodedToken.UserId
        if(req.body.UserId && req.body.UserId!==UserId){
            const message='Identification de l\'utilisateur est invalide'
            res.status(401).json({message})
        }else{
            next()
        }
    })
}