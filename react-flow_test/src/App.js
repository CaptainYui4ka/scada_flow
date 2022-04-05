import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import ReactFlowRenderer from './react-flow-renderer/index'
import LineChart from './react-flow-renderer/line'
import Message from './messages/message'
import ModalTest from './signal/modal';
const App = () => {

  return(
    <div>
      <h1>Редактор SCADA</h1>
      <header>
        <Link to="/">Редактор</Link>
        <Link to="/linechart">График</Link>
        <Link to="/message">Сообщение</Link>
      </header>
      <Routes>
        <Route path="/" element={<ReactFlowRenderer/>}/>
        <Route path="/linechart" element={<LineChart/>}/>
        <Route path="/message"  element={<Message/>}/>
      </Routes>
    </div>
  )
}

export default App;