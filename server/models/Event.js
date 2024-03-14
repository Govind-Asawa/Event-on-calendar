const { text } = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');

const EventSchema = mongoose.Schema({
  title: String,
  description: String,
  start: Date,
  end: Date,
  backgroundColor: String,
});

const Event = mongoose.model('Event', EventSchema);

exports.createEvent = async (obj) => {
  return await Event.create(obj);
};

exports.getAllEvents = async (query) => {
  const {start, end} = query;
  const events = await Event.find({
    start: { $gte: moment(start).toDate() },
    end: { $lte: moment(end).toDate() },
  });

  return events;
};
