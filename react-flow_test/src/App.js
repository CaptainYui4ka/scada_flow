import './App.css';
//import React, { useEffect, useState } from 'react';
import ReactFlowRenderer from "./react-flow-renderer";
import Modal from './signal/modal';

const App = () => {
  //const [modalActive, setModalActive] = useState(true);
  return(
    <div>
      <h1>ТЕстовая</h1>
      <ReactFlowRenderer />
      {/*<Modal active={modalActive} setActive={setModalActive}/>*/}
    </div>
  )
}

export default App;
