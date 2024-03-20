import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import axios from 'axios';
import moment from 'moment';

import EventModal from './EventModal';

export default function Calendar() {
  const [currentEditEvent, setCurrentEditEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const closeModal = () => {
    console.log("inside close");
    // console.log(currentEditEvent);
    if (currentEditEvent) setCurrentEditEvent(null);
    setIsOpen(false);
    // if it was for editing an event then reset it
  };

  const createEvent = async (eventObj) => {
    // eventObj is supposed to have parent event's Id and the color it carries
    // we first try to create it in the backend if successful then we reflect it in the UI

    // const resp = await axios.post(
    //   'http://localhost:8000/api/v1/events',
    //   eventObj
    // );

    const resp = { data: 'good' };

    if (resp?.data) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent(eventObj);
    }
  };

  const updateEvent = async (eventObj) => {
    // send updated event
    console.log(eventObj);
  };

  const workFunc = currentEditEvent ? updateEvent : createEvent;

  const handleEventAdd = async (data) => {
    let { title, startStr, endStr, backgroundColor } = data.event;
    if (!endStr) endStr = startStr;
    const eventObj = {
      title,
      start: moment(startStr).toDate(),
      end: moment(endStr).toDate(),
      backgroundColor,
    };
    await axios.post('http://localhost:8000/api/v1/events', eventObj);
  };

  const renderEvents = async (dateInfo) => {
    const { startStr: start, endStr: end } = dateInfo;
    const url = `http://localhost:8000/api/v1/events?start=${start}&end=${end}`;
    const response = await axios.get(url);
    console.log(response.data?.events);
    setEvents(response.data?.events);
  };

  const handleDateClick = (dateClickInfo) => {
    // console.log(dateClickInfo);
  };

  const handleEventClick = (eventClickInfo) => {
    const event = eventClickInfo.event;
    const eventData = {
      start: event.start,
      end: event.end,
      title: event.title,
      ...event?._def?.extendedProps
    };
    setCurrentEditEvent({...eventData});
    setIsOpen(true);
  };

  return (
    <>
      <button type='button' onClick={() => setIsOpen(true)}>
        Add Event
      </button>
      <EventModal
        isOpen={isOpen}
        closeModal={closeModal}
        workFunc={workFunc}
        eventObj={currentEditEvent}
      />
      <div style={{ position: 'relative', zIndex: 0 }}></div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={events} //this renders the events on calendar
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        initialView='dayGridMonth'
        // eventAdd={(data) => {
        //   // triggered after the event has been added to calendar
        //   handleEventAdd(data);
        // }}
        dateClick={handleDateClick}
        datesSet={renderEvents}
        eventClick={handleEventClick}
      />
    </>
  );
}
