const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authmiddleware');

// Get all user tasks
router.get('/', auth, async(req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) { res.status(500).send('Server Error'); }
});

// Create a task
router.post('/', auth, async(req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description, user: req.user.id });
        const task = await newTask.save();
        res.json(task);
    } catch (err) { res.status(500).send('Server Error'); }
});

// Update status (Toggle)
router.put('/:id', auth, async(req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(task);
    } catch (err) { res.status(500).send('Server Error'); }
});

// Delete task
router.delete('/:id', auth, async(req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;