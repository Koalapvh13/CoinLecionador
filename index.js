const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require('handlebars')
const Currency = require('./src/models/Currency')
const { Op } = require("sequelize");
const json = require("body-parser/lib/types/json")
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
//config nossa template engine
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars')
app.set('views', './src/views')
//configurando o pody parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {

    const search = req.query.search
    if (search) {
        const objMoeda = await Currency.findAll({
            where: {
                currency_description: {
                    [Op.like]: `%${search}%`
                }
            }
        }
        )
        return res.render('index', { moedas: objMoeda })
    }
    const objMoeda = await Currency.findAll()
    return res.render('index', { moedas: objMoeda })
})


app.post('/salvar_moeda', async (req, res) => {
    const { descricao, conservacao, cunhagem, pais } = req.body
    await Currency.create({
        currency_description: descricao,
        currency_country: pais,
        currency_status: conservacao,
        currency_coinage_year: cunhagem,
    })
    return res.redirect('/')
})

app.post('/editar_moeda/:id', async (req, res) => {
    const { descricao, conservacao, cunhagem, pais } = req.body
    await Currency.update({
        currency_description: descricao,
        currency_country: pais,
        currency_status: conservacao,
        currency_coinage_year: cunhagem,
    }, { where: { id: req.params.id } })
    return res.redirect('/')
})

app.post('/deletar_moeda/:id', async (req, res) => {

    const { descricao, conservacao, cunhagem, pais } = req.body
    await Currency.destroy({ where: { id: req.params.id } })
    return res.redirect('/')
})

app.listen(3000, function () {
    console.log("rodando na porta 3000")
})
