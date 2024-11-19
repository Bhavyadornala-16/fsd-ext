// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Define a schema and model for recent searches
const searchSchema = new mongoose.Schema({
    city: String,
    date: { type: Date, default: Date.now }
});
const Search = mongoose.model('Search', searchSchema);

// Route to fetch weather and save recent search
app.post('/api/weather', async (req, res) => {
    const { city } = req.body;
    try {
        // Fetch weather data from external API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: process.env.WEATHER_API_KEY,
                units: 'metric'
            }
        });
        const weatherData = response.data;

        // Save recent search
        const newSearch = new Search({ city });
        await newSearch.save();

        // Keep only the last 5 searches
        const searchCount = await Search.countDocuments();
        if (searchCount > 5) {
            await Search.findOneAndDelete().sort({ date: 1 });
        }

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch weather data' });
    }
});

// Route to get recent searches
app.get('/api/recent-searches', async (req, res) => {
    try {
        const recentSearches = await Search.find().sort({ date: -1 }).limit(5);
        res.json(recentSearches);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch recent searches' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
