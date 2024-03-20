import React, { useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';

const initialEventState = {
  // Maybe some default values when creating new event
};

export default function EventModal({ isOpen, closeModal, workFunc, eventObj }) {

  const initialEventData = eventObj
  ? {...eventObj}
  : { ...initialEventState };

  const initialStart = eventObj?.start ? eventObj.start : new Date()
  const initialEnd = eventObj?.end ? eventObj.end : new Date()

  const [eventData, setEventData] = useState({});
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const afterOpen = () => {
    // This is to reset previous state
    setEventData(initialEventData);
    setStart(initialStart)
    setEnd(initialEnd)
  }

  const handleEventChange = (e) => {
    const fieldName = e.target?.name;
    const fieldValue = e.target?.value;

    if (fieldName)
      setEventData((prevEventData) => {
        const updatedEventData = {
          ...prevEventData,
          [fieldName]: fieldValue,
        };
        return updatedEventData;
      });
  };

  const handleSubmit = (e) => {
    // make event obj
    eventData['start'] = start;
    eventData['end'] = end;

    console.log(eventData);

    // call workFunc
    workFunc(eventData);

    // close modal
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} onAfterOpen={afterOpen}>
      <form>
        <input
          type='text'
          placeholder='title'
          name='title'
          value={eventData?.title}
          onChange={handleEventChange}
        />
        <div>
          <label>Start Date</label>
          <Datetime
            value={start}
            onChange={(date) => {if (date) setStart(date.toDate())}}
          />
        </div>
        <div>
          <label>End Date</label>
          <Datetime value={end} onChange={(date) => {if (date) setEnd(date.toDate())}} />
        </div>
        <button type='button' onClick={handleSubmit}>
          {eventObj ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </Modal>
  );
}
