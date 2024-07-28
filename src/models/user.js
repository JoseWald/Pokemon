module.exports=(Sequelize,DataTypes)=>{
    return Sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            unique:{
                msg:'Le nom est deja pris'
            }
        },
        password:{
            type:DataTypes.STRING
        }
    })
}