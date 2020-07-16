const bd = require('../database/db')

const Currency = bd.sequelize.define('Currency', {
    id: { type: bd.Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    currency_description: { type: bd.Sequelize.TEXT },
    currency_country: { type: bd.Sequelize.TEXT },
    currency_status: { type: bd.Sequelize.TEXT },
    currency_coinage_year: { type: bd.Sequelize.INTEGER },

},
    {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
    })

module.exports = Currency