const express = require('express');
const server = express();
const PORT = process.env.PORT;
const pg = require('pg');
const conString =
    'postgres://postgres:password@postgres-dev-db:5432/vantaa_pwa';
const client = new pg.Client(conString);
client.connect();
server.use('/', require('./src/routes'));
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
