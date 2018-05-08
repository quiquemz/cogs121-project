'use strict';

import * as admin from 'firebase-admin';
import express from 'express';
import http from 'http';
import path from 'path';

let app = express();
let server = http.createServer(app);

/************** API **************/
const recipeDatabase = {
  'Recipe1': {
    name: 'Grilled Salmon Tzatziki Bowls',
    img: 'images/recipe1.jpg'
  },
  'Recipe2': {
    name: 'Cacio e Pepe with Arugula and Lemon',
    img: 'images/recipe2.jpg'
  },
};

app.get('/api/recipes', (req, res) => {
  res.send(recipeDatabase);
});

app.get('/api/recipes/:name', (req, res) => {
  const recipeToLookup = req.params.name;
  //recipeToLookup = recipeToLookup.charAt(0).toUpperCase() + recipeToLookup.slice(1);
  const val = recipeDatabase[recipeToLookup];
  if (val) {
    res.send(val);
  } else {
    res.send({}); //empty Object
  }
});

/************** Server **************/
app.get('/', function(req, res) {
  res.sendfile('static/index.html');
});

app.use(express.static('static'));

server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});