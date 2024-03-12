const express = require('express');
const bodyparser = require('body-parser');

const calendarRouter = require('./controllers/eventController');

const app = express();
app.use(bodyparser.json());

app.use('/api/v1/events', calendarRouter);

module.exports = app;