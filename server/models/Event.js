const { text } = require('body-parser');
const mongoose = require('mongoose');

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
