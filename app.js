const express = require("express");
const bodyParser = require("body-parser");

const { connectMongo } = require("./services/mongo");
const routes = require('./routes/router')

require("dotenv").config();

connectMongo();

PORT = process.env.PORT || 6000;

const app = express();

app.use(bodyParser.json());

app.use('/', routes)

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
