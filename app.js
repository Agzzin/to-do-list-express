const express = require('express')
const path = require('path')

const checklistRouter = require('./src/routes/checklist')
const taskRouter = require('./src/routes/task')
const rootRouter = require('./src/routes/index')
const methodOverride = require('method-override')


require('./config/database')

const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(methodOverride('_method',{methods: ['POST', 'GET']}));


App.use('/public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));


App.set('views', path.join(__dirname, 'src/views'))
App.set('view engine', 'ejs')


App.use('/', rootRouter)
App.use('/checklists', checklistRouter)
App.use('/checklists', taskRouter.checklistDepedent)
App.use('/tasks', taskRouter.simple);
App.use(express.json())

App.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

App.post('/checklists', async (req, res) => {
    const { name } = req.body
    res.json({ message: `Lista de verificação criada com sucesso! Nome: ${name}`})
});