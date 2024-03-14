const express = require('express');

const Event = require('../models/Event');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    const events = await Event.getAllEvents(req.query);
    res.status(200).json({
      message: 'ok',
      events,
    });
  })
  .post(async (req, res) => {
    const obj = { ...req.body };
    const eventObj = await Event.createEvent(obj);

    res.sendStatus(201);
  });

module.exports = router;
