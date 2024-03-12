const express = require('express');

const Event = require('../models/Event');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    const events = await Event.getAllEvents();
    res.send(200).json({
      message: 'ok',
      events,
    });
  })
  .post(async (req, res) => {
    const obj = { ...req };
    const eventObj = await Event.createEvent(obj);

    res.status(201);
  });

module.exports = router;
