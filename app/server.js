'use strict';

import express from 'express';
import http from 'http';
import path from 'path';

let app = express();
let server = http.createServer(app);

/************** Routes **************/
app.get('/', (req, res) => res.sendfile('static/index.html'));

app.get('/login', (req, res) => res.sendfile('static/login.html'));

app.get('/signup', (req, res) => res.sendfile('static/signup.html'));

app.get('/calendar', (req, res) => res.sendfile('static/calendar.html'));

// app.get('*', (req, res) => res.sendfile('static/404.html'));

/************** Server **************/
app.use(express.static('static'));

server.listen(3000, 'localhost');
server.on('listening', () => {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
  console.log('If you ran "gulp" http://localhost:8080/ should be available for rapid development.');
});