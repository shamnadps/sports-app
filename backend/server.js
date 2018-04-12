const express = require('express');
const server = express();
const PORT = process.env.PORT;

server.use('/', require('./src/routes'));
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
