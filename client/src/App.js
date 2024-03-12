import React from 'react';
import Modal from 'react-modal';

import Calendar from './components/Calendar';
Modal.setAppElement('#root');

export default function App() {
  return (<>
    <Calendar />
  </>);
}
