const express = require('express')
const router = express.Router();
const Checklist = require('../models/checklist');
const checklist = require('../models/checklist');

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', {checklists: checklists})
    }catch(error){
        res.status(500).json(req.body)
    }
})

router.post('/', async (req, res) => {
    let {name} = req.body;

   try{
    let checklists = await Checklist.create({name})
    res.status(200).json(checklists);
    res.status(200).render('checklists/index', {checklists: checklists})
   }catch(error){
    res.status(422).render('pages/error/index', {error: 'err0 ao exibir as listas'})
   }


    res.status(200).json(req.body)
})

router.get('/:id', async (req, res) => {
    try{
        let checklists = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', {checklist: checklist})
    }catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas de tarefas'})
    }
})

router.put('/:id', async (req, res) =>{
    let { name } = req.body;

  try {
    let checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, {new: true});
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json({ message: 'Erro ao atualizar o checklist', error });
  }
});

router.delete('/:id', async (req, res) =>{
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id);
        res.status(200).json(checklist)
      }catch(error){
        res.status(422).json(req.body)
      }
      
    }
)      

module.exports = router;