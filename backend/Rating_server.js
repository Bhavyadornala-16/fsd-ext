const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/reviews', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and model
const reviewSchema = new mongoose.Schema({
  productName: String,
  comment: String,
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);
