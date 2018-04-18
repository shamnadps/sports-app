require('./src/seed/courses.js');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const server = express();

server.use('/', require('./src/routes'));

server.use(express.static(path.join(__dirname, 'public')));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
