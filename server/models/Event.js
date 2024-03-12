const { text } = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');

const EventSchema = mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
});

const Event = mongoose.model('Event', EventSchema);

exports.createEvent = async (obj) => {
  return await Event.create(obj);
};

exports.getAllEvents = async () => {
  const events = await Event.find({
    startDate: { $gte: moment(req.query.startDate).toDate() },
    endDate: { $lte: moment(req.query.endDate).toDate() },
  });

  return events;
};
