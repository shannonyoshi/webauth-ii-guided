const express = require('express');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const setupMiddleware = require("./setup-middleware")

const server = express();
setupMiddleware(server)

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
