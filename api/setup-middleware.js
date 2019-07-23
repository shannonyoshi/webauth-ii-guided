const express = require("express");
const session = require("express-sessions");
const helmet = require("helmet");
const cors = require("cors");
const KnexSessionStore = require("connect-session-knex")(session);

module.exports = server => {
  const sessionConfig = {
    name: "webauthsesh",
    secret: process.env.SESSION_SECRET || "Keep it quiet",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false //only false for development, then must be true to ensure cookies are only sent over https
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require("../database/dbConfig"),
      tablename: "sessions",
      createTable: true,
      sidfieldname: "sid",
      clearInterval: 1000 * 60 * 60 //deletes expired session data every hour
    })
  };

  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};
