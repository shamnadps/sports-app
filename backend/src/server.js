const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./sequalize_pg');
const loadMockCoursesToDatabase = require('./seed/db-seed').loadMockCoursesToDatabase;
const updateCoursesToDb = require('./grynos').updateCoursesToDb;

const port = process.env.PORT || 3000;
const grynosUpdateInterval = process.env.GRYNOS_COURSES_UPDATE_INTERVAL || 3600000;
const populateSeedData = process.env.POPULATE_SEED_DATA === '1';

setInterval(updateCoursesToDb, grynosUpdateInterval);

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api/', require('./routes/index'));

server.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 600000 }));

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const dbPopulation = populateSeedData ? loadMockCoursesToDatabase() : db.sync({ force: false });
dbPopulation.then(() => {
    server.listen(port, () => console.log(`Server running on ${port}`));
});
