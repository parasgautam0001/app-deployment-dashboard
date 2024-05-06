import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar.tsx';
import Topbar from './components/Topbar/Topbar.tsx';
import ServiceInfo from './components/ServiceInfo/ServiceInfo.tsx';
import SystemMetrics from './components/SystemMetrics/SystemMetrics.tsx';
import EventHistory from './components/EventHistory/EventHistory.tsx';
import './App.css';
import { GET_APPLICATIONS } from './components/constants/apiConstants.ts';
import Environment from './components/Environment/Environment.tsx';
import Monitor from './assets/Monitor.svg';
import Settings from './assets/Settings.svg';
import Alert from './assets/Triangle.svg';
import HistoryIcon from './assets/History.svg';
import { ALERT, ALERTS, ALERTS_COMING_SOON, ENVIRONMENT, ENVIRONMENT_VARIABLES, EVENTS_COMING_SOON, EVENT_HISTORY, HISTORY, OVERVIEW, OVERVIEW_SMALL } from './components/constants/stringConstants.ts';

function App() {
  const [appNames, setAppNames] = useState([]);
  const [application, setApplication] = useState({
    id: 0,
    name: "",
    status: "",
    version: "",
    updatedAt: "",
    desiredVersion: ""
  });
  const [selectedoption, setSelectedOption] = useState(OVERVIEW);

  const getSelectedOption = () => {
    switch (selectedoption) {
      case 'overview':
        return <><ServiceInfo application={application} />
          <div className='charts-data'>
            <SystemMetrics applicationNames={appNames} />
            <EventHistory />
          </div>
        </>;
      case 'environment':
        return <Environment />;
      case 'alert':
        return <div>{ALERTS_COMING_SOON}</div>;
      case 'history':
        return <div>{EVENTS_COMING_SOON}</div>;
      default:
        break;
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(GET_APPLICATIONS);
        if (!response.ok) {
          throw new Error('Network is not responding');
        }
        const totalApps = await response.json();
        setAppNames(totalApps);
        setApplication(totalApps[0]);
      }
      catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Topbar application={application} appNames={appNames} setApp={(val) => setApplication(appNames[val])} />

        <div className='heading'>
          <h2>{application?.name || ''}</h2>
          <div className='options'>
            <div className='deployed'><span className='circle'></span>Deployed</div>
            <div>&#8942;</div>
          </div>
        </div>

        <div className='options'>
          <div className={`option-item ${selectedoption === OVERVIEW_SMALL ? 'bold' : ''}`} onClick={() => setSelectedOption("overview")} >
            <img src={Monitor} />Overview
          </div>
          <div className={`option-item ${selectedoption === ENVIRONMENT ? 'bold' : ''}`} onClick={() => setSelectedOption("environment")}>
            <img src={Settings} />{ENVIRONMENT_VARIABLES}
          </div>
          <div className={`option-item ${selectedoption === ALERT ? 'bold' : ''}`} onClick={() => setSelectedOption("alert")}>
            <img src={Alert} />{ALERTS}
          </div>
          <div className={`option-item ${selectedoption === HISTORY ? 'bold' : ''}`} onClick={() => setSelectedOption("history")}>
            <img src={HistoryIcon} />{EVENT_HISTORY}
          </div>
        </div>
        {getSelectedOption()}
      </div>
    </div>
  );
}

export default App;
