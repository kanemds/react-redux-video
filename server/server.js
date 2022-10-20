const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require('cors');
const routes = require('./api/routes');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());
app.use(express.json()); // able to read req.body json file
app.use('/', routes);


// middleware
app.use((error, req, res , next) => {
  const status = error.status || 500;
  const message = error.message || "Error Occured";
  return res.status(status).json({
    success:false,
    status,
    message
  });
});

