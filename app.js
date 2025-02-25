const express = require('express')

const App = express();

App.get('/', (req, res =>{
    res.send('<h1>Minha lista de tarefas</h1>')
}))

App.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})