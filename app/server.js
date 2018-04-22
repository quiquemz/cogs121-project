const express = require('express');
const app = express();

app.use(express.static('static_files/'));

const recipeDatabase = {
  'Recipe1':  {name: 'Grilled Salmon Tzatziki Bowls', img:'recipe1.jpg'},
  'Recipe2':  {name: 'Cacio e Pepe with Arugula and Lemon', img:'recipe2.jpg'},
};

app.get('/recipes', (req, res) => {
  res.send(recipeDatabase);
});

app.get('/recipes/:name', (req, res) => {
  const recipeToLookup = req.params.name;
  const val = recipeDatabase[recipeToLookup];
  if (val) {
    res.send(val);
  }
  else {
    res.send({}); //empty Object
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
