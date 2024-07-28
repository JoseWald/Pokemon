//const { DataTypes } = require("sequelize");
const validType=['Plant','Water','Thunder','Fire','Poison','Vol','Normal','Electricity']
let valid=false
module.exports= (sequelize,DataTypes)=>{
    return sequelize.define('Pokemon',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            validator:{
                notEmpty:{msg:'le nom du Pokemon ne doit pas être vide'},
                notNull:{msg:'Nom du Pokemon requise'}
            },
            unique:{
                msg:'Le nom est deja prise'
            }
        },
        hp:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{//validateur
                isInt:{msg:'l\'hp doit être en nombre entier seulement'},
                notNull:{msg:'hp ne doit pas être null'},
                min:{
                    args:[0],
                    msg:'les points de vie doivent être strictement positif'
                },
                max:{
                    args:[100],
                    msg:'les points de doivent pas excèder de 100'
                }
            }
        },
        cp:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{//validateur
                isInt:{msg:'le degat doit être en nombre entier seulement'},
                notNull:{msg:'cp ne doit pas être null'}
            }
        },
        picture:{
            type:DataTypes.STRING,
            allowNull:false

        },
        types:{
            type:DataTypes.STRING,
            allowNull:false,
           /* get(){//BD->API rest
                return this.getDataValue('types').split(',')
            },
            set(types){//API Rest->BD
               return   this.setDataValue('types',types)
            }*/
            validate:{
                isTypeValid(value){
                    if(value==null){
                        throw new Error('Un type de pokemon est exigé')
                    }
                    validType.forEach(element=>{
                        if(value==element){
                           valid=true 
                        }
                    })
                    if(!valid){
                        throw new Error('Le type de Pokemon que vous avez entré est pas valide')
                    }
                }
            }
        },
       
       /* timestamps:true,
        createdAt:'created',
        updatedAt:false
        */

    })
}