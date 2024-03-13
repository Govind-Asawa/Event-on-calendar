const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const calendarRouter = require('./controllers/eventController');

const app = express();

// CORS
// simple requests
app.use(cors());
// complex requests requires handling pre-flight requests with method OPTIONS
app.options('*', cors());

app.use(bodyparser.json());

app.use('/api/v1/events', calendarRouter);

module.exports = app;