const express = require('express');
const server = express();
const PORT = 3000;
var pg = require('pg');
var conString = "postgres://postgres:password@postgres-dev-db:5432/vantaa_pwa";
var client = new pg.Client(conString);
client.connect();

server.get('/', (req, res) => {
    console.log(req)
    res.status(200).send('Welcome to Vanta PWA Project')
});
server.listen(PORT, () => console.log(`Server running on ${PORT}`));