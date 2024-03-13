import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import axios from 'axios';

import AddEventModal from './AddEventModal';

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const onEventAdded = (eventObj) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(eventObj);
  };

  const handleEventAdd = async (data) => {
    const { title, start, end } = data.event;
    if (!end)
      end = start;
    const eventObj = {
      title,
      startDate: start,
      endDate: end,
    };
    await axios.post('http://localhost:8000/api/v1/events', eventObj);
  };

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
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        initialView='dayGridMonth'
        eventAdd={(data) => { // triggered after the event has been added to calendar
          handleEventAdd(data);
        }}
      />
    </>
  );
}
