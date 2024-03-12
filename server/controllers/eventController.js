const express = require('express');

const Event = require('../models/Event');

const router = express.Router();

router
  .route('/')
  .post(async (req, res) => {
    const obj = { ...req };
    const eventObj = await Event.createEvent(obj);

    res.status(201);
  });

module.exports = router;
