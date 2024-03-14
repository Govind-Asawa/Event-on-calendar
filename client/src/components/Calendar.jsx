import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import axios from 'axios';
import moment from 'moment';

import AddEventModal from './AddEventModal';

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const onEventAdded = (eventObj) => {
    let calendarApi = calendarRef.current.getApi();
    eventObj.backgroundColor = 'red';
    calendarApi.addEvent(eventObj);
  };

  const handleEventAdd = async (data) => {
    let { title, startStr, endStr, backgroundColor } = data.event;
    if (!endStr)
      endStr = startStr;
    const eventObj = {
      title,
      start: moment(startStr).toDate(),
      end: moment(endStr).toDate(),
      backgroundColor
    }
    await axios.post('http://localhost:8000/api/v1/events', eventObj);
  };

  const renderEvents = async (dateInfo) => {

    const {startStr: start, endStr: end} = dateInfo;

    const url = `http://localhost:8000/api/v1/events?start=${start}&end=${end}`;
    
    const response = await axios.get(url);

    setEvents(response.data?.events);
  }

  const handleDateClick = (dateClickInfo) => {
    // console.log(dateClickInfo);
  }

  const handleEventClick = (eventClickInfo) => {
    const {endStr: end, startStr: start} = eventClickInfo.event;
    console.log(end, "\n", start);
  }

  return (
    <>
      <button type='button' onClick={() => setIsOpen(true)}>
        Add Event
      </button>
      <AddEventModal
        isOpen={isOpen}
        closeModal={closeModal}
        onEventAdded={onEventAdded}
      />
      <div style={{ position: 'relative', zIndex: 0 }}></div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        events= {events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        initialView='dayGridMonth'
        eventAdd={(data) => { // triggered after the event has been added to calendar
          handleEventAdd(data);
        }}
        // dateClick={
        //   handleDateClick
        // }
        datesSet={
          renderEvents
        }
        eventClick={
          handleEventClick
        }
      />
    </>
  );
}
