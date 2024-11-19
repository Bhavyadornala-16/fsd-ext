// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchBooks();
    }, [search]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/books`, {
                params: { query: search }
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const addBook = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/books`, { title, author, genre });
            fetchBooks();
            setTitle('');
            setAuthor('');
            setGenre('');
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div className="App">
            <h1>Book Collection</h1>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <button onClick={addBook}>Add Book</button>

            <input
                placeholder="Search by title or author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.genre}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
