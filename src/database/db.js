const Sequelize = require('sequelize')
const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/coinbd.sqlite'
})

sequelizeInstance.authenticate()
    .then(_ => console.log("Conectado com sucesso!"))
    .catch(error => console.log("Deu erro " + error))


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelizeInstance
}