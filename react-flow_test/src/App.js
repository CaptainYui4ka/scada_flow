import './App.css';
import React, { useEffect, useState } from 'react';
import ReactFlowRenderer from "./react-flow-renderer";
import Modal from './signal/modal';

const App = () => {
  return(
    <div>
      <h1>ТЕстовая</h1>
      <ReactFlowRenderer />
    </div>
  )
}

export default App;
