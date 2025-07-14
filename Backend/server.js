const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Debug: Log MONGO_URI to verify it's loaded
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(cors({ origin: 'http://localhost:5000' }));
app.use(express.json());

// Set Mongoose strictQuery to suppress warning
mongoose.set('strictQuery', true);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Todo API is running. Use /api/todos for endpoints.');
});

const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

// Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a todo
app.post('/api/todos', async (req, res) => {
    try {
        const todo = new Todo({
            text: req.body.text
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(400).json({ error: 'Bad request' });
    }
});

// Update a todo
app.patch('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(400).json({ error: 'Bad request' });
    }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(400).json({ error: 'Bad request' });
    }
});

// Connect to MongoDB and start server
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch(error => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });