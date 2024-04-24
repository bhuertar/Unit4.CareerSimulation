const express = require("express");
const server = express();
require("dotenv").config();
PORT = process.env.PORT || 3000;

//middleware
server.use(express.json());

// Testing Server
server.get('/', (req, res) => {
  res.send('<h1>Testing Server.JS</h1>');
})

// Setting up routes
const apiRouter = require("./api");
server.use('/api', apiRouter);

server.listen(PORT, () => {console.log(`Listening on port ${PORT}`);});