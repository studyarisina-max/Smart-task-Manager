const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('task', TaskSchema);