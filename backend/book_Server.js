// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String
});

const Book = mongoose.model('Book', bookSchema);

app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error adding book' });
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const { query } = req.query;
        const books = await Book.find({
            $or: [{ title: new RegExp(query, 'i') }, { author: new RegExp(query, 'i') }]
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
