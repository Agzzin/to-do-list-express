const express = require('express')
const checklistRouter = require('./src/routes/checklist')
require('./config/database')

const App = express();

App.use(express.json());

App.use('/checklists' , checklistRouter)

App.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})