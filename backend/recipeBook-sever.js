server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require("./routes/recipe");

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/recipeBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(() => console())


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(Server running on http://localhost:${PORT}));

routes

// Routes
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes');

const app = express();
// Add a new recipe
app.post('/recipes', async (req, res) => {
    const recipe = new Recipe(req.body);
    try {
      await recipe.save();
      res.status(201).send(recipe);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Get recipes (with optional category filter)
  app.get('/recipes', async (req, res) => {
    const { category } = req.query;
    try {
      const recipes = category
        ? await Recipe.find({ category })
        : await Recipe.find();
      res.send(recipes);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  module.exports = router;

schema and modules

const mongoose = require('mongoose');

// Recipe Schema
const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    category: String,
  });

  module.exports = mongoose.model("Recipe", recipeSchema);
