require('./grynos.js');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const updateCoursesToDb = require('./grynos').updateCoursesToDb;

const port = process.env.PORT || 3000;
const grynosUpdateInterval = process.env.GRYNOS_COURSES_UPDATE_INTERVAL || 3600000;

setInterval(updateCoursesToDb, grynosUpdateInterval);

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use((req, res, next) => {
    console.log(req.path);
    next();
});

server.use('/api/', require('./routes/index'));

server.use(express.static(path.join(__dirname, '..', 'public')));

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

server.listen(port, () => console.log(`Server running on ${port}`));
