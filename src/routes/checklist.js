const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');

router.get('/new', async (req, res) => {
    try {
      let checklist = new Checklist();  
      res.status(200).render('checklists/new', { checklist: new Checklist() }); 
    } catch (error) {
      console.error(error);
      res.status(500).render('pages/error', { error: 'Erro ao carregar o formulário de nova checklist' });
    }
  });

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist });
    }catch(error){
        res.status(500).render('pages/error', { error: 'Erro ao carregar o formulário de edição' });
    }
});

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists });
    } catch (error) {
        res.status(500).json(req.body);
    }
});


router.post('/', async (req, res) => {
    const { name } = req.body.checklist;
    try{
    if (!name) {
      throw new Error('O campo nome é obrigatório');
    }
    const checklist = await Checklist.create({ name });
    await checklist.save();
    res.status(200).redirect('/checklists');
  } catch (error) {
    console.error(error);
    res.status(422).render('pages/error', { error: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir as listas de tarefas' });
    }
});

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist;
  
    try {
      checklist = await Checklist.findById(req.params.id);
      checklist.name = name;
      await checklist.save();
      res.redirect('/checklists');
    } catch (error) {
      let errors = error.errors;
      checklist = new Checklist({ name });
      res.status(422).render('checklists/edit', { checklist: { ...checklist, errors } });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndDelete(req.params.id);
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).json(req.body);
        res.status(500).render('pages/error', { error: 'Erro ao deletar listas de tarefas' });
    }   
});


module.exports = router;