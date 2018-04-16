const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const fetchCourse = require('./src/seed/courses.js');
server.use('/', require('./src/routes'));
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
