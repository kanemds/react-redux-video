const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require('cors');
const routes = require('./api/routes');

const PORK = process.env.PORK_URL;
const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORK, () => {
      console.log(`connected to server: ${PORK}`);
    });
  })
  .catch(error => {
    console.log(error.message);
  });

app.use(cors());
app.use('/', routes);



