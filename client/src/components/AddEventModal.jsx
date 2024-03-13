import React, { useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';

export default function AddEventModal({ isOpen, closeModal, onEventAdded }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (e) => {
    e.preventDefault();
    
    onEventAdded({
      title,
      start,
      end,
    });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <form>
        <input
          type='text'
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <label>Start Date</label>
          <Datetime
            value={start}
            onChange={(date) => setStart(date.toDate())}
          />
        </div>
        <div>
          <label>End Date</label>
          <Datetime
            value={end}
            onChange={(date) => setEnd(date.toDate())}
          />
        </div>
        <button type='button' onClick={onSubmit}>Create Event</button>
      </form>
    </Modal>
  );
}
