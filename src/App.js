import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.tsx';
import './App.css';

import Application from './components/Application/Application.tsx';
import { APPLICATION } from './components/constants/stringConstants.ts';
import DefaultPage from './components/DefaultPage/DefaultPage.tsx';

function App() {
  const [selectedMenu, setSelectedMenu] = useState(APPLICATION);

  return (
    <div className="app">
      <Navbar selectedMenu={selectedMenu} setSelectedMenu={(val)=> setSelectedMenu(val)}/>
      {selectedMenu===APPLICATION?<Application />:<DefaultPage />}
    </div>
  );
}

export default App;
