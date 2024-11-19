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

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date
});

const Event = mongoose.model('Event', eventSchema);

app.post('/api/events', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error adding event' });
    }
});

app.get('/api/events/upcoming', async (req, res) => {
    try {
        const today = new Date();
        const events = await Event.find({ date: { $gte: today } }).sort('date');
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching upcoming events' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
