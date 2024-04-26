const express = require("express");
const server = express();
require("dotenv").config();
PORT = process.env.PORT || 3000;

//middleware
server.use(express.urlencoded({extended: true}));

// Testing Server
server.get('/', (req, res) => {
  res.send('<h1>Testing Server.JS</h1>');
})

// Setting up api route
const apiRouter = require("./api");
server.use('/api', apiRouter);

// Setting up auth route
const authRouter = require("./auth");
server.use('/auth', authRouter);

server.listen(PORT, () => {console.log(`Listening on port ${PORT}`);});