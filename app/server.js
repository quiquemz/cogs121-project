'use strict';

import express from 'express';
import http from 'http';
import path from 'path';
import * as firebase from 'firebase-admin';

const app = express();
const server = http.createServer(app);

/************** Firebase setup **************/
// const serviceAccount = require('./serviceAccountKey.json');
//
// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
// });

/************** Routes **************/
app.get('/', (req, res) => res.redirect('/discover'));

app.get('/discover', (req, res) => res.sendfile('static/index.html'));

app.get('/main_index', (req, res) => res.sendfile('static/main_index.html'));

app.get('/login', (req, res) => res.sendfile('static/login.html'));

app.get('/signup', (req, res) => res.sendfile('static/signup.html'));

app.get('/calendar', (req, res) => res.sendfile('static/calendar.html'));

app.get('/recipe/:recipeId', (req, res) => res.sendfile('static/recipe.html'));

// app.get('*', (req, res) => res.sendfile('static/404.html'));

/************** Server **************/
app.use(express.static('static'));

server.listen(3000, 'localhost');
server.on('listening', () => {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
  console.log('If you ran "gulp" http://localhost:8080/ should be available for rapid development.');
});