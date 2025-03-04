const express = require('express')
const path = require('path')

const checklistRouter = require('./src/routes/checklist')
const rootRouter = require('./src/routes/index')
require('./config/database')

const App = express();

App.use(express.json());

App.use(express.static(path.join(__dirname, 'public')))

App.set('views', path.join(__dirname, 'src/views')) // Corrigido
App.set('view engine', 'ejs')

App.use('/', rootRouter)
App.use('/checklists', checklistRouter)

App.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})