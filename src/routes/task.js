const express = require('express');
const checklistDepedentRoute = express.Router();
const Checklist = require('../models/checklist');
const Task = require('../models/task');
const simpleRouter = express.Router();

checklistDepedentRoute.get('/:id/tasks/new', async (req, res) => {
    try {
        let task = Task();
        res.status(200).render('tasks/new', { checklistId: req.params.id, task: task });
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Erro ao carregar o formulario' });
    }
})

simpleRouter.delete('/:id', async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.tasks.indexOf(task._id);
        checklist.tasks.splice(taskToRemove, 1);
        await checklist.save();
        res.redirect(`/checklists/${checklist._id}`);
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Erro ao deletar uma tarefa' });   
    }
})
checklistDepedentRoute.post('/:id/tasks', async (req, res) => {
    let {name} = req.body.task;
    let task = new Task({name, checklist: req.params.id});
    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);
        await checklist.save();
        res.redirect(`/checklists/${req.params.id}`);
    } catch (error) {
      let errors = error.errors;
      res.status(422).render('tasks/new', { tasks: {...task, errors}, checklistId: req.params.id });
    }
})

simpleRouter.put('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id);
    try {
        task.set(req.body.task);
        await task.save();
        res.status(200).json({task});
    } catch (error) {
        let errors = error.errors;
        res.status(422).json({task: {...errors}});
    }
})


module.exports = {checklistDepedent: checklistDepedentRoute, simple: simpleRouter};
